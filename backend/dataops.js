export const dataopsTypeDefs = `
    type Mutation {
        signup(email: String!, password: String!, termsAccepted: Boolean!): AuthPayload!
        login(email: String!, password: String!): AuthPayload!
        checkAnswer(assessmentId: ID!, correct: Boolean!): CheckAnswerPayload!
        viewSolution(assessmentId: ID!): ViewSolutionPayload!
        createAssessment(data: AssessmentCreateInput!): Assessment!
        buyTokens(stripeTokenId: String!, numTokens: Int!, pricePerToken: Int!): BuyTokensPayload!
        acceptNewTerms: AcceptNewTermsPayload!
        submitFeedback(text: String!): SubmitFeedbackPayload!
        submitAssessment(text: String!): SubmitAssessmentPayload!
        buyNowClick: Boolean!
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

    type SubmitFeedbackPayload {
        success: Boolean!
    }

    type SubmitAssessmentPayload {
        success: Boolean!
    }
`;