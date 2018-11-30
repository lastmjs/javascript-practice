import { getUserId } from '../services/utilities.js';
import { prisma } from '../lambda.js';

//TODO figure out how to use directive permissions for automatically generated mutations
export async function updateAssessment(parent, args, context, info) {
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

    //TODO automatic reording of all assessments

    if (user.email === 'jordan.michael.last@gmail.com') {
        return await prisma.mutation.updateAssessment(args, info);
    }
    else {
        throw new Error('Not authorized');
    }
}