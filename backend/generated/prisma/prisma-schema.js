module.exports = {
        typeDefs: /* GraphQL */ `type AggregateAnswerAttempt {
  count: Int!
}

type AggregateAssessment {
  count: Int!
}

type AggregateAssessmentInfo {
  count: Int!
}

type AggregateConcept {
  count: Int!
}

type AggregateConstant {
  count: Int!
}

type AggregateCourse {
  count: Int!
}

type AggregateFeedbackSubmission {
  count: Int!
}

type AggregateTokenReward {
  count: Int!
}

type AggregateTokenTransaction {
  count: Int!
}

type AggregateUser {
  count: Int!
}

type AnswerAttempt {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  assessmentInfo: AssessmentInfo!
  correct: Boolean!
}

type AnswerAttemptConnection {
  pageInfo: PageInfo!
  edges: [AnswerAttemptEdge]!
  aggregate: AggregateAnswerAttempt!
}

input AnswerAttemptCreateInput {
  assessmentInfo: AssessmentInfoCreateOneWithoutAnswerAttemptsInput!
  correct: Boolean!
}

input AnswerAttemptCreateManyWithoutAssessmentInfoInput {
  create: [AnswerAttemptCreateWithoutAssessmentInfoInput!]
  connect: [AnswerAttemptWhereUniqueInput!]
}

input AnswerAttemptCreateWithoutAssessmentInfoInput {
  correct: Boolean!
}

type AnswerAttemptEdge {
  node: AnswerAttempt!
  cursor: String!
}

enum AnswerAttemptOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
  correct_ASC
  correct_DESC
}

type AnswerAttemptPreviousValues {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  correct: Boolean!
}

type AnswerAttemptSubscriptionPayload {
  mutation: MutationType!
  node: AnswerAttempt
  updatedFields: [String!]
  previousValues: AnswerAttemptPreviousValues
}

input AnswerAttemptSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: AnswerAttemptWhereInput
  AND: [AnswerAttemptSubscriptionWhereInput!]
  OR: [AnswerAttemptSubscriptionWhereInput!]
  NOT: [AnswerAttemptSubscriptionWhereInput!]
}

input AnswerAttemptUpdateInput {
  assessmentInfo: AssessmentInfoUpdateOneRequiredWithoutAnswerAttemptsInput
  correct: Boolean
}

input AnswerAttemptUpdateManyMutationInput {
  correct: Boolean
}

input AnswerAttemptUpdateManyWithoutAssessmentInfoInput {
  create: [AnswerAttemptCreateWithoutAssessmentInfoInput!]
  delete: [AnswerAttemptWhereUniqueInput!]
  connect: [AnswerAttemptWhereUniqueInput!]
  disconnect: [AnswerAttemptWhereUniqueInput!]
  update: [AnswerAttemptUpdateWithWhereUniqueWithoutAssessmentInfoInput!]
  upsert: [AnswerAttemptUpsertWithWhereUniqueWithoutAssessmentInfoInput!]
}

input AnswerAttemptUpdateWithoutAssessmentInfoDataInput {
  correct: Boolean
}

input AnswerAttemptUpdateWithWhereUniqueWithoutAssessmentInfoInput {
  where: AnswerAttemptWhereUniqueInput!
  data: AnswerAttemptUpdateWithoutAssessmentInfoDataInput!
}

input AnswerAttemptUpsertWithWhereUniqueWithoutAssessmentInfoInput {
  where: AnswerAttemptWhereUniqueInput!
  update: AnswerAttemptUpdateWithoutAssessmentInfoDataInput!
  create: AnswerAttemptCreateWithoutAssessmentInfoInput!
}

input AnswerAttemptWhereInput {
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
  assessmentInfo: AssessmentInfoWhereInput
  correct: Boolean
  correct_not: Boolean
  AND: [AnswerAttemptWhereInput!]
  OR: [AnswerAttemptWhereInput!]
  NOT: [AnswerAttemptWhereInput!]
}

input AnswerAttemptWhereUniqueInput {
  id: ID
}

type Assessment {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  concept: Concept!
  assessML: String!
  javaScript: String!
  order: Int!
  verified: Boolean!
  author: User!
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
  verified: Boolean!
  author: UserCreateOneWithoutAssessmentsInput!
}

input AssessmentCreateManyWithoutAuthorInput {
  create: [AssessmentCreateWithoutAuthorInput!]
  connect: [AssessmentWhereUniqueInput!]
}

input AssessmentCreateManyWithoutConceptInput {
  create: [AssessmentCreateWithoutConceptInput!]
  connect: [AssessmentWhereUniqueInput!]
}

input AssessmentCreateOneInput {
  create: AssessmentCreateInput
  connect: AssessmentWhereUniqueInput
}

input AssessmentCreateWithoutAuthorInput {
  concept: ConceptCreateOneWithoutAssessmentsInput!
  assessML: String!
  javaScript: String!
  order: Int!
  verified: Boolean!
}

input AssessmentCreateWithoutConceptInput {
  assessML: String!
  javaScript: String!
  order: Int!
  verified: Boolean!
  author: UserCreateOneWithoutAssessmentsInput!
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
  sourceCodeViewed: Boolean!
  answerAttempts(where: AnswerAttemptWhereInput, orderBy: AnswerAttemptOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [AnswerAttempt!]
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
  sourceCodeViewed: Boolean!
  answerAttempts: AnswerAttemptCreateManyWithoutAssessmentInfoInput
}

input AssessmentInfoCreateManyWithoutUserInput {
  create: [AssessmentInfoCreateWithoutUserInput!]
  connect: [AssessmentInfoWhereUniqueInput!]
}

input AssessmentInfoCreateOneWithoutAnswerAttemptsInput {
  create: AssessmentInfoCreateWithoutAnswerAttemptsInput
  connect: AssessmentInfoWhereUniqueInput
}

input AssessmentInfoCreateWithoutAnswerAttemptsInput {
  user: UserCreateOneWithoutAssessmentInfosInput!
  assessment: AssessmentCreateOneInput!
  answeredCorrectly: Boolean!
  solutionViewed: Boolean!
  sourceCodeViewed: Boolean!
}

input AssessmentInfoCreateWithoutUserInput {
  assessment: AssessmentCreateOneInput!
  answeredCorrectly: Boolean!
  solutionViewed: Boolean!
  sourceCodeViewed: Boolean!
  answerAttempts: AnswerAttemptCreateManyWithoutAssessmentInfoInput
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
  sourceCodeViewed_ASC
  sourceCodeViewed_DESC
}

type AssessmentInfoPreviousValues {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  answeredCorrectly: Boolean!
  solutionViewed: Boolean!
  sourceCodeViewed: Boolean!
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
  sourceCodeViewed: Boolean
  answerAttempts: AnswerAttemptUpdateManyWithoutAssessmentInfoInput
}

input AssessmentInfoUpdateManyMutationInput {
  answeredCorrectly: Boolean
  solutionViewed: Boolean
  sourceCodeViewed: Boolean
}

input AssessmentInfoUpdateManyWithoutUserInput {
  create: [AssessmentInfoCreateWithoutUserInput!]
  delete: [AssessmentInfoWhereUniqueInput!]
  connect: [AssessmentInfoWhereUniqueInput!]
  disconnect: [AssessmentInfoWhereUniqueInput!]
  update: [AssessmentInfoUpdateWithWhereUniqueWithoutUserInput!]
  upsert: [AssessmentInfoUpsertWithWhereUniqueWithoutUserInput!]
}

input AssessmentInfoUpdateOneRequiredWithoutAnswerAttemptsInput {
  create: AssessmentInfoCreateWithoutAnswerAttemptsInput
  update: AssessmentInfoUpdateWithoutAnswerAttemptsDataInput
  upsert: AssessmentInfoUpsertWithoutAnswerAttemptsInput
  connect: AssessmentInfoWhereUniqueInput
}

input AssessmentInfoUpdateWithoutAnswerAttemptsDataInput {
  user: UserUpdateOneRequiredWithoutAssessmentInfosInput
  assessment: AssessmentUpdateOneRequiredInput
  answeredCorrectly: Boolean
  solutionViewed: Boolean
  sourceCodeViewed: Boolean
}

input AssessmentInfoUpdateWithoutUserDataInput {
  assessment: AssessmentUpdateOneRequiredInput
  answeredCorrectly: Boolean
  solutionViewed: Boolean
  sourceCodeViewed: Boolean
  answerAttempts: AnswerAttemptUpdateManyWithoutAssessmentInfoInput
}

input AssessmentInfoUpdateWithWhereUniqueWithoutUserInput {
  where: AssessmentInfoWhereUniqueInput!
  data: AssessmentInfoUpdateWithoutUserDataInput!
}

input AssessmentInfoUpsertWithoutAnswerAttemptsInput {
  update: AssessmentInfoUpdateWithoutAnswerAttemptsDataInput!
  create: AssessmentInfoCreateWithoutAnswerAttemptsInput!
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
  sourceCodeViewed: Boolean
  sourceCodeViewed_not: Boolean
  answerAttempts_every: AnswerAttemptWhereInput
  answerAttempts_some: AnswerAttemptWhereInput
  answerAttempts_none: AnswerAttemptWhereInput
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
  verified_ASC
  verified_DESC
}

type AssessmentPreviousValues {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  assessML: String!
  javaScript: String!
  order: Int!
  verified: Boolean!
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
  verified: Boolean
  author: UserUpdateOneRequiredWithoutAssessmentsInput
}

input AssessmentUpdateInput {
  concept: ConceptUpdateOneRequiredWithoutAssessmentsInput
  assessML: String
  javaScript: String
  order: Int
  verified: Boolean
  author: UserUpdateOneRequiredWithoutAssessmentsInput
}

input AssessmentUpdateManyMutationInput {
  assessML: String
  javaScript: String
  order: Int
  verified: Boolean
}

input AssessmentUpdateManyWithoutAuthorInput {
  create: [AssessmentCreateWithoutAuthorInput!]
  delete: [AssessmentWhereUniqueInput!]
  connect: [AssessmentWhereUniqueInput!]
  disconnect: [AssessmentWhereUniqueInput!]
  update: [AssessmentUpdateWithWhereUniqueWithoutAuthorInput!]
  upsert: [AssessmentUpsertWithWhereUniqueWithoutAuthorInput!]
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

input AssessmentUpdateWithoutAuthorDataInput {
  concept: ConceptUpdateOneRequiredWithoutAssessmentsInput
  assessML: String
  javaScript: String
  order: Int
  verified: Boolean
}

input AssessmentUpdateWithoutConceptDataInput {
  assessML: String
  javaScript: String
  order: Int
  verified: Boolean
  author: UserUpdateOneRequiredWithoutAssessmentsInput
}

input AssessmentUpdateWithWhereUniqueWithoutAuthorInput {
  where: AssessmentWhereUniqueInput!
  data: AssessmentUpdateWithoutAuthorDataInput!
}

input AssessmentUpdateWithWhereUniqueWithoutConceptInput {
  where: AssessmentWhereUniqueInput!
  data: AssessmentUpdateWithoutConceptDataInput!
}

input AssessmentUpsertNestedInput {
  update: AssessmentUpdateDataInput!
  create: AssessmentCreateInput!
}

input AssessmentUpsertWithWhereUniqueWithoutAuthorInput {
  where: AssessmentWhereUniqueInput!
  update: AssessmentUpdateWithoutAuthorDataInput!
  create: AssessmentCreateWithoutAuthorInput!
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
  verified: Boolean
  verified_not: Boolean
  author: UserWhereInput
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
  level: Int
  parent: Concept
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
  level: Int
  parent: ConceptCreateOneInput
}

input ConceptCreateManyWithoutCourseInput {
  create: [ConceptCreateWithoutCourseInput!]
  connect: [ConceptWhereUniqueInput!]
}

input ConceptCreateOneInput {
  create: ConceptCreateInput
  connect: ConceptWhereUniqueInput
}

input ConceptCreateOneWithoutAssessmentsInput {
  create: ConceptCreateWithoutAssessmentsInput
  connect: ConceptWhereUniqueInput
}

input ConceptCreateWithoutAssessmentsInput {
  title: String!
  course: CourseCreateOneWithoutConceptsInput!
  order: Int!
  level: Int
  parent: ConceptCreateOneInput
}

input ConceptCreateWithoutCourseInput {
  title: String!
  assessments: AssessmentCreateManyWithoutConceptInput
  order: Int!
  level: Int
  parent: ConceptCreateOneInput
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
  level_ASC
  level_DESC
}

type ConceptPreviousValues {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  title: String!
  order: Int!
  level: Int
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

input ConceptUpdateDataInput {
  title: String
  course: CourseUpdateOneRequiredWithoutConceptsInput
  assessments: AssessmentUpdateManyWithoutConceptInput
  order: Int
  level: Int
  parent: ConceptUpdateOneInput
}

input ConceptUpdateInput {
  title: String
  course: CourseUpdateOneRequiredWithoutConceptsInput
  assessments: AssessmentUpdateManyWithoutConceptInput
  order: Int
  level: Int
  parent: ConceptUpdateOneInput
}

input ConceptUpdateManyMutationInput {
  title: String
  order: Int
  level: Int
}

input ConceptUpdateManyWithoutCourseInput {
  create: [ConceptCreateWithoutCourseInput!]
  delete: [ConceptWhereUniqueInput!]
  connect: [ConceptWhereUniqueInput!]
  disconnect: [ConceptWhereUniqueInput!]
  update: [ConceptUpdateWithWhereUniqueWithoutCourseInput!]
  upsert: [ConceptUpsertWithWhereUniqueWithoutCourseInput!]
}

input ConceptUpdateOneInput {
  create: ConceptCreateInput
  update: ConceptUpdateDataInput
  upsert: ConceptUpsertNestedInput
  delete: Boolean
  disconnect: Boolean
  connect: ConceptWhereUniqueInput
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
  level: Int
  parent: ConceptUpdateOneInput
}

input ConceptUpdateWithoutCourseDataInput {
  title: String
  assessments: AssessmentUpdateManyWithoutConceptInput
  order: Int
  level: Int
  parent: ConceptUpdateOneInput
}

input ConceptUpdateWithWhereUniqueWithoutCourseInput {
  where: ConceptWhereUniqueInput!
  data: ConceptUpdateWithoutCourseDataInput!
}

input ConceptUpsertNestedInput {
  update: ConceptUpdateDataInput!
  create: ConceptCreateInput!
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
  level: Int
  level_not: Int
  level_in: [Int!]
  level_not_in: [Int!]
  level_lt: Int
  level_lte: Int
  level_gt: Int
  level_gte: Int
  parent: ConceptWhereInput
  AND: [ConceptWhereInput!]
  OR: [ConceptWhereInput!]
  NOT: [ConceptWhereInput!]
}

input ConceptWhereUniqueInput {
  id: ID
}

type Constant {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  key: ConstantKey!
  value: String!
}

type ConstantConnection {
  pageInfo: PageInfo!
  edges: [ConstantEdge]!
  aggregate: AggregateConstant!
}

input ConstantCreateInput {
  key: ConstantKey!
  value: String!
}

type ConstantEdge {
  node: Constant!
  cursor: String!
}

enum ConstantKey {
  TERMS_AND_PRIVACY_VERSION
  TOKEN_PRICE
}

enum ConstantOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
  key_ASC
  key_DESC
  value_ASC
  value_DESC
}

type ConstantPreviousValues {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  key: ConstantKey!
  value: String!
}

type ConstantSubscriptionPayload {
  mutation: MutationType!
  node: Constant
  updatedFields: [String!]
  previousValues: ConstantPreviousValues
}

input ConstantSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: ConstantWhereInput
  AND: [ConstantSubscriptionWhereInput!]
  OR: [ConstantSubscriptionWhereInput!]
  NOT: [ConstantSubscriptionWhereInput!]
}

input ConstantUpdateInput {
  key: ConstantKey
  value: String
}

input ConstantUpdateManyMutationInput {
  key: ConstantKey
  value: String
}

input ConstantWhereInput {
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
  key: ConstantKey
  key_not: ConstantKey
  key_in: [ConstantKey!]
  key_not_in: [ConstantKey!]
  value: String
  value_not: String
  value_in: [String!]
  value_not_in: [String!]
  value_lt: String
  value_lte: String
  value_gt: String
  value_gte: String
  value_contains: String
  value_not_contains: String
  value_starts_with: String
  value_not_starts_with: String
  value_ends_with: String
  value_not_ends_with: String
  AND: [ConstantWhereInput!]
  OR: [ConstantWhereInput!]
  NOT: [ConstantWhereInput!]
}

input ConstantWhereUniqueInput {
  id: ID
  key: ConstantKey
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

input CourseUpdateManyMutationInput {
  title: String
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

type FeedbackSubmission {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  user: User!
  text: String!
  open: Boolean!
  description: String!
}

type FeedbackSubmissionConnection {
  pageInfo: PageInfo!
  edges: [FeedbackSubmissionEdge]!
  aggregate: AggregateFeedbackSubmission!
}

input FeedbackSubmissionCreateInput {
  user: UserCreateOneInput!
  text: String!
  open: Boolean!
  description: String!
}

type FeedbackSubmissionEdge {
  node: FeedbackSubmission!
  cursor: String!
}

enum FeedbackSubmissionOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
  text_ASC
  text_DESC
  open_ASC
  open_DESC
  description_ASC
  description_DESC
}

type FeedbackSubmissionPreviousValues {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  text: String!
  open: Boolean!
  description: String!
}

type FeedbackSubmissionSubscriptionPayload {
  mutation: MutationType!
  node: FeedbackSubmission
  updatedFields: [String!]
  previousValues: FeedbackSubmissionPreviousValues
}

input FeedbackSubmissionSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: FeedbackSubmissionWhereInput
  AND: [FeedbackSubmissionSubscriptionWhereInput!]
  OR: [FeedbackSubmissionSubscriptionWhereInput!]
  NOT: [FeedbackSubmissionSubscriptionWhereInput!]
}

input FeedbackSubmissionUpdateInput {
  user: UserUpdateOneRequiredInput
  text: String
  open: Boolean
  description: String
}

input FeedbackSubmissionUpdateManyMutationInput {
  text: String
  open: Boolean
  description: String
}

input FeedbackSubmissionWhereInput {
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
  text: String
  text_not: String
  text_in: [String!]
  text_not_in: [String!]
  text_lt: String
  text_lte: String
  text_gt: String
  text_gte: String
  text_contains: String
  text_not_contains: String
  text_starts_with: String
  text_not_starts_with: String
  text_ends_with: String
  text_not_ends_with: String
  open: Boolean
  open_not: Boolean
  description: String
  description_not: String
  description_in: [String!]
  description_not_in: [String!]
  description_lt: String
  description_lte: String
  description_gt: String
  description_gte: String
  description_contains: String
  description_not_contains: String
  description_starts_with: String
  description_not_starts_with: String
  description_ends_with: String
  description_not_ends_with: String
  AND: [FeedbackSubmissionWhereInput!]
  OR: [FeedbackSubmissionWhereInput!]
  NOT: [FeedbackSubmissionWhereInput!]
}

input FeedbackSubmissionWhereUniqueInput {
  id: ID
}

scalar Long

type Mutation {
  createAnswerAttempt(data: AnswerAttemptCreateInput!): AnswerAttempt!
  updateAnswerAttempt(data: AnswerAttemptUpdateInput!, where: AnswerAttemptWhereUniqueInput!): AnswerAttempt
  updateManyAnswerAttempts(data: AnswerAttemptUpdateManyMutationInput!, where: AnswerAttemptWhereInput): BatchPayload!
  upsertAnswerAttempt(where: AnswerAttemptWhereUniqueInput!, create: AnswerAttemptCreateInput!, update: AnswerAttemptUpdateInput!): AnswerAttempt!
  deleteAnswerAttempt(where: AnswerAttemptWhereUniqueInput!): AnswerAttempt
  deleteManyAnswerAttempts(where: AnswerAttemptWhereInput): BatchPayload!
  createAssessment(data: AssessmentCreateInput!): Assessment!
  updateAssessment(data: AssessmentUpdateInput!, where: AssessmentWhereUniqueInput!): Assessment
  updateManyAssessments(data: AssessmentUpdateManyMutationInput!, where: AssessmentWhereInput): BatchPayload!
  upsertAssessment(where: AssessmentWhereUniqueInput!, create: AssessmentCreateInput!, update: AssessmentUpdateInput!): Assessment!
  deleteAssessment(where: AssessmentWhereUniqueInput!): Assessment
  deleteManyAssessments(where: AssessmentWhereInput): BatchPayload!
  createAssessmentInfo(data: AssessmentInfoCreateInput!): AssessmentInfo!
  updateAssessmentInfo(data: AssessmentInfoUpdateInput!, where: AssessmentInfoWhereUniqueInput!): AssessmentInfo
  updateManyAssessmentInfoes(data: AssessmentInfoUpdateManyMutationInput!, where: AssessmentInfoWhereInput): BatchPayload!
  upsertAssessmentInfo(where: AssessmentInfoWhereUniqueInput!, create: AssessmentInfoCreateInput!, update: AssessmentInfoUpdateInput!): AssessmentInfo!
  deleteAssessmentInfo(where: AssessmentInfoWhereUniqueInput!): AssessmentInfo
  deleteManyAssessmentInfoes(where: AssessmentInfoWhereInput): BatchPayload!
  createConcept(data: ConceptCreateInput!): Concept!
  updateConcept(data: ConceptUpdateInput!, where: ConceptWhereUniqueInput!): Concept
  updateManyConcepts(data: ConceptUpdateManyMutationInput!, where: ConceptWhereInput): BatchPayload!
  upsertConcept(where: ConceptWhereUniqueInput!, create: ConceptCreateInput!, update: ConceptUpdateInput!): Concept!
  deleteConcept(where: ConceptWhereUniqueInput!): Concept
  deleteManyConcepts(where: ConceptWhereInput): BatchPayload!
  createConstant(data: ConstantCreateInput!): Constant!
  updateConstant(data: ConstantUpdateInput!, where: ConstantWhereUniqueInput!): Constant
  updateManyConstants(data: ConstantUpdateManyMutationInput!, where: ConstantWhereInput): BatchPayload!
  upsertConstant(where: ConstantWhereUniqueInput!, create: ConstantCreateInput!, update: ConstantUpdateInput!): Constant!
  deleteConstant(where: ConstantWhereUniqueInput!): Constant
  deleteManyConstants(where: ConstantWhereInput): BatchPayload!
  createCourse(data: CourseCreateInput!): Course!
  updateCourse(data: CourseUpdateInput!, where: CourseWhereUniqueInput!): Course
  updateManyCourses(data: CourseUpdateManyMutationInput!, where: CourseWhereInput): BatchPayload!
  upsertCourse(where: CourseWhereUniqueInput!, create: CourseCreateInput!, update: CourseUpdateInput!): Course!
  deleteCourse(where: CourseWhereUniqueInput!): Course
  deleteManyCourses(where: CourseWhereInput): BatchPayload!
  createFeedbackSubmission(data: FeedbackSubmissionCreateInput!): FeedbackSubmission!
  updateFeedbackSubmission(data: FeedbackSubmissionUpdateInput!, where: FeedbackSubmissionWhereUniqueInput!): FeedbackSubmission
  updateManyFeedbackSubmissions(data: FeedbackSubmissionUpdateManyMutationInput!, where: FeedbackSubmissionWhereInput): BatchPayload!
  upsertFeedbackSubmission(where: FeedbackSubmissionWhereUniqueInput!, create: FeedbackSubmissionCreateInput!, update: FeedbackSubmissionUpdateInput!): FeedbackSubmission!
  deleteFeedbackSubmission(where: FeedbackSubmissionWhereUniqueInput!): FeedbackSubmission
  deleteManyFeedbackSubmissions(where: FeedbackSubmissionWhereInput): BatchPayload!
  createTokenReward(data: TokenRewardCreateInput!): TokenReward!
  updateTokenReward(data: TokenRewardUpdateInput!, where: TokenRewardWhereUniqueInput!): TokenReward
  updateManyTokenRewards(data: TokenRewardUpdateManyMutationInput!, where: TokenRewardWhereInput): BatchPayload!
  upsertTokenReward(where: TokenRewardWhereUniqueInput!, create: TokenRewardCreateInput!, update: TokenRewardUpdateInput!): TokenReward!
  deleteTokenReward(where: TokenRewardWhereUniqueInput!): TokenReward
  deleteManyTokenRewards(where: TokenRewardWhereInput): BatchPayload!
  createTokenTransaction(data: TokenTransactionCreateInput!): TokenTransaction!
  updateTokenTransaction(data: TokenTransactionUpdateInput!, where: TokenTransactionWhereUniqueInput!): TokenTransaction
  updateManyTokenTransactions(data: TokenTransactionUpdateManyMutationInput!, where: TokenTransactionWhereInput): BatchPayload!
  upsertTokenTransaction(where: TokenTransactionWhereUniqueInput!, create: TokenTransactionCreateInput!, update: TokenTransactionUpdateInput!): TokenTransaction!
  deleteTokenTransaction(where: TokenTransactionWhereUniqueInput!): TokenTransaction
  deleteManyTokenTransactions(where: TokenTransactionWhereInput): BatchPayload!
  createUser(data: UserCreateInput!): User!
  updateUser(data: UserUpdateInput!, where: UserWhereUniqueInput!): User
  updateManyUsers(data: UserUpdateManyMutationInput!, where: UserWhereInput): BatchPayload!
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
  answerAttempt(where: AnswerAttemptWhereUniqueInput!): AnswerAttempt
  answerAttempts(where: AnswerAttemptWhereInput, orderBy: AnswerAttemptOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [AnswerAttempt]!
  answerAttemptsConnection(where: AnswerAttemptWhereInput, orderBy: AnswerAttemptOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): AnswerAttemptConnection!
  assessment(where: AssessmentWhereUniqueInput!): Assessment
  assessments(where: AssessmentWhereInput, orderBy: AssessmentOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Assessment]!
  assessmentsConnection(where: AssessmentWhereInput, orderBy: AssessmentOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): AssessmentConnection!
  assessmentInfo(where: AssessmentInfoWhereUniqueInput!): AssessmentInfo
  assessmentInfoes(where: AssessmentInfoWhereInput, orderBy: AssessmentInfoOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [AssessmentInfo]!
  assessmentInfoesConnection(where: AssessmentInfoWhereInput, orderBy: AssessmentInfoOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): AssessmentInfoConnection!
  concept(where: ConceptWhereUniqueInput!): Concept
  concepts(where: ConceptWhereInput, orderBy: ConceptOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Concept]!
  conceptsConnection(where: ConceptWhereInput, orderBy: ConceptOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): ConceptConnection!
  constant(where: ConstantWhereUniqueInput!): Constant
  constants(where: ConstantWhereInput, orderBy: ConstantOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Constant]!
  constantsConnection(where: ConstantWhereInput, orderBy: ConstantOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): ConstantConnection!
  course(where: CourseWhereUniqueInput!): Course
  courses(where: CourseWhereInput, orderBy: CourseOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Course]!
  coursesConnection(where: CourseWhereInput, orderBy: CourseOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): CourseConnection!
  feedbackSubmission(where: FeedbackSubmissionWhereUniqueInput!): FeedbackSubmission
  feedbackSubmissions(where: FeedbackSubmissionWhereInput, orderBy: FeedbackSubmissionOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [FeedbackSubmission]!
  feedbackSubmissionsConnection(where: FeedbackSubmissionWhereInput, orderBy: FeedbackSubmissionOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): FeedbackSubmissionConnection!
  tokenReward(where: TokenRewardWhereUniqueInput!): TokenReward
  tokenRewards(where: TokenRewardWhereInput, orderBy: TokenRewardOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [TokenReward]!
  tokenRewardsConnection(where: TokenRewardWhereInput, orderBy: TokenRewardOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): TokenRewardConnection!
  tokenTransaction(where: TokenTransactionWhereUniqueInput!): TokenTransaction
  tokenTransactions(where: TokenTransactionWhereInput, orderBy: TokenTransactionOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [TokenTransaction]!
  tokenTransactionsConnection(where: TokenTransactionWhereInput, orderBy: TokenTransactionOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): TokenTransactionConnection!
  user(where: UserWhereUniqueInput!): User
  users(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User]!
  usersConnection(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): UserConnection!
  node(id: ID!): Node
}

type Subscription {
  answerAttempt(where: AnswerAttemptSubscriptionWhereInput): AnswerAttemptSubscriptionPayload
  assessment(where: AssessmentSubscriptionWhereInput): AssessmentSubscriptionPayload
  assessmentInfo(where: AssessmentInfoSubscriptionWhereInput): AssessmentInfoSubscriptionPayload
  concept(where: ConceptSubscriptionWhereInput): ConceptSubscriptionPayload
  constant(where: ConstantSubscriptionWhereInput): ConstantSubscriptionPayload
  course(where: CourseSubscriptionWhereInput): CourseSubscriptionPayload
  feedbackSubmission(where: FeedbackSubmissionSubscriptionWhereInput): FeedbackSubmissionSubscriptionPayload
  tokenReward(where: TokenRewardSubscriptionWhereInput): TokenRewardSubscriptionPayload
  tokenTransaction(where: TokenTransactionSubscriptionWhereInput): TokenTransactionSubscriptionPayload
  user(where: UserSubscriptionWhereInput): UserSubscriptionPayload
}

type TokenReward {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  type: TokenTransactionType!
  amount: Int!
}

type TokenRewardConnection {
  pageInfo: PageInfo!
  edges: [TokenRewardEdge]!
  aggregate: AggregateTokenReward!
}

input TokenRewardCreateInput {
  type: TokenTransactionType!
  amount: Int!
}

type TokenRewardEdge {
  node: TokenReward!
  cursor: String!
}

enum TokenRewardOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
  type_ASC
  type_DESC
  amount_ASC
  amount_DESC
}

type TokenRewardPreviousValues {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  type: TokenTransactionType!
  amount: Int!
}

type TokenRewardSubscriptionPayload {
  mutation: MutationType!
  node: TokenReward
  updatedFields: [String!]
  previousValues: TokenRewardPreviousValues
}

input TokenRewardSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: TokenRewardWhereInput
  AND: [TokenRewardSubscriptionWhereInput!]
  OR: [TokenRewardSubscriptionWhereInput!]
  NOT: [TokenRewardSubscriptionWhereInput!]
}

input TokenRewardUpdateInput {
  type: TokenTransactionType
  amount: Int
}

input TokenRewardUpdateManyMutationInput {
  type: TokenTransactionType
  amount: Int
}

input TokenRewardWhereInput {
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
  type: TokenTransactionType
  type_not: TokenTransactionType
  type_in: [TokenTransactionType!]
  type_not_in: [TokenTransactionType!]
  amount: Int
  amount_not: Int
  amount_in: [Int!]
  amount_not_in: [Int!]
  amount_lt: Int
  amount_lte: Int
  amount_gt: Int
  amount_gte: Int
  AND: [TokenRewardWhereInput!]
  OR: [TokenRewardWhereInput!]
  NOT: [TokenRewardWhereInput!]
}

input TokenRewardWhereUniqueInput {
  id: ID
  type: TokenTransactionType
}

type TokenTransaction {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  user: User!
  amount: Int!
  type: TokenTransactionType!
  description: String!
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
  description: String!
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
  description_ASC
  description_DESC
}

type TokenTransactionPreviousValues {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  amount: Int!
  type: TokenTransactionType!
  description: String!
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
  VIEW_SOURCE_CODE
  ASSESSMENT_SUBMITTED
  FEEDBACK_SUBMITTED
  INITIAL_ENDOWMENT
  TOKEN_PURCHASE
}

input TokenTransactionUpdateInput {
  user: UserUpdateOneRequiredInput
  amount: Int
  type: TokenTransactionType
  description: String
}

input TokenTransactionUpdateManyMutationInput {
  amount: Int
  type: TokenTransactionType
  description: String
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
  description: String
  description_not: String
  description_in: [String!]
  description_not_in: [String!]
  description_lt: String
  description_lte: String
  description_gt: String
  description_gte: String
  description_contains: String
  description_not_contains: String
  description_starts_with: String
  description_not_starts_with: String
  description_ends_with: String
  description_not_ends_with: String
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
  termsAcceptedDate: DateTime
  termsAcceptedVersion: String
  assessments(where: AssessmentWhereInput, orderBy: AssessmentOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Assessment!]
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
  termsAcceptedDate: DateTime
  termsAcceptedVersion: String
  assessments: AssessmentCreateManyWithoutAuthorInput
}

input UserCreateOneInput {
  create: UserCreateInput
  connect: UserWhereUniqueInput
}

input UserCreateOneWithoutAssessmentInfosInput {
  create: UserCreateWithoutAssessmentInfosInput
  connect: UserWhereUniqueInput
}

input UserCreateOneWithoutAssessmentsInput {
  create: UserCreateWithoutAssessmentsInput
  connect: UserWhereUniqueInput
}

input UserCreateWithoutAssessmentInfosInput {
  email: String!
  password: String!
  tokens: Int!
  termsAcceptedDate: DateTime
  termsAcceptedVersion: String
  assessments: AssessmentCreateManyWithoutAuthorInput
}

input UserCreateWithoutAssessmentsInput {
  email: String!
  password: String!
  tokens: Int!
  assessmentInfos: AssessmentInfoCreateManyWithoutUserInput
  termsAcceptedDate: DateTime
  termsAcceptedVersion: String
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
  termsAcceptedDate_ASC
  termsAcceptedDate_DESC
  termsAcceptedVersion_ASC
  termsAcceptedVersion_DESC
}

type UserPreviousValues {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  email: String!
  password: String!
  tokens: Int!
  termsAcceptedDate: DateTime
  termsAcceptedVersion: String
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
  termsAcceptedDate: DateTime
  termsAcceptedVersion: String
  assessments: AssessmentUpdateManyWithoutAuthorInput
}

input UserUpdateInput {
  email: String
  password: String
  tokens: Int
  assessmentInfos: AssessmentInfoUpdateManyWithoutUserInput
  termsAcceptedDate: DateTime
  termsAcceptedVersion: String
  assessments: AssessmentUpdateManyWithoutAuthorInput
}

input UserUpdateManyMutationInput {
  email: String
  password: String
  tokens: Int
  termsAcceptedDate: DateTime
  termsAcceptedVersion: String
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

input UserUpdateOneRequiredWithoutAssessmentsInput {
  create: UserCreateWithoutAssessmentsInput
  update: UserUpdateWithoutAssessmentsDataInput
  upsert: UserUpsertWithoutAssessmentsInput
  connect: UserWhereUniqueInput
}

input UserUpdateWithoutAssessmentInfosDataInput {
  email: String
  password: String
  tokens: Int
  termsAcceptedDate: DateTime
  termsAcceptedVersion: String
  assessments: AssessmentUpdateManyWithoutAuthorInput
}

input UserUpdateWithoutAssessmentsDataInput {
  email: String
  password: String
  tokens: Int
  assessmentInfos: AssessmentInfoUpdateManyWithoutUserInput
  termsAcceptedDate: DateTime
  termsAcceptedVersion: String
}

input UserUpsertNestedInput {
  update: UserUpdateDataInput!
  create: UserCreateInput!
}

input UserUpsertWithoutAssessmentInfosInput {
  update: UserUpdateWithoutAssessmentInfosDataInput!
  create: UserCreateWithoutAssessmentInfosInput!
}

input UserUpsertWithoutAssessmentsInput {
  update: UserUpdateWithoutAssessmentsDataInput!
  create: UserCreateWithoutAssessmentsInput!
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
  termsAcceptedDate: DateTime
  termsAcceptedDate_not: DateTime
  termsAcceptedDate_in: [DateTime!]
  termsAcceptedDate_not_in: [DateTime!]
  termsAcceptedDate_lt: DateTime
  termsAcceptedDate_lte: DateTime
  termsAcceptedDate_gt: DateTime
  termsAcceptedDate_gte: DateTime
  termsAcceptedVersion: String
  termsAcceptedVersion_not: String
  termsAcceptedVersion_in: [String!]
  termsAcceptedVersion_not_in: [String!]
  termsAcceptedVersion_lt: String
  termsAcceptedVersion_lte: String
  termsAcceptedVersion_gt: String
  termsAcceptedVersion_gte: String
  termsAcceptedVersion_contains: String
  termsAcceptedVersion_not_contains: String
  termsAcceptedVersion_starts_with: String
  termsAcceptedVersion_not_starts_with: String
  termsAcceptedVersion_ends_with: String
  termsAcceptedVersion_not_ends_with: String
  assessments_every: AssessmentWhereInput
  assessments_some: AssessmentWhereInput
  assessments_none: AssessmentWhereInput
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
    