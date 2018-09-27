export const typeDefs = /* GraphQL */ `type AggregateAssessment {
  count: Int!
}

type AggregateConcept {
  count: Int!
}

type AggregateCourse {
  count: Int!
}

type Assessment {
  id: ID!
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

input AssessmentCreateWithoutConceptInput {
  assessML: String!
  javaScript: String!
  order: Int!
}

type AssessmentEdge {
  node: Assessment!
  cursor: String!
}

enum AssessmentOrderByInput {
  id_ASC
  id_DESC
  assessML_ASC
  assessML_DESC
  javaScript_ASC
  javaScript_DESC
  order_ASC
  order_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type AssessmentPreviousValues {
  id: ID!
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

input AssessmentUpdateWithoutConceptDataInput {
  assessML: String
  javaScript: String
  order: Int
}

input AssessmentUpdateWithWhereUniqueWithoutConceptInput {
  where: AssessmentWhereUniqueInput!
  data: AssessmentUpdateWithoutConceptDataInput!
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
  title_ASC
  title_DESC
  order_ASC
  order_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type ConceptPreviousValues {
  id: ID!
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
  title_ASC
  title_DESC
  order_ASC
  order_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type CoursePreviousValues {
  id: ID!
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

scalar Long

type Mutation {
  createAssessment(data: AssessmentCreateInput!): Assessment!
  updateAssessment(data: AssessmentUpdateInput!, where: AssessmentWhereUniqueInput!): Assessment
  updateManyAssessments(data: AssessmentUpdateInput!, where: AssessmentWhereInput): BatchPayload!
  upsertAssessment(where: AssessmentWhereUniqueInput!, create: AssessmentCreateInput!, update: AssessmentUpdateInput!): Assessment!
  deleteAssessment(where: AssessmentWhereUniqueInput!): Assessment
  deleteManyAssessments(where: AssessmentWhereInput): BatchPayload!
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
  concept(where: ConceptWhereUniqueInput!): Concept
  concepts(where: ConceptWhereInput, orderBy: ConceptOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Concept]!
  conceptsConnection(where: ConceptWhereInput, orderBy: ConceptOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): ConceptConnection!
  course(where: CourseWhereUniqueInput!): Course
  courses(where: CourseWhereInput, orderBy: CourseOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Course]!
  coursesConnection(where: CourseWhereInput, orderBy: CourseOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): CourseConnection!
  node(id: ID!): Node
}

type Subscription {
  assessment(where: AssessmentSubscriptionWhereInput): AssessmentSubscriptionPayload
  concept(where: ConceptSubscriptionWhereInput): ConceptSubscriptionPayload
  course(where: CourseSubscriptionWhereInput): CourseSubscriptionPayload
}
`