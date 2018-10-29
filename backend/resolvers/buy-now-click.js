import { getUserId } from '../services/utilities.js';
import { prisma } from '../lambda.js';

export async function buyNowClick(parent, args, context, info) {
    const userId = getUserId(context, 'You must log in or sign up to buy tokens');

    await prisma.mutation.createBuyNowClick({
        data: {
            user: {
                connect: {
                    id: userId
                }
            }
        }
    });

    return true;
}