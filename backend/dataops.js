export const dataopsTypeDefs = `
    type Mutation {
        signup(email: String!, password: String!): AuthPayload!
        login(email: String!, password: String!): AuthPayload!
        checkAnswer(assessmentId: ID!, correct: Boolean!): CheckAnswerPayload!
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
`;