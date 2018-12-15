import { getUserId } from '../services/utilities.js';
import { prisma } from '../server.js';

//TODO figure out how to use directive permissions for automatically generated mutations
export async function submitFeedback(parent, args, context, info) {
    const userId = getUserId(context, 'You must log in or sign up to submit feedback');

    const openFeedbackSubmissions = await prisma.query.feedbackSubmissions({
        where: {
            user: {
                id: userId
            },
            open: true
        }
    });

    if (openFeedbackSubmissions.length > 0) {
        throw new Error('Your current submissions must become closed before submitting more');
    }

    const user = await prisma.query.user({
        where: {
            id: userId
        }
    }, `
        {
            tokens
        }
    `);

    const tokenReward = await prisma.query.tokenReward({
        where: {
            type: 'FEEDBACK_SUBMITTED'
        }
    }, `
        {
            amount
        }
    `);

    await prisma.mutation.createFeedbackSubmission({
        data: {
            text: args.text,
            open: true,
            description: 'Thanks for submitting feedback, we will get to this soon',
            user: {
                connect: {
                    id: userId
                }
            }
        }
    });

    await prisma.mutation.createTokenTransaction({
        data: {
            user: {
                connect: {
                    id: userId
                }
            },
            amount: tokenReward.amount,
            type: 'FEEDBACK_SUBMITTED',
            description: 'Feedback submitted'
        }
    });

    await prisma.mutation.updateUser({
        where: {
            id: userId
        },
        data: {
            tokens: user.tokens + tokenReward.amount
        }
    });

    return {
        success: true
    };
}