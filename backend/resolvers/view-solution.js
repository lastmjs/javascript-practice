import { prisma } from '../lambda.js';
import jwt from 'jsonwebtoken';

export async function viewSolution(parent, args, context, info) {
    try {
        const token = context.event.headers['authorization'].replace('Bearer ', '');
        const payload = getPayload(token, process.env.APPLICATION_SERVER_SECRET);
        const user = await prisma.query.user({
            where: {
                id: payload.userId
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
        const assessmentInfo = user.assessmentInfos.find((assessmentInfo) => assessmentInfo.assessment.id === args.assessmentId);

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

        const tokenReward = calculateTokenReward(assessmentInfo);

        if (tokenReward !== 0) {
            await prisma.mutation.createTokenTransaction({
                data: {
                    user: {
                        connect: {
                            id: user.id
                        }
                    },
                    amount: tokenReward,
                    type: 'VIEW_SOLUTION'
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
            allowed: user.tokens >= 1,
            tokenReward
        };
    }
    catch(error) {
        console.log(error);
        throw error;
    }
}

function getPayload(token, secret) {
    try {
        return jwt.verify(token, secret);
    }
    catch(error) {
        console.log(error);
        throw new Error('Not authorized');
    }
}

function calculateTokenReward(assessmentInfo) {
    return assessmentInfo && (assessmentInfo.solutionViewed || assessmentInfo.answeredCorrectly) ? 0 : -1;
}