export const dataopsTypeDefs = `
    type Mutation {
        signup(email: String!, password: String!): AuthPayload!
        login(email: String!, password: String!): AuthPayload!
    }
    
    type AuthPayload {
        user: User!
        jwt: String!
    }
`;