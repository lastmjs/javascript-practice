import { prisma } from '../lambda.js';
import jwt from 'jsonwebtoken';

export async function checkAnswer(parent, args, context, info) {
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
                    answeredCorrectly
                }
            }
        `);
        const assessmentInfo = user.assessmentInfos.find((assessmentInfo) => assessmentInfo.assessment.id === args.assessmentId);

        if (assessmentInfo) {
            if (assessmentInfo.answeredCorrectly === false && args.correct === true) {
                await prisma.mutation.updateAssessmentInfo({
                    where: {
                        id: assessmentInfo.id
                    },
                    data: {
                        answeredCorrectly: args.correct
                    }
                });
            }
        }
        else {
            await prisma.mutation.createAssessmentInfo({
                data: {
                    user: {
                        connect: {
                            id: user.id
                        }
                    },
                    assessment: {
                        connect: {
                            id: args.assessmentId
                        }
                    },
                    answeredCorrectly: args.correct,
                    solutionViewed: false
                }
            });
        }

        const tokenReward = calculateTokenReward(assessmentInfo, args.correct);

        if (tokenReward !== 0) {
            await prisma.mutation.createTokenTransaction({
                data: {
                    user: {
                        connect: {
                            id: user.id
                        }
                    },
                    amount: tokenReward,
                    type: args.correct ? 'ANSWER_CORRECT' : 'ANSWER_INCORRECT'
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
            allowed: user.tokens >= 2,
            correct: args.correct,
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
        throw new Error('You must log in or sign up to submit an answer');
    }
}

function calculateTokenReward(assessmentInfo, correct) {
    if (assessmentInfo) {
        if (assessmentInfo.answeredCorrectly) {
            return 0;
        }
        else {
            return correct ? 1 : 0;
        }
    }
    else {
        return correct ? 1 : -2;
    }
}