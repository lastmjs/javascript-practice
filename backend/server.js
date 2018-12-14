import { GraphQLServer } from 'graphql-yoga';
import { Prisma } from 'prisma-binding';
import { typeDefs } from './generated/prisma/prisma-schema.js';
import { signup } from './resolvers/signup.js';
import { login } from './resolvers/login.js';
import { checkAnswer } from './resolvers/check-answer.js';
import { viewSolution } from './resolvers/view-solution.js';
import { viewSourceCode } from './resolvers/view-source-code.js';
import { mergeTypes } from 'merge-graphql-schemas';
import { dataopsTypeDefs } from './dataops.js';
import { datamodelTypeDefs } from './datamodel.js';
import { PrivateDirective } from './schema-directives/private-directive.js';
import { VisibilityDirective } from './schema-directives/visibility-directive.js';
import { createAssessment } from './resolvers/create-assessment.js';
import { updateAssessment } from './resolvers/update-assessment.js';
import { buyTokens } from './resolvers/buy-tokens.js';
import { acceptNewTerms } from './resolvers/accept-new-terms.js';
import { submitFeedback } from './resolvers/submit-feedback.js';

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
        buyTokens,
        acceptNewTerms,
        submitFeedback,
        viewSourceCode
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

const server = new GraphQLServer({
    typeDefs: ultimateTypeDefs,
    resolvers,
    schemaDirectives,
    context: (req) => req,
    resolverValidationOptions: {
        requireResolversForResolveType: false
    }
});

const port = process.env.PORT || 4000;
server.start({
   port 
}, () => console.log(`Server is running on http://localhost:${port}`));

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