import { GraphQLServerLambda } from 'graphql-yoga';
import { Prisma } from 'prisma-binding';
import { typeDefs } from './generated/prisma/prisma-schema.js';
import { signup } from './resolvers/signup.js';
import { login } from './resolvers/login.js';
import { checkAnswer } from './resolvers/check-answer.js';
import { viewSolution } from './resolvers/view-solution.js';
import { mergeTypes } from 'merge-graphql-schemas';
import { dataopsTypeDefs } from './dataops.js';
import { datamodelTypeDefs } from './datamodel.js';
import { PrivateDirective } from './schema-directives/private-directive.js';
import { VisibilityDirective } from './schema-directives/visibility-directive.js';
import { createAssessment } from './resolvers/create-assessment.js';
import { updateAssessment } from './resolvers/update-assessment.js';
import { buyTokens } from './resolvers/buy-tokens.js';

export const prisma = new Prisma({
    typeDefs,
    endpoint: process.env.AWS_REGION ? 'https://us1.prisma.sh/jordan-last/javascript-practice/dev' : 'http://localhost:4466',
    secret: process.env.PRISMA_SERVER_SECRET
});

const preparedTopLevelQueryResolvers = prepareTopLevelQueries(prisma.query);
const preparedTopLevelMutationResolvers = prepareTopLevelMutations(prisma.mutation);

const resolvers = {
    Query: {
        ...preparedTopLevelQueryResolvers
    },
    Mutation: {
        ...preparedTopLevelMutationResolvers,
        signup,
        login,
        checkAnswer,
        viewSolution,
        createAssessment,
        updateAssessment,
        buyTokens
    }
};

const schemaDirectives = {
    private: PrivateDirective,
    visibility: VisibilityDirective
};

const ultimateTypeDefs = mergeTypes([
    typeDefs,
    datamodelTypeDefs,
    dataopsTypeDefs
], {
    all: true
});

const lambda = new GraphQLServerLambda({
    typeDefs: ultimateTypeDefs,
    resolvers,
    schemaDirectives,
    context: (req) => req,
    resolverValidationOptions: {
        requireResolversForResolveType: false
    }
});

export const handler = lambda.handler;

function prepareTopLevelQueries(queryObject) {
    return Object.entries(queryObject).reduce((result, entry) => {
            const resolverName = entry[0];
            const resolverFunction = entry[1];
            return {
                ...result,
                [resolverName]: async (parent, args, context, info) => {
                    return await resolverFunction(args, {
                        ...info,
                        fieldNodes: info.fieldNodes.map((fieldNode) => {
                            return {
                                ...fieldNode,
                                selectionSet: {
                                    ...fieldNode.selectionSet,
                                    selections: [...fieldNode.selectionSet.selections, {
                                        kind: 'Field',
                                        name: {
                                            kind: 'Name',
                                            value: 'id'
                                        }
                                    }]
                                }
                            };
                        })
                    });
                }
            };
    }, {});
}

function prepareTopLevelMutations(mutationObject) {
    return Object.entries(mutationObject).reduce((result, entry) => {
        const resolverName = entry[0];
        const resolverFunction = entry[1];
        return {
            ...result,
            [resolverName]: async (parent, args, context, info) => {
                throw new Error('Not authorized');
            }
        };
}, {});
}