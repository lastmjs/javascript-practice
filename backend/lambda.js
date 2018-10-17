import { GraphQLServerLambda } from 'graphql-yoga';
import { Prisma } from 'prisma-binding';
import { typeDefs } from './generated/prisma/prisma-schema.js';

const prisma = new Prisma({
    typeDefs,
    endpoint: 'http://localhost:4466'
});

const preparedTopLevelQueryResolvers = prepareTopLevelResolvers(prisma.query);
const preparedTopLevelMutationResolvers = prepareTopLevelResolvers(prisma.mutation);

const resolvers = {
    Query: {
        ...preparedTopLevelQueryResolvers
    },
    Mutation: {
        ...preparedTopLevelMutationResolvers
    }
};

export const handler = async (event, context, callback) => {
    try {
        const server = new GraphQLServerLambda({
            typeDefs,
            resolvers
        });

        server.graphqlHandler(event, context, (error, output) => {
            callback(error, {
                ...output,
                statusCode: 200
            });
        });
    }
    catch(error) {
        console.log(error);
    }
};

function prepareTopLevelResolvers(resolverObject) {
    return Object.entries(resolverObject).reduce((result, entry) => {
            const resolverName = entry[0];
            const resolverFunction = entry[1];
            return {
                ...result,
                [resolverName]: async (parent, args, context, info) => {
                    return await resolverFunction(args, info);
                }
            };
    }, {});
}