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

    const tokenPriceConstant = await prisma.query.constant({
        where: {
            key: 'TOKEN_PRICE'
        }
    }, `
        {
            value
        }
    `);

    const minTokens = 50 / parseInt(tokenPriceConstant.value);
    if (args.numTokens < minTokens) {
        throw new Error(`You must buy at least ${minTokens} ${minTokens === 1 ? 'token' : 'tokens'}`);
    }

    if (args.pricePerToken !== parseInt(tokenPriceConstant.value)) {
        throw new Error('The token price you attempted to pay with is incorrect, try again');
    }

    // I'm going to say that purchases greater than or equal to $1000 are suspicious
    // Per Stripe terms, we need to block this transaction and research it and potentially contact the user before
    // accepting the transaction
    if (args.numTokens * parseInt(tokenPriceConstant.value) >= 100000) {
        throw new Error('You are requesting to purchase $1000 or more in tokens. Contact jordan.michael.last@gmail.com if this is not a mistake');
    }

    //TODO the following calls must be made atomic
    await stripeCharge(args.stripeTokenId, args.numTokens, parseInt(tokenPriceConstant.value), user.email);

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