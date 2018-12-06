import { getUserId } from '../services/utilities.js';
import { prisma } from '../lambda.js';

//TODO figure out how to use directive permissions for automatically generated mutations
export async function createAssessment(parent, args, context, info) {
    const user = await authenticate(context);
    await ensureOrder(args);
    return await createTheAssessment(user, args, info);
}

async function authenticate(context) {
    const userId = getUserId(context, 'You must log in or sign up to create an assessment');
    const user = await prisma.query.user({
        where: {
            id: userId
        }
    }, `
        {
            email
        }
    `);

    return user;
}

async function ensureOrder(args) {
    const assessmentsEqualToProposedOrder = await prisma.query.assessments({
        where: {
            order: args.data.order,
            concept: {
                id: args.data.concept.connect.id
            }
        }
    });

    if (assessmentsEqualToProposedOrder.length > 0) {
        const assessmentsGreaterThanOrEqualToProposedOrder = await prisma.query.assessments({
            where: {
                order_gte: args.data.order,
                concept: {
                    id: args.data.concept.connect.id
                }
            }
        });
    
        for (let i=0; i < assessmentsGreaterThanOrEqualToProposedOrder.length; i++) {
            const currentAssessment = assessmentsGreaterThanOrEqualToProposedOrder[i];
            await prisma.mutation.updateAssessment({
                where: {
                    id: currentAssessment.id
                },
                data: {
                    order: currentAssessment.order + 1
                }
            });
        }
    }
}

async function createTheAssessment(user, args, info) {
    if (
        user.email === 'jordan.michael.last@gmail.com' ||
        user.email === 'gitcoin@javascriptpractice.com'
    ) {
        return await prisma.mutation.createAssessment(args, info);
    }
    else {
        throw new Error('Not authorized');
    }
}