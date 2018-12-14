import { prisma } from '../server.js';
import { getUserId } from '../services/utilities.js';

export async function viewSourceCode(parent, args, context, info) {
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
                    sourceCodeViewed
                    answeredCorrectly
                }
            }
        `);

        const viewSourceCodeTokenReward = await prisma.query.tokenReward({
            where: {
                type: 'VIEW_SOURCE_CODE'
            }
        }, `{
            amount
        }`);

        const assessmentInfo = user.assessmentInfos.find((assessmentInfo) => assessmentInfo.assessment.id === args.assessmentId);

        const allowed = user.tokens >= Math.abs(viewSourceCodeTokenReward.amount) || (assessmentInfo !== undefined && (assessmentInfo.answeredCorrectly || assessmentInfo.sourceCodeViewed));

        if (!allowed) {
            return {
                allowed
            };
        }

        if (assessmentInfo) {
            if (assessmentInfo.sourceCodeViewed === false) {
                await prisma.mutation.updateAssessmentInfo({
                    where: {
                        id: assessmentInfo.id
                    },
                    data: {
                        sourceCodeViewed: true
                    }
                });
            }
        }
        else {
            throw new Error('You must attempt an answer before viewing the source code');
        }

        const tokenReward = calculateTokenReward(assessmentInfo, viewSourceCodeTokenReward.amount);

        if (tokenReward !== 0) {
            // I am grabbing the assessment from the database so that we read the id from the database
            // We are passing the id to the user in the tokenTransaction description, and I want to mitigate
            // any kind of malicious user input, since the href is being displayed to the user
            const assessment = await prisma.query.assessment({
                where: {
                    id: args.assessmentId
                }
            });

            //TODO the following two calls must be made atomic
            await prisma.mutation.createTokenTransaction({
                data: {
                    user: {
                        connect: {
                            id: user.id
                        }
                    },
                    amount: tokenReward,
                    type: 'VIEW_SOURCE_CODE',
                    description: `<a href="assessment/${assessment.id}/view">Exercise source code viewed</a>`
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

function calculateTokenReward(assessmentInfo, viewSourceCodeTokenRewardAmount) {
    return assessmentInfo && (assessmentInfo.sourceCodeViewed || assessmentInfo.answeredCorrectly) ? 0 : viewSourceCodeTokenRewardAmount;
}