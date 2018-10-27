import { getUserId } from '../services/utilities.js';
import { prisma } from '../lambda.js';

//TODO figure out how to use directive permissions for automatically generated mutations
export async function acceptNewTerms(parent, args, context, info) {
    const userId = getUserId(context, 'You must log in or sign up to accept the new terms');

    const termsAndPrivacyConstant = await prisma.query.constant({
        where: {
            key: 'TERMS_AND_PRIVACY_VERSION'
        }
    }, `
        {
            value
        }
    `);

    await prisma.mutation.updateUser({
        where: {
            id: userId
        },
        data: {
            termsAcceptedDate: new Date(),
            termsAcceptedVersion: termsAndPrivacyConstant.value
        }
    });

    return {
        success: true
    };
}