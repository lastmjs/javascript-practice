import { GraphQLServerLambda } from 'graphql-yoga';
import { Prisma } from 'prisma-binding';
import { typeDefs } from './generated/prisma/prisma-schema.js';

const prisma = new Prisma({
    typeDefs,
    endpoint: process.env.AWS_REGION ? 'https://us1.prisma.sh/jordan-last/javascript-practice/dev' : 'http://localhost:4466'
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
    // callback(null, {
    //     statusCode: 200,
    //     body: 'Hello there'
    // });

    console.log(0);

    try {
        console.log(1);
        const server = new GraphQLServerLambda({
            typeDefs,
            resolvers,
            resolverValidationOptions: {
                requireResolversForResolveType: false
            }
        });
        console.log(2);
        server.graphqlHandler(event, context, (error, output) => {
            console.log(3);
            callback(error, {
                ...output,
                statusCode: 200
            });
        });
    }
    catch(error) {
        console.log(error);
    }

    console.log(4);
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
