import { SchemaDirectiveVisitor } from 'graphql-tools';
import { defaultFieldResolver } from 'graphql';
import { getUserId } from '../services/utilities.js';
import { prisma } from '../lambda.js';

export class VisibilityDirective extends SchemaDirectiveVisitor {
    visitFieldDefinition(field, details) {
        const originalResolver = field.resolve || defaultFieldResolver;

        field.resolve = async (parent, args, context, info) => {
            if (this.args.type === 'OWNER') {
                if (details.objectType.name === 'User') {
                    if (parent.id !== getUserId(context, 'Not authorized')) {
                        throw new Error('Not authorized');
                    }
                }

                //TODO this is essentially repeated
                if (details.objectType.name === 'TokenTransaction') {
                    const tokenTransaction = await prisma.query.tokenTransaction({
                        where: {
                            id: parent.id
                        }
                    }, `
                        {
                            user {
                                id
                            }
                        }
                    `);

                    if (tokenTransaction.user.id !== getUserId(context, 'Not authorized')) {
                        throw new Error('Not authorized');
                    }
                }

                //TODO this is essentially repeated
                if (details.objectType.name === 'AssessmentInfo') {
                    const assessmentInfo = await prisma.query.assessmentInfo({
                        where: {
                            id: parent.id
                        }
                    }, `
                        {
                            user {
                                id
                            }
                        }
                    `);

                    if (assessmentInfo.user.id !== getUserId(context, 'Not authorized')) {
                        throw new Error('Not authorized');
                    }
                }
            }

            return await originalResolver(parent, args, context, info);
        };
    }
}