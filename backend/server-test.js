const { Prisma } = require('prisma-binding');
const { typeDefs } = require('./generated/prisma/prisma-schema.js');
const { GraphQLServer } = require('graphql-yoga');

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

const server = new GraphQLServer({
    typeDefs,
    resolvers
});

server.start(() => console.log('GraphQL server started'));

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
