module.exports = {
        typeDefs: /* GraphQL */ `type AggregateAssessment {
  count: Int!
}

type AggregateAssessmentInfo {
  count: Int!
}

type AggregateConcept {
  count: Int!
}

type AggregateCourse {
  count: Int!
}

type AggregateTokenTransaction {
  count: Int!
}

type AggregateUser {
  count: Int!
}

type Assessment {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  concept: Concept!
  assessML: String!
  javaScript: String!
  order: Int!
}

type AssessmentConnection {
  pageInfo: PageInfo!
  edges: [AssessmentEdge]!
  aggregate: AggregateAssessment!
}

input AssessmentCreateInput {
  concept: ConceptCreateOneWithoutAssessmentsInput!
  assessML: String!
  javaScript: String!
  order: Int!
}

input AssessmentCreateManyWithoutConceptInput {
  create: [AssessmentCreateWithoutConceptInput!]
  connect: [AssessmentWhereUniqueInput!]
}

input AssessmentCreateOneInput {
  create: AssessmentCreateInput
  connect: AssessmentWhereUniqueInput
}

input AssessmentCreateWithoutConceptInput {
  assessML: String!
  javaScript: String!
  order: Int!
}

type AssessmentEdge {
  node: Assessment!
  cursor: String!
}

type AssessmentInfo {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  user: User!
  assessment: Assessment!
  answeredCorrectly: Boolean!
  solutionViewed: Boolean!
}

type AssessmentInfoConnection {
  pageInfo: PageInfo!
  edges: [AssessmentInfoEdge]!
  aggregate: AggregateAssessmentInfo!
}

input AssessmentInfoCreateInput {
  user: UserCreateOneWithoutAssessmentInfosInput!
  assessment: AssessmentCreateOneInput!
  answeredCorrectly: Boolean!
  solutionViewed: Boolean!
}

input AssessmentInfoCreateManyWithoutUserInput {
  create: [AssessmentInfoCreateWithoutUserInput!]
  connect: [AssessmentInfoWhereUniqueInput!]
}

input AssessmentInfoCreateWithoutUserInput {
  assessment: AssessmentCreateOneInput!
  answeredCorrectly: Boolean!
  solutionViewed: Boolean!
}

type AssessmentInfoEdge {
  node: AssessmentInfo!
  cursor: String!
}

enum AssessmentInfoOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
  answeredCorrectly_ASC
  answeredCorrectly_DESC
  solutionViewed_ASC
  solutionViewed_DESC
}

type AssessmentInfoPreviousValues {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  answeredCorrectly: Boolean!
  solutionViewed: Boolean!
}

type AssessmentInfoSubscriptionPayload {
  mutation: MutationType!
  node: AssessmentInfo
  updatedFields: [String!]
  previousValues: AssessmentInfoPreviousValues
}

input AssessmentInfoSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: AssessmentInfoWhereInput
  AND: [AssessmentInfoSubscriptionWhereInput!]
  OR: [AssessmentInfoSubscriptionWhereInput!]
  NOT: [AssessmentInfoSubscriptionWhereInput!]
}

input AssessmentInfoUpdateInput {
  user: UserUpdateOneRequiredWithoutAssessmentInfosInput
  assessment: AssessmentUpdateOneRequiredInput
  answeredCorrectly: Boolean
  solutionViewed: Boolean
}

input AssessmentInfoUpdateManyWithoutUserInput {
  create: [AssessmentInfoCreateWithoutUserInput!]
  delete: [AssessmentInfoWhereUniqueInput!]
  connect: [AssessmentInfoWhereUniqueInput!]
  disconnect: [AssessmentInfoWhereUniqueInput!]
  update: [AssessmentInfoUpdateWithWhereUniqueWithoutUserInput!]
  upsert: [AssessmentInfoUpsertWithWhereUniqueWithoutUserInput!]
}

input AssessmentInfoUpdateWithoutUserDataInput {
  assessment: AssessmentUpdateOneRequiredInput
  answeredCorrectly: Boolean
  solutionViewed: Boolean
}

input AssessmentInfoUpdateWithWhereUniqueWithoutUserInput {
  where: AssessmentInfoWhereUniqueInput!
  data: AssessmentInfoUpdateWithoutUserDataInput!
}

input AssessmentInfoUpsertWithWhereUniqueWithoutUserInput {
  where: AssessmentInfoWhereUniqueInput!
  update: AssessmentInfoUpdateWithoutUserDataInput!
  create: AssessmentInfoCreateWithoutUserInput!
}

input AssessmentInfoWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  user: UserWhereInput
  assessment: AssessmentWhereInput
  answeredCorrectly: Boolean
  answeredCorrectly_not: Boolean
  solutionViewed: Boolean
  solutionViewed_not: Boolean
  AND: [AssessmentInfoWhereInput!]
  OR: [AssessmentInfoWhereInput!]
  NOT: [AssessmentInfoWhereInput!]
}

input AssessmentInfoWhereUniqueInput {
  id: ID
}

enum AssessmentOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
  assessML_ASC
  assessML_DESC
  javaScript_ASC
  javaScript_DESC
  order_ASC
  order_DESC
}

type AssessmentPreviousValues {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  assessML: String!
  javaScript: String!
  order: Int!
}

type AssessmentSubscriptionPayload {
  mutation: MutationType!
  node: Assessment
  updatedFields: [String!]
  previousValues: AssessmentPreviousValues
}

input AssessmentSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: AssessmentWhereInput
  AND: [AssessmentSubscriptionWhereInput!]
  OR: [AssessmentSubscriptionWhereInput!]
  NOT: [AssessmentSubscriptionWhereInput!]
}

input AssessmentUpdateDataInput {
  concept: ConceptUpdateOneRequiredWithoutAssessmentsInput
  assessML: String
  javaScript: String
  order: Int
}

input AssessmentUpdateInput {
  concept: ConceptUpdateOneRequiredWithoutAssessmentsInput
  assessML: String
  javaScript: String
  order: Int
}

input AssessmentUpdateManyWithoutConceptInput {
  create: [AssessmentCreateWithoutConceptInput!]
  delete: [AssessmentWhereUniqueInput!]
  connect: [AssessmentWhereUniqueInput!]
  disconnect: [AssessmentWhereUniqueInput!]
  update: [AssessmentUpdateWithWhereUniqueWithoutConceptInput!]
  upsert: [AssessmentUpsertWithWhereUniqueWithoutConceptInput!]
}

input AssessmentUpdateOneRequiredInput {
  create: AssessmentCreateInput
  update: AssessmentUpdateDataInput
  upsert: AssessmentUpsertNestedInput
  connect: AssessmentWhereUniqueInput
}

input AssessmentUpdateWithoutConceptDataInput {
  assessML: String
  javaScript: String
  order: Int
}

input AssessmentUpdateWithWhereUniqueWithoutConceptInput {
  where: AssessmentWhereUniqueInput!
  data: AssessmentUpdateWithoutConceptDataInput!
}

input AssessmentUpsertNestedInput {
  update: AssessmentUpdateDataInput!
  create: AssessmentCreateInput!
}

input AssessmentUpsertWithWhereUniqueWithoutConceptInput {
  where: AssessmentWhereUniqueInput!
  update: AssessmentUpdateWithoutConceptDataInput!
  create: AssessmentCreateWithoutConceptInput!
}

input AssessmentWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  concept: ConceptWhereInput
  assessML: String
  assessML_not: String
  assessML_in: [String!]
  assessML_not_in: [String!]
  assessML_lt: String
  assessML_lte: String
  assessML_gt: String
  assessML_gte: String
  assessML_contains: String
  assessML_not_contains: String
  assessML_starts_with: String
  assessML_not_starts_with: String
  assessML_ends_with: String
  assessML_not_ends_with: String
  javaScript: String
  javaScript_not: String
  javaScript_in: [String!]
  javaScript_not_in: [String!]
  javaScript_lt: String
  javaScript_lte: String
  javaScript_gt: String
  javaScript_gte: String
  javaScript_contains: String
  javaScript_not_contains: String
  javaScript_starts_with: String
  javaScript_not_starts_with: String
  javaScript_ends_with: String
  javaScript_not_ends_with: String
  order: Int
  order_not: Int
  order_in: [Int!]
  order_not_in: [Int!]
  order_lt: Int
  order_lte: Int
  order_gt: Int
  order_gte: Int
  AND: [AssessmentWhereInput!]
  OR: [AssessmentWhereInput!]
  NOT: [AssessmentWhereInput!]
}

input AssessmentWhereUniqueInput {
  id: ID
}

type BatchPayload {
  count: Long!
}

type Concept {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  title: String!
  course: Course!
  assessments(where: AssessmentWhereInput, orderBy: AssessmentOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Assessment!]
  order: Int!
}

type ConceptConnection {
  pageInfo: PageInfo!
  edges: [ConceptEdge]!
  aggregate: AggregateConcept!
}

input ConceptCreateInput {
  title: String!
  course: CourseCreateOneWithoutConceptsInput!
  assessments: AssessmentCreateManyWithoutConceptInput
  order: Int!
}

input ConceptCreateManyWithoutCourseInput {
  create: [ConceptCreateWithoutCourseInput!]
  connect: [ConceptWhereUniqueInput!]
}

input ConceptCreateOneWithoutAssessmentsInput {
  create: ConceptCreateWithoutAssessmentsInput
  connect: ConceptWhereUniqueInput
}

input ConceptCreateWithoutAssessmentsInput {
  title: String!
  course: CourseCreateOneWithoutConceptsInput!
  order: Int!
}

input ConceptCreateWithoutCourseInput {
  title: String!
  assessments: AssessmentCreateManyWithoutConceptInput
  order: Int!
}

type ConceptEdge {
  node: Concept!
  cursor: String!
}

enum ConceptOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
  title_ASC
  title_DESC
  order_ASC
  order_DESC
}

type ConceptPreviousValues {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  title: String!
  order: Int!
}

type ConceptSubscriptionPayload {
  mutation: MutationType!
  node: Concept
  updatedFields: [String!]
  previousValues: ConceptPreviousValues
}

input ConceptSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: ConceptWhereInput
  AND: [ConceptSubscriptionWhereInput!]
  OR: [ConceptSubscriptionWhereInput!]
  NOT: [ConceptSubscriptionWhereInput!]
}

input ConceptUpdateInput {
  title: String
  course: CourseUpdateOneRequiredWithoutConceptsInput
  assessments: AssessmentUpdateManyWithoutConceptInput
  order: Int
}

input ConceptUpdateManyWithoutCourseInput {
  create: [ConceptCreateWithoutCourseInput!]
  delete: [ConceptWhereUniqueInput!]
  connect: [ConceptWhereUniqueInput!]
  disconnect: [ConceptWhereUniqueInput!]
  update: [ConceptUpdateWithWhereUniqueWithoutCourseInput!]
  upsert: [ConceptUpsertWithWhereUniqueWithoutCourseInput!]
}

input ConceptUpdateOneRequiredWithoutAssessmentsInput {
  create: ConceptCreateWithoutAssessmentsInput
  update: ConceptUpdateWithoutAssessmentsDataInput
  upsert: ConceptUpsertWithoutAssessmentsInput
  connect: ConceptWhereUniqueInput
}

input ConceptUpdateWithoutAssessmentsDataInput {
  title: String
  course: CourseUpdateOneRequiredWithoutConceptsInput
  order: Int
}

input ConceptUpdateWithoutCourseDataInput {
  title: String
  assessments: AssessmentUpdateManyWithoutConceptInput
  order: Int
}

input ConceptUpdateWithWhereUniqueWithoutCourseInput {
  where: ConceptWhereUniqueInput!
  data: ConceptUpdateWithoutCourseDataInput!
}

input ConceptUpsertWithoutAssessmentsInput {
  update: ConceptUpdateWithoutAssessmentsDataInput!
  create: ConceptCreateWithoutAssessmentsInput!
}

input ConceptUpsertWithWhereUniqueWithoutCourseInput {
  where: ConceptWhereUniqueInput!
  update: ConceptUpdateWithoutCourseDataInput!
  create: ConceptCreateWithoutCourseInput!
}

input ConceptWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  title: String
  title_not: String
  title_in: [String!]
  title_not_in: [String!]
  title_lt: String
  title_lte: String
  title_gt: String
  title_gte: String
  title_contains: String
  title_not_contains: String
  title_starts_with: String
  title_not_starts_with: String
  title_ends_with: String
  title_not_ends_with: String
  course: CourseWhereInput
  assessments_every: AssessmentWhereInput
  assessments_some: AssessmentWhereInput
  assessments_none: AssessmentWhereInput
  order: Int
  order_not: Int
  order_in: [Int!]
  order_not_in: [Int!]
  order_lt: Int
  order_lte: Int
  order_gt: Int
  order_gte: Int
  AND: [ConceptWhereInput!]
  OR: [ConceptWhereInput!]
  NOT: [ConceptWhereInput!]
}

input ConceptWhereUniqueInput {
  id: ID
}

type Course {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  title: String!
  concepts(where: ConceptWhereInput, orderBy: ConceptOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Concept!]
  order: Int!
}

type CourseConnection {
  pageInfo: PageInfo!
  edges: [CourseEdge]!
  aggregate: AggregateCourse!
}

input CourseCreateInput {
  title: String!
  concepts: ConceptCreateManyWithoutCourseInput
  order: Int!
}

input CourseCreateOneWithoutConceptsInput {
  create: CourseCreateWithoutConceptsInput
  connect: CourseWhereUniqueInput
}

input CourseCreateWithoutConceptsInput {
  title: String!
  order: Int!
}

type CourseEdge {
  node: Course!
  cursor: String!
}

enum CourseOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
  title_ASC
  title_DESC
  order_ASC
  order_DESC
}

type CoursePreviousValues {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  title: String!
  order: Int!
}

type CourseSubscriptionPayload {
  mutation: MutationType!
  node: Course
  updatedFields: [String!]
  previousValues: CoursePreviousValues
}

input CourseSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: CourseWhereInput
  AND: [CourseSubscriptionWhereInput!]
  OR: [CourseSubscriptionWhereInput!]
  NOT: [CourseSubscriptionWhereInput!]
}

input CourseUpdateInput {
  title: String
  concepts: ConceptUpdateManyWithoutCourseInput
  order: Int
}

input CourseUpdateOneRequiredWithoutConceptsInput {
  create: CourseCreateWithoutConceptsInput
  update: CourseUpdateWithoutConceptsDataInput
  upsert: CourseUpsertWithoutConceptsInput
  connect: CourseWhereUniqueInput
}

input CourseUpdateWithoutConceptsDataInput {
  title: String
  order: Int
}

input CourseUpsertWithoutConceptsInput {
  update: CourseUpdateWithoutConceptsDataInput!
  create: CourseCreateWithoutConceptsInput!
}

input CourseWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  title: String
  title_not: String
  title_in: [String!]
  title_not_in: [String!]
  title_lt: String
  title_lte: String
  title_gt: String
  title_gte: String
  title_contains: String
  title_not_contains: String
  title_starts_with: String
  title_not_starts_with: String
  title_ends_with: String
  title_not_ends_with: String
  concepts_every: ConceptWhereInput
  concepts_some: ConceptWhereInput
  concepts_none: ConceptWhereInput
  order: Int
  order_not: Int
  order_in: [Int!]
  order_not_in: [Int!]
  order_lt: Int
  order_lte: Int
  order_gt: Int
  order_gte: Int
  AND: [CourseWhereInput!]
  OR: [CourseWhereInput!]
  NOT: [CourseWhereInput!]
}

input CourseWhereUniqueInput {
  id: ID
}

scalar DateTime

scalar Long

type Mutation {
  createAssessment(data: AssessmentCreateInput!): Assessment!
  updateAssessment(data: AssessmentUpdateInput!, where: AssessmentWhereUniqueInput!): Assessment
  updateManyAssessments(data: AssessmentUpdateInput!, where: AssessmentWhereInput): BatchPayload!
  upsertAssessment(where: AssessmentWhereUniqueInput!, create: AssessmentCreateInput!, update: AssessmentUpdateInput!): Assessment!
  deleteAssessment(where: AssessmentWhereUniqueInput!): Assessment
  deleteManyAssessments(where: AssessmentWhereInput): BatchPayload!
  createAssessmentInfo(data: AssessmentInfoCreateInput!): AssessmentInfo!
  updateAssessmentInfo(data: AssessmentInfoUpdateInput!, where: AssessmentInfoWhereUniqueInput!): AssessmentInfo
  updateManyAssessmentInfoes(data: AssessmentInfoUpdateInput!, where: AssessmentInfoWhereInput): BatchPayload!
  upsertAssessmentInfo(where: AssessmentInfoWhereUniqueInput!, create: AssessmentInfoCreateInput!, update: AssessmentInfoUpdateInput!): AssessmentInfo!
  deleteAssessmentInfo(where: AssessmentInfoWhereUniqueInput!): AssessmentInfo
  deleteManyAssessmentInfoes(where: AssessmentInfoWhereInput): BatchPayload!
  createConcept(data: ConceptCreateInput!): Concept!
  updateConcept(data: ConceptUpdateInput!, where: ConceptWhereUniqueInput!): Concept
  updateManyConcepts(data: ConceptUpdateInput!, where: ConceptWhereInput): BatchPayload!
  upsertConcept(where: ConceptWhereUniqueInput!, create: ConceptCreateInput!, update: ConceptUpdateInput!): Concept!
  deleteConcept(where: ConceptWhereUniqueInput!): Concept
  deleteManyConcepts(where: ConceptWhereInput): BatchPayload!
  createCourse(data: CourseCreateInput!): Course!
  updateCourse(data: CourseUpdateInput!, where: CourseWhereUniqueInput!): Course
  updateManyCourses(data: CourseUpdateInput!, where: CourseWhereInput): BatchPayload!
  upsertCourse(where: CourseWhereUniqueInput!, create: CourseCreateInput!, update: CourseUpdateInput!): Course!
  deleteCourse(where: CourseWhereUniqueInput!): Course
  deleteManyCourses(where: CourseWhereInput): BatchPayload!
  createTokenTransaction(data: TokenTransactionCreateInput!): TokenTransaction!
  updateTokenTransaction(data: TokenTransactionUpdateInput!, where: TokenTransactionWhereUniqueInput!): TokenTransaction
  updateManyTokenTransactions(data: TokenTransactionUpdateInput!, where: TokenTransactionWhereInput): BatchPayload!
  upsertTokenTransaction(where: TokenTransactionWhereUniqueInput!, create: TokenTransactionCreateInput!, update: TokenTransactionUpdateInput!): TokenTransaction!
  deleteTokenTransaction(where: TokenTransactionWhereUniqueInput!): TokenTransaction
  deleteManyTokenTransactions(where: TokenTransactionWhereInput): BatchPayload!
  createUser(data: UserCreateInput!): User!
  updateUser(data: UserUpdateInput!, where: UserWhereUniqueInput!): User
  updateManyUsers(data: UserUpdateInput!, where: UserWhereInput): BatchPayload!
  upsertUser(where: UserWhereUniqueInput!, create: UserCreateInput!, update: UserUpdateInput!): User!
  deleteUser(where: UserWhereUniqueInput!): User
  deleteManyUsers(where: UserWhereInput): BatchPayload!
}

enum MutationType {
  CREATED
  UPDATED
  DELETED
}

interface Node {
  id: ID!
}

type PageInfo {
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  startCursor: String
  endCursor: String
}

type Query {
  assessment(where: AssessmentWhereUniqueInput!): Assessment
  assessments(where: AssessmentWhereInput, orderBy: AssessmentOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Assessment]!
  assessmentsConnection(where: AssessmentWhereInput, orderBy: AssessmentOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): AssessmentConnection!
  assessmentInfo(where: AssessmentInfoWhereUniqueInput!): AssessmentInfo
  assessmentInfoes(where: AssessmentInfoWhereInput, orderBy: AssessmentInfoOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [AssessmentInfo]!
  assessmentInfoesConnection(where: AssessmentInfoWhereInput, orderBy: AssessmentInfoOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): AssessmentInfoConnection!
  concept(where: ConceptWhereUniqueInput!): Concept
  concepts(where: ConceptWhereInput, orderBy: ConceptOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Concept]!
  conceptsConnection(where: ConceptWhereInput, orderBy: ConceptOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): ConceptConnection!
  course(where: CourseWhereUniqueInput!): Course
  courses(where: CourseWhereInput, orderBy: CourseOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Course]!
  coursesConnection(where: CourseWhereInput, orderBy: CourseOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): CourseConnection!
  tokenTransaction(where: TokenTransactionWhereUniqueInput!): TokenTransaction
  tokenTransactions(where: TokenTransactionWhereInput, orderBy: TokenTransactionOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [TokenTransaction]!
  tokenTransactionsConnection(where: TokenTransactionWhereInput, orderBy: TokenTransactionOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): TokenTransactionConnection!
  user(where: UserWhereUniqueInput!): User
  users(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User]!
  usersConnection(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): UserConnection!
  node(id: ID!): Node
}

type Subscription {
  assessment(where: AssessmentSubscriptionWhereInput): AssessmentSubscriptionPayload
  assessmentInfo(where: AssessmentInfoSubscriptionWhereInput): AssessmentInfoSubscriptionPayload
  concept(where: ConceptSubscriptionWhereInput): ConceptSubscriptionPayload
  course(where: CourseSubscriptionWhereInput): CourseSubscriptionPayload
  tokenTransaction(where: TokenTransactionSubscriptionWhereInput): TokenTransactionSubscriptionPayload
  user(where: UserSubscriptionWhereInput): UserSubscriptionPayload
}

type TokenTransaction {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  user: User!
  amount: Int!
  type: TokenTransactionType!
}

type TokenTransactionConnection {
  pageInfo: PageInfo!
  edges: [TokenTransactionEdge]!
  aggregate: AggregateTokenTransaction!
}

input TokenTransactionCreateInput {
  user: UserCreateOneInput!
  amount: Int!
  type: TokenTransactionType!
}

type TokenTransactionEdge {
  node: TokenTransaction!
  cursor: String!
}

enum TokenTransactionOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
  amount_ASC
  amount_DESC
  type_ASC
  type_DESC
}

type TokenTransactionPreviousValues {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  amount: Int!
  type: TokenTransactionType!
}

type TokenTransactionSubscriptionPayload {
  mutation: MutationType!
  node: TokenTransaction
  updatedFields: [String!]
  previousValues: TokenTransactionPreviousValues
}

input TokenTransactionSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: TokenTransactionWhereInput
  AND: [TokenTransactionSubscriptionWhereInput!]
  OR: [TokenTransactionSubscriptionWhereInput!]
  NOT: [TokenTransactionSubscriptionWhereInput!]
}

enum TokenTransactionType {
  ANSWER_CORRECT
  ANSWER_INCORRECT
  VIEW_SOLUTION
  EXERCISE_CREATED_AND_ACCEPTED
  INITIAL_ENDOWMENT
}

input TokenTransactionUpdateInput {
  user: UserUpdateOneRequiredInput
  amount: Int
  type: TokenTransactionType
}

input TokenTransactionWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  user: UserWhereInput
  amount: Int
  amount_not: Int
  amount_in: [Int!]
  amount_not_in: [Int!]
  amount_lt: Int
  amount_lte: Int
  amount_gt: Int
  amount_gte: Int
  type: TokenTransactionType
  type_not: TokenTransactionType
  type_in: [TokenTransactionType!]
  type_not_in: [TokenTransactionType!]
  AND: [TokenTransactionWhereInput!]
  OR: [TokenTransactionWhereInput!]
  NOT: [TokenTransactionWhereInput!]
}

input TokenTransactionWhereUniqueInput {
  id: ID
}

type User {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  email: String!
  password: String!
  tokens: Int!
  assessmentInfos(where: AssessmentInfoWhereInput, orderBy: AssessmentInfoOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [AssessmentInfo!]
}

type UserConnection {
  pageInfo: PageInfo!
  edges: [UserEdge]!
  aggregate: AggregateUser!
}

input UserCreateInput {
  email: String!
  password: String!
  tokens: Int!
  assessmentInfos: AssessmentInfoCreateManyWithoutUserInput
}

input UserCreateOneInput {
  create: UserCreateInput
  connect: UserWhereUniqueInput
}

input UserCreateOneWithoutAssessmentInfosInput {
  create: UserCreateWithoutAssessmentInfosInput
  connect: UserWhereUniqueInput
}

input UserCreateWithoutAssessmentInfosInput {
  email: String!
  password: String!
  tokens: Int!
}

type UserEdge {
  node: User!
  cursor: String!
}

enum UserOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
  email_ASC
  email_DESC
  password_ASC
  password_DESC
  tokens_ASC
  tokens_DESC
}

type UserPreviousValues {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  email: String!
  password: String!
  tokens: Int!
}

type UserSubscriptionPayload {
  mutation: MutationType!
  node: User
  updatedFields: [String!]
  previousValues: UserPreviousValues
}

input UserSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: UserWhereInput
  AND: [UserSubscriptionWhereInput!]
  OR: [UserSubscriptionWhereInput!]
  NOT: [UserSubscriptionWhereInput!]
}

input UserUpdateDataInput {
  email: String
  password: String
  tokens: Int
  assessmentInfos: AssessmentInfoUpdateManyWithoutUserInput
}

input UserUpdateInput {
  email: String
  password: String
  tokens: Int
  assessmentInfos: AssessmentInfoUpdateManyWithoutUserInput
}

input UserUpdateOneRequiredInput {
  create: UserCreateInput
  update: UserUpdateDataInput
  upsert: UserUpsertNestedInput
  connect: UserWhereUniqueInput
}

input UserUpdateOneRequiredWithoutAssessmentInfosInput {
  create: UserCreateWithoutAssessmentInfosInput
  update: UserUpdateWithoutAssessmentInfosDataInput
  upsert: UserUpsertWithoutAssessmentInfosInput
  connect: UserWhereUniqueInput
}

input UserUpdateWithoutAssessmentInfosDataInput {
  email: String
  password: String
  tokens: Int
}

input UserUpsertNestedInput {
  update: UserUpdateDataInput!
  create: UserCreateInput!
}

input UserUpsertWithoutAssessmentInfosInput {
  update: UserUpdateWithoutAssessmentInfosDataInput!
  create: UserCreateWithoutAssessmentInfosInput!
}

input UserWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  email: String
  email_not: String
  email_in: [String!]
  email_not_in: [String!]
  email_lt: String
  email_lte: String
  email_gt: String
  email_gte: String
  email_contains: String
  email_not_contains: String
  email_starts_with: String
  email_not_starts_with: String
  email_ends_with: String
  email_not_ends_with: String
  password: String
  password_not: String
  password_in: [String!]
  password_not_in: [String!]
  password_lt: String
  password_lte: String
  password_gt: String
  password_gte: String
  password_contains: String
  password_not_contains: String
  password_starts_with: String
  password_not_starts_with: String
  password_ends_with: String
  password_not_ends_with: String
  tokens: Int
  tokens_not: Int
  tokens_in: [Int!]
  tokens_not_in: [Int!]
  tokens_lt: Int
  tokens_lte: Int
  tokens_gt: Int
  tokens_gte: Int
  assessmentInfos_every: AssessmentInfoWhereInput
  assessmentInfos_some: AssessmentInfoWhereInput
  assessmentInfos_none: AssessmentInfoWhereInput
  AND: [UserWhereInput!]
  OR: [UserWhereInput!]
  NOT: [UserWhereInput!]
}

input UserWhereUniqueInput {
  id: ID
  email: String
}
`
      }
    