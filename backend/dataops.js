export const dataopsTypeDefs = `
    type Mutation {
        signup(email: String!, password: String!): AuthPayload!
        login(email: String!, password: String!): AuthPayload!
        checkAnswer(assessmentId: ID!, correct: Boolean!): CheckAnswerPayload!
        viewSolution(assessmentId: ID!): ViewSolutionPayload!
        createAssessment(data: AssessmentCreateInput!): Assessment!
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
`;