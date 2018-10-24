import { SchemaDirectiveVisitor } from 'graphql-tools';

export class PrivateDirective extends SchemaDirectiveVisitor {
    visitFieldDefinition(field) {
        field.resolve = (parent, args, context, info) => {
            throw new Error('Not authorized');
        };
    }
}