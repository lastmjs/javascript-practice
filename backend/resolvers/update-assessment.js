import { getUserId } from '../services/utilities.js';
import { prisma } from '../server.js';

//TODO figure out how to use directive permissions for automatically generated mutations
export async function updateAssessment(parent, args, context, info) {
    const user = await authenticate(context);
    const currentAssessment = await authorize(args, user);
    await ensureOrder(args, currentAssessment);
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
            id
        }
    `);

    return user;
}

async function authorize(args, user) {
    const currentAssessment = await prisma.query.assessment({
        where: {
            id: args.where.id
        }
    }, `
        {
            order
            author {
                id
            }
        }
    `);

    if (currentAssessment.author.id !== user.id) {
        throw new Error('You must be the author of this assessment to update it.');
    }

    return currentAssessment;
}

async function ensureOrder(args, currentAssessment) {
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
    return await prisma.mutation.updateAssessment(args, info);
}