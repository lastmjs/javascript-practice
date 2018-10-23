import { SchemaDirectiveVisitor } from 'graphql-tools';
import { defaultFieldResolver } from 'graphql';
import { getUserId } from '../services/utilities.js';

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
            }

            return await originalResolver(parent, args, context, info);
        };
    }
}