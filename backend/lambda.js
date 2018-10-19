import { GraphQLServerLambda } from 'graphql-yoga';
import { Prisma } from 'prisma-binding';
import { typeDefs } from './generated/prisma/prisma-schema.js';
import { signup } from './resolvers/signup.js';
import { login } from './resolvers/login.js';
import { checkAnswer } from './resolvers/check-answer.js';
import { viewSolution } from './resolvers/view-solution.js';
import { mergeTypes } from 'merge-graphql-schemas';
import { dataopsTypeDefs } from './dataops.js';

export const prisma = new Prisma({
    typeDefs,
    endpoint: process.env.AWS_REGION ? 'https://us1.prisma.sh/jordan-last/javascript-practice/dev' : 'http://localhost:4466',
    secret: process.env.PRISMA_SERVER_SECRET
});

console.log(process.env.PRISMA_SERVER_SECRET);

const preparedTopLevelQueryResolvers = prepareTopLevelResolvers(prisma.query);
const preparedTopLevelMutationResolvers = prepareTopLevelResolvers(prisma.mutation);

const resolvers = {
    Query: {
        ...preparedTopLevelQueryResolvers
    },
    Mutation: {
        ...preparedTopLevelMutationResolvers,
        signup,
        login,
        checkAnswer,
        viewSolution
    }
};

const ultimateTypeDefs = mergeTypes([
    typeDefs,
    dataopsTypeDefs
], {
    all: true
});

const lambda = new GraphQLServerLambda({
    typeDefs: ultimateTypeDefs,
    resolvers,
    context: (req) => req,
    resolverValidationOptions: {
        requireResolversForResolveType: false
    }
});

export const handler = (() => {
    console.log(process.env.PRISMA_SERVER_SECRET);
    return lambda.handler;
})();

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
