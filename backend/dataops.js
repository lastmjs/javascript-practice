export const dataopsTypeDefs = `
    type Mutation {
        signup(email: String!, password: String!, termsAccepted: Boolean!): AuthPayload!
        login(email: String!, password: String!): AuthPayload!
        checkAnswer(assessmentId: ID!, correct: Boolean!): CheckAnswerPayload!
        viewSolution(assessmentId: ID!): ViewSolutionPayload!
        createAssessment(data: AssessmentCreateInput!): Assessment!
        buyTokens(stripeTokenId: String!, numTokens: Int!, pricePerToken: Int!): BuyTokensPayload!
        acceptNewTerms: AcceptNewTermsPayload!
    }
    
    type AuthPayload {
        user: User!
        jwt: String!
    }

    type CheckAnswerPayload {
        correct: Boolean
        tokenReward: Int
        allowed: Boolean!
    }

    type ViewSolutionPayload {
        tokenReward: Int
        allowed: Boolean!
    }

    type BuyTokensPayload {
        success: Boolean!
    }

    type AcceptNewTermsPayload {
        success: Boolean!
    }
`;