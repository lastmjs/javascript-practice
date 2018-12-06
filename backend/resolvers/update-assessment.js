import { getUserId } from '../services/utilities.js';
import { prisma } from '../lambda.js';

//TODO figure out how to use directive permissions for automatically generated mutations
export async function updateAssessment(parent, args, context, info) {
    const user = await authenticate(context);
    await ensureOrder(args);
    return await updateTheAssessment(user, args, info);
}

async function authenticate(context) {
    const userId = getUserId(context, 'You must log in or sign up to update an assessment');
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
    const currentAssessment = await prisma.query.assessment({
        where: {
            id: args.where.id
        }
    }, `
        {
            order
        }
    `);

    const assessmentsGreaterThanCurrentOrder = await prisma.query.assessments({
        where: {
            order_gt: currentAssessment.order,
            concept: {
                id: args.data.concept.connect.id
            }
        }
    });

    for (let i=0; i < assessmentsGreaterThanCurrentOrder.length; i++) {
        const currentAssessment = assessmentsGreaterThanCurrentOrder[i];
        await prisma.mutation.updateAssessment({
            where: {
                id: currentAssessment.id
            },
            data: {
                order: currentAssessment.order - 1
            }
        });
    }

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

async function updateTheAssessment(user, args, info) {
    if (
        user.email === 'jordan.michael.last@gmail.com' ||
        user.email === 'gitcoin@javascriptpractice.com'
    ) {
        return await prisma.mutation.updateAssessment(args, info);
    }
    else {
        throw new Error('Not authorized');
    }
}