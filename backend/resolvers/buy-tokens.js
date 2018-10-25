import { getUserId } from '../services/utilities.js';
import { prisma } from '../lambda.js';
const stripe = require('stripe')(process.env.STRIPE_SECRET);

//TODO figure out how to use directive permissions for automatically generated mutations
export async function buyTokens(parent, args, context, info) {
    const userId = getUserId(context, 'You must log in or sign up to buy tokens');
    const user = await prisma.query.user({
        where: {
            id: userId
        }
    }, `
        {
            email
            tokens
        }
    `);

    const tokenPurchaseTokenReward = await prisma.query.tokenReward({
        where: {
            type: 'TOKEN_PURCHASE'
        }
    }, `
        {
            price
        }
    `);

    const minTokens = 500 / tokenPurchaseTokenReward.price;
    if (args.numTokens < minTokens) {
        throw new Error(`You must buy at least ${minTokens} ${minTokens === 1 ? 'token' : 'tokens'}`);
    }

    if (args.pricePerToken !== tokenPurchaseTokenReward.price) {
        //TODO we might need to flag this and investigate it before allowing the user to pay, per Stripe terms
        throw new Error('The token price you attempted to pay with is incorrect, try again');
    }

    //TODO the following calls must be made atomic
    await stripeCharge(args.stripeTokenId, args.numTokens, tokenPurchaseTokenReward.price, user.email);

    await prisma.mutation.createTokenTransaction({
        data: {
            user: {
                connect: {
                    id: userId
                }
            },
            amount: args.numTokens,
            type: 'TOKEN_PURCHASE',
            description: `Bought ${args.numTokens} ${args.numTokens === 1 ? 'token' : 'tokens'}`
        }
    });

    await prisma.mutation.updateUser({
        where: {
            id: userId
        },
        data: {
            tokens: user.tokens + args.numTokens
        }
    });

    return {
        success: true
    };
}

async function stripeCharge(stripeTokenId, numTokens, pricePerToken, userEmail) {
    return new Promise((resolve, reject) => {
        stripe.charges.create({
            amount: numTokens * pricePerToken,
            currency: 'usd',
            description: `Bought ${numTokens} ${numTokens === 1 ? 'token' : 'tokens'}`,
            source: stripeTokenId,
            receipt_email: userEmail
        }, (err, charge) => {
            if (err) {
                reject(err);
            }
            
            resolve();
        });
    });
}