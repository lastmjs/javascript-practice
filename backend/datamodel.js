export const datamodelTypeDefs = `
directive @unique on FIELD | FIELD_DEFINITION
directive @private on FIELD | FIELD_DEFINITION
directive @visibility(type: VisibilityType!) on FIELD | FIELD_DEFINITION

type User  {
  id: ID! @unique @visibility(type: OWNER)
  createdAt: DateTime! @private
  updatedAt: DateTime! @private
  email: String! @unique @visibility(type: OWNER)
  password: String! @private
  tokens: Int! @visibility(type: OWNER)
  assessmentInfos: [AssessmentInfo!]! @visibility(type: OWNER)
}

type Course {
  id: ID! @unique
  createdAt: DateTime!
  updatedAt: DateTime!
  title: String!
  concepts: [Concept!]!
  order: Int!
}

type Concept {
  id: ID! @unique
  createdAt: DateTime!
  updatedAt: DateTime!
  title: String!
  course: Course!
  assessments: [Assessment!]!
  order: Int!
}

type Assessment {
  id: ID! @unique
  createdAt: DateTime!
  updatedAt: DateTime!
  concept: Concept!
  assessML: String!
  javaScript: String!
  order: Int!
}

type TokenTransaction {
  id: ID! @unique
  createdAt: DateTime!
  updatedAt: DateTime!
  user: User!
  amount: Int!
  type: TokenTransactionType!
}

type AssessmentInfo {
  id: ID! @unique
  createdAt: DateTime!
  updatedAt: DateTime!
  user: User!
  assessment: Assessment!
  answeredCorrectly: Boolean!
  solutionViewed: Boolean!
}

enum TokenTransactionType {
  ANSWER_CORRECT
  ANSWER_INCORRECT
  VIEW_SOLUTION
  EXERCISE_CREATED_AND_ACCEPTED
  INITIAL_ENDOWMENT
}


enum VisibilityType {
  OWNER
}
`;