import { prisma } from '../lambda.js';
import { getUserId } from '../services/utilities.js';

export async function checkAnswer(parent, args, context, info) {
    try {
        const userId = getUserId(context, 'You must log in or sign up to submit an answer');
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
                    answeredCorrectly
                }
            }
        `);

        const answerCorrectTokenReward = await prisma.query.tokenReward({
            where: {
                type: 'ANSWER_CORRECT'
            }
        }, {
            amount
        });

        const answerIncorrectTokenReward = await prisma.query.tokenReward({
            where: {
                type: 'ANSWER_INCORRECT'
            }
        }, {
            amount
        });

        const maximum = Math.max(answerCorrectTokenReward.amount < 0 ? Math.abs(answerCorrectTokenReward.amount) : 0, answerIncorrectTokenReward.amount < 0 ? Math.abs(answerIncorrectTokenReward.amount) : 0);

        const allowed = user.tokens >= maximum;

        if (!allowed) {
            return {
                allowed
            };
        }

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

        const tokenReward = calculateTokenReward(assessmentInfo, args.correct, answerCorrectTokenReward.amount, answerIncorrectTokenReward.amount);

        if (tokenReward !== 0) {
            await prisma.mutation.createTokenTransaction({
                data: {
                    user: {
                        connect: {
                            id: user.id
                        }
                    },
                    amount: tokenReward,
                    type: args.correct ? 'ANSWER_CORRECT' : 'ANSWER_INCORRECT',
                    description: `Exercise ${args.assessmentId} answered ${args.correct ? 'correctly' : 'incorrectly'}`
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
            correct: args.correct,
            tokenReward
        };
    }
    catch(error) {
        console.log(error);
        throw error;
    }
}

function calculateTokenReward(assessmentInfo, correct, answerCorrectTokenRewardAmount, answerIncorrectTokenRewardAmount) {
    return assessmentInfo ? 0 : correct ? answerCorrectTokenRewardAmount : answerIncorrectTokenRewardAmount;
}