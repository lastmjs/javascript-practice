import { prisma } from '../lambda.js';
import { getUserId } from '../services/utilities.js';

export async function viewSolution(parent, args, context, info) {
    try {
        const userId = getUserId(context, 'You must log in or sign up to view the solution');
        const user = await prisma.query.user({
            where: {
                id: userId
            }
        }, `
            {
                id
                tokens
                assessmentInfos {
                    id
                    assessment {
                        id
                    }
                    solutionViewed
                    answeredCorrectly
                }
            }
        `);

        const viewSolutionTokenReward = await prisma.query.tokenReward({
            where: {
                type: 'VIEW_SOLUTION'
            }
        }, `{
            amount
        }`);

        const assessmentInfo = user.assessmentInfos.find((assessmentInfo) => assessmentInfo.assessment.id === args.assessmentId);

        const allowed = user.tokens >= Math.abs(viewSolutionTokenReward.amount) || (assessmentInfo !== undefined && (assessmentInfo.answeredCorrectly || assessmentInfo.solutionViewed));

        if (!allowed) {
            return {
                allowed
            };
        }

        if (assessmentInfo) {
            if (assessmentInfo.solutionViewed === false) {
                await prisma.mutation.updateAssessmentInfo({
                    where: {
                        id: assessmentInfo.id
                    },
                    data: {
                        solutionViewed: true
                    }
                });
            }
        }
        else {
            throw new Error('You must attempt an answer before viewing the solution');
        }

        const tokenReward = calculateTokenReward(assessmentInfo, viewSolutionTokenReward.amount);

        if (tokenReward !== 0) {
            //TODO the following two calls must be made atomic
            await prisma.mutation.createTokenTransaction({
                data: {
                    user: {
                        connect: {
                            id: user.id
                        }
                    },
                    amount: tokenReward,
                    type: 'VIEW_SOLUTION',
                    description: `Exercise ${args.assessmentId} solution viewed`
                }
            });

            await prisma.mutation.updateUser({
                where: {
                    id: user.id
                },
                data: {
                    tokens: user.tokens + tokenReward
                }
            });
        }

        return {
            allowed,
            tokenReward
        };
    }
    catch(error) {
        console.log(error);
        throw error;
    }
}

function calculateTokenReward(assessmentInfo, viewSolutionTokenRewardAmount) {
    return assessmentInfo && (assessmentInfo.solutionViewed || assessmentInfo.answeredCorrectly) ? 0 : viewSolutionTokenRewardAmount;
}