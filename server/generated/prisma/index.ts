// Code generated by Prisma (prisma@1.17.1). DO NOT EDIT.
// Please don't change this file manually but run `prisma generate` to update it.
// For more information, please read the docs: https://www.prisma.io/docs/prisma-client/

import { GraphQLSchema } from "graphql";
import { IResolvers } from "graphql-tools/dist/Interfaces";
import { makePrismaClientClass, BaseClientOptions } from "prisma-client-lib";
import { typeDefs } from "./prisma-schema";

type AtLeastOne<T, U = { [K in keyof T]: Pick<T, K> }> = Partial<T> &
  U[keyof U];

export interface Exists {
  assessment: (where?: AssessmentWhereInput) => Promise<boolean>;
  concept: (where?: ConceptWhereInput) => Promise<boolean>;
  course: (where?: CourseWhereInput) => Promise<boolean>;
}

export interface Node {}

export interface Fragmentable {
  $fragment<T>(fragment: string | Object): T;
}

export interface Prisma {
  $exists: Exists;
  $graphql: <T = any>(
    query: string,
    variables?: { [key: string]: any }
  ) => Promise<T>;
  $getAbstractResolvers(filterSchema?: GraphQLSchema | string): IResolvers;

  /**
   * Queries
   */

  assessment: (where: AssessmentWhereUniqueInput) => Assessment;
  assessments: (
    args?: {
      where?: AssessmentWhereInput;
      orderBy?: AssessmentOrderByInput;
      skip?: Int;
      after?: String;
      before?: String;
      first?: Int;
      last?: Int;
    }
  ) => Promise<Array<AssessmentNode>>;
  assessmentsConnection: (
    args?: {
      where?: AssessmentWhereInput;
      orderBy?: AssessmentOrderByInput;
      skip?: Int;
      after?: String;
      before?: String;
      first?: Int;
      last?: Int;
    }
  ) => AssessmentConnection;
  concept: (where: ConceptWhereUniqueInput) => Concept;
  concepts: (
    args?: {
      where?: ConceptWhereInput;
      orderBy?: ConceptOrderByInput;
      skip?: Int;
      after?: String;
      before?: String;
      first?: Int;
      last?: Int;
    }
  ) => Promise<Array<ConceptNode>>;
  conceptsConnection: (
    args?: {
      where?: ConceptWhereInput;
      orderBy?: ConceptOrderByInput;
      skip?: Int;
      after?: String;
      before?: String;
      first?: Int;
      last?: Int;
    }
  ) => ConceptConnection;
  course: (where: CourseWhereUniqueInput) => Course;
  courses: (
    args?: {
      where?: CourseWhereInput;
      orderBy?: CourseOrderByInput;
      skip?: Int;
      after?: String;
      before?: String;
      first?: Int;
      last?: Int;
    }
  ) => Promise<Array<CourseNode>>;
  coursesConnection: (
    args?: {
      where?: CourseWhereInput;
      orderBy?: CourseOrderByInput;
      skip?: Int;
      after?: String;
      before?: String;
      first?: Int;
      last?: Int;
    }
  ) => CourseConnection;
  node: (args: { id: ID_Output }) => Node;

  /**
   * Mutations
   */

  createAssessment: (data: AssessmentCreateInput) => Assessment;
  updateAssessment: (
    args: { data: AssessmentUpdateInput; where: AssessmentWhereUniqueInput }
  ) => Assessment;
  updateManyAssessments: (
    args: { data: AssessmentUpdateInput; where?: AssessmentWhereInput }
  ) => BatchPayload;
  upsertAssessment: (
    args: {
      where: AssessmentWhereUniqueInput;
      create: AssessmentCreateInput;
      update: AssessmentUpdateInput;
    }
  ) => Assessment;
  deleteAssessment: (where: AssessmentWhereUniqueInput) => Assessment;
  deleteManyAssessments: (where?: AssessmentWhereInput) => BatchPayload;
  createConcept: (data: ConceptCreateInput) => Concept;
  updateConcept: (
    args: { data: ConceptUpdateInput; where: ConceptWhereUniqueInput }
  ) => Concept;
  updateManyConcepts: (
    args: { data: ConceptUpdateInput; where?: ConceptWhereInput }
  ) => BatchPayload;
  upsertConcept: (
    args: {
      where: ConceptWhereUniqueInput;
      create: ConceptCreateInput;
      update: ConceptUpdateInput;
    }
  ) => Concept;
  deleteConcept: (where: ConceptWhereUniqueInput) => Concept;
  deleteManyConcepts: (where?: ConceptWhereInput) => BatchPayload;
  createCourse: (data: CourseCreateInput) => Course;
  updateCourse: (
    args: { data: CourseUpdateInput; where: CourseWhereUniqueInput }
  ) => Course;
  updateManyCourses: (
    args: { data: CourseUpdateInput; where?: CourseWhereInput }
  ) => BatchPayload;
  upsertCourse: (
    args: {
      where: CourseWhereUniqueInput;
      create: CourseCreateInput;
      update: CourseUpdateInput;
    }
  ) => Course;
  deleteCourse: (where: CourseWhereUniqueInput) => Course;
  deleteManyCourses: (where?: CourseWhereInput) => BatchPayload;

  /**
   * Subscriptions
   */

  $subscribe: Subscription;
}

export interface Subscription {
  assessment: (
    where?: AssessmentSubscriptionWhereInput
  ) => AssessmentSubscriptionPayloadSubscription;
  concept: (
    where?: ConceptSubscriptionWhereInput
  ) => ConceptSubscriptionPayloadSubscription;
  course: (
    where?: CourseSubscriptionWhereInput
  ) => CourseSubscriptionPayloadSubscription;
}

export interface ClientConstructor<T> {
  new (options?: BaseClientOptions): T;
}

/**
 * Types
 */

export type ConceptOrderByInput =
  | "id_ASC"
  | "id_DESC"
  | "title_ASC"
  | "title_DESC"
  | "order_ASC"
  | "order_DESC"
  | "createdAt_ASC"
  | "createdAt_DESC"
  | "updatedAt_ASC"
  | "updatedAt_DESC";

export type AssessmentOrderByInput =
  | "id_ASC"
  | "id_DESC"
  | "assessML_ASC"
  | "assessML_DESC"
  | "javaScript_ASC"
  | "javaScript_DESC"
  | "order_ASC"
  | "order_DESC"
  | "createdAt_ASC"
  | "createdAt_DESC"
  | "updatedAt_ASC"
  | "updatedAt_DESC";

export type CourseOrderByInput =
  | "id_ASC"
  | "id_DESC"
  | "title_ASC"
  | "title_DESC"
  | "order_ASC"
  | "order_DESC"
  | "createdAt_ASC"
  | "createdAt_DESC"
  | "updatedAt_ASC"
  | "updatedAt_DESC";

export type MutationType = "CREATED" | "UPDATED" | "DELETED";

export interface ConceptUpdateOneRequiredWithoutAssessmentsInput {
  create?: ConceptCreateWithoutAssessmentsInput;
  update?: ConceptUpdateWithoutAssessmentsDataInput;
  upsert?: ConceptUpsertWithoutAssessmentsInput;
  connect?: ConceptWhereUniqueInput;
}

export type AssessmentWhereUniqueInput = AtLeastOne<{
  id: ID_Input;
}>;

export interface CourseUpdateWithoutConceptsDataInput {
  title?: String;
  order?: Int;
}

export interface ConceptWhereInput {
  id?: ID_Input;
  id_not?: ID_Input;
  id_in?: ID_Input[] | ID_Input;
  id_not_in?: ID_Input[] | ID_Input;
  id_lt?: ID_Input;
  id_lte?: ID_Input;
  id_gt?: ID_Input;
  id_gte?: ID_Input;
  id_contains?: ID_Input;
  id_not_contains?: ID_Input;
  id_starts_with?: ID_Input;
  id_not_starts_with?: ID_Input;
  id_ends_with?: ID_Input;
  id_not_ends_with?: ID_Input;
  title?: String;
  title_not?: String;
  title_in?: String[] | String;
  title_not_in?: String[] | String;
  title_lt?: String;
  title_lte?: String;
  title_gt?: String;
  title_gte?: String;
  title_contains?: String;
  title_not_contains?: String;
  title_starts_with?: String;
  title_not_starts_with?: String;
  title_ends_with?: String;
  title_not_ends_with?: String;
  course?: CourseWhereInput;
  assessments_every?: AssessmentWhereInput;
  assessments_some?: AssessmentWhereInput;
  assessments_none?: AssessmentWhereInput;
  order?: Int;
  order_not?: Int;
  order_in?: Int[] | Int;
  order_not_in?: Int[] | Int;
  order_lt?: Int;
  order_lte?: Int;
  order_gt?: Int;
  order_gte?: Int;
  AND?: ConceptWhereInput[] | ConceptWhereInput;
  OR?: ConceptWhereInput[] | ConceptWhereInput;
  NOT?: ConceptWhereInput[] | ConceptWhereInput;
}

export interface AssessmentCreateManyWithoutConceptInput {
  create?:
    | AssessmentCreateWithoutConceptInput[]
    | AssessmentCreateWithoutConceptInput;
  connect?: AssessmentWhereUniqueInput[] | AssessmentWhereUniqueInput;
}

export interface CourseUpsertWithoutConceptsInput {
  update: CourseUpdateWithoutConceptsDataInput;
  create: CourseCreateWithoutConceptsInput;
}

export interface AssessmentCreateInput {
  concept: ConceptCreateOneWithoutAssessmentsInput;
  assessML: String;
  javaScript: String;
  order: Int;
}

export interface ConceptSubscriptionWhereInput {
  mutation_in?: MutationType[] | MutationType;
  updatedFields_contains?: String;
  updatedFields_contains_every?: String[] | String;
  updatedFields_contains_some?: String[] | String;
  node?: ConceptWhereInput;
  AND?: ConceptSubscriptionWhereInput[] | ConceptSubscriptionWhereInput;
  OR?: ConceptSubscriptionWhereInput[] | ConceptSubscriptionWhereInput;
  NOT?: ConceptSubscriptionWhereInput[] | ConceptSubscriptionWhereInput;
}

export interface ConceptCreateOneWithoutAssessmentsInput {
  create?: ConceptCreateWithoutAssessmentsInput;
  connect?: ConceptWhereUniqueInput;
}

export interface ConceptUpsertWithWhereUniqueWithoutCourseInput {
  where: ConceptWhereUniqueInput;
  update: ConceptUpdateWithoutCourseDataInput;
  create: ConceptCreateWithoutCourseInput;
}

export interface ConceptCreateWithoutAssessmentsInput {
  title: String;
  course: CourseCreateOneWithoutConceptsInput;
  order: Int;
}

export interface ConceptUpdateWithWhereUniqueWithoutCourseInput {
  where: ConceptWhereUniqueInput;
  data: ConceptUpdateWithoutCourseDataInput;
}

export interface CourseCreateOneWithoutConceptsInput {
  create?: CourseCreateWithoutConceptsInput;
  connect?: CourseWhereUniqueInput;
}

export type ConceptWhereUniqueInput = AtLeastOne<{
  id: ID_Input;
}>;

export interface CourseCreateWithoutConceptsInput {
  title: String;
  order: Int;
}

export interface ConceptCreateWithoutCourseInput {
  title: String;
  assessments?: AssessmentCreateManyWithoutConceptInput;
  order: Int;
}

export interface AssessmentUpdateInput {
  concept?: ConceptUpdateOneRequiredWithoutAssessmentsInput;
  assessML?: String;
  javaScript?: String;
  order?: Int;
}

export type CourseWhereUniqueInput = AtLeastOne<{
  id: ID_Input;
}>;

export interface AssessmentUpdateManyWithoutConceptInput {
  create?:
    | AssessmentCreateWithoutConceptInput[]
    | AssessmentCreateWithoutConceptInput;
  delete?: AssessmentWhereUniqueInput[] | AssessmentWhereUniqueInput;
  connect?: AssessmentWhereUniqueInput[] | AssessmentWhereUniqueInput;
  disconnect?: AssessmentWhereUniqueInput[] | AssessmentWhereUniqueInput;
  update?:
    | AssessmentUpdateWithWhereUniqueWithoutConceptInput[]
    | AssessmentUpdateWithWhereUniqueWithoutConceptInput;
  upsert?:
    | AssessmentUpsertWithWhereUniqueWithoutConceptInput[]
    | AssessmentUpsertWithWhereUniqueWithoutConceptInput;
}

export interface AssessmentUpsertWithWhereUniqueWithoutConceptInput {
  where: AssessmentWhereUniqueInput;
  update: AssessmentUpdateWithoutConceptDataInput;
  create: AssessmentCreateWithoutConceptInput;
}

export interface ConceptUpdateWithoutAssessmentsDataInput {
  title?: String;
  course?: CourseUpdateOneRequiredWithoutConceptsInput;
  order?: Int;
}

export interface AssessmentUpdateWithWhereUniqueWithoutConceptInput {
  where: AssessmentWhereUniqueInput;
  data: AssessmentUpdateWithoutConceptDataInput;
}

export interface CourseUpdateOneRequiredWithoutConceptsInput {
  create?: CourseCreateWithoutConceptsInput;
  update?: CourseUpdateWithoutConceptsDataInput;
  upsert?: CourseUpsertWithoutConceptsInput;
  connect?: CourseWhereUniqueInput;
}

export interface AssessmentSubscriptionWhereInput {
  mutation_in?: MutationType[] | MutationType;
  updatedFields_contains?: String;
  updatedFields_contains_every?: String[] | String;
  updatedFields_contains_some?: String[] | String;
  node?: AssessmentWhereInput;
  AND?: AssessmentSubscriptionWhereInput[] | AssessmentSubscriptionWhereInput;
  OR?: AssessmentSubscriptionWhereInput[] | AssessmentSubscriptionWhereInput;
  NOT?: AssessmentSubscriptionWhereInput[] | AssessmentSubscriptionWhereInput;
}

export interface CourseWhereInput {
  id?: ID_Input;
  id_not?: ID_Input;
  id_in?: ID_Input[] | ID_Input;
  id_not_in?: ID_Input[] | ID_Input;
  id_lt?: ID_Input;
  id_lte?: ID_Input;
  id_gt?: ID_Input;
  id_gte?: ID_Input;
  id_contains?: ID_Input;
  id_not_contains?: ID_Input;
  id_starts_with?: ID_Input;
  id_not_starts_with?: ID_Input;
  id_ends_with?: ID_Input;
  id_not_ends_with?: ID_Input;
  title?: String;
  title_not?: String;
  title_in?: String[] | String;
  title_not_in?: String[] | String;
  title_lt?: String;
  title_lte?: String;
  title_gt?: String;
  title_gte?: String;
  title_contains?: String;
  title_not_contains?: String;
  title_starts_with?: String;
  title_not_starts_with?: String;
  title_ends_with?: String;
  title_not_ends_with?: String;
  concepts_every?: ConceptWhereInput;
  concepts_some?: ConceptWhereInput;
  concepts_none?: ConceptWhereInput;
  order?: Int;
  order_not?: Int;
  order_in?: Int[] | Int;
  order_not_in?: Int[] | Int;
  order_lt?: Int;
  order_lte?: Int;
  order_gt?: Int;
  order_gte?: Int;
  AND?: CourseWhereInput[] | CourseWhereInput;
  OR?: CourseWhereInput[] | CourseWhereInput;
  NOT?: CourseWhereInput[] | CourseWhereInput;
}

export interface ConceptUpdateManyWithoutCourseInput {
  create?: ConceptCreateWithoutCourseInput[] | ConceptCreateWithoutCourseInput;
  delete?: ConceptWhereUniqueInput[] | ConceptWhereUniqueInput;
  connect?: ConceptWhereUniqueInput[] | ConceptWhereUniqueInput;
  disconnect?: ConceptWhereUniqueInput[] | ConceptWhereUniqueInput;
  update?:
    | ConceptUpdateWithWhereUniqueWithoutCourseInput[]
    | ConceptUpdateWithWhereUniqueWithoutCourseInput;
  upsert?:
    | ConceptUpsertWithWhereUniqueWithoutCourseInput[]
    | ConceptUpsertWithWhereUniqueWithoutCourseInput;
}

export interface AssessmentWhereInput {
  id?: ID_Input;
  id_not?: ID_Input;
  id_in?: ID_Input[] | ID_Input;
  id_not_in?: ID_Input[] | ID_Input;
  id_lt?: ID_Input;
  id_lte?: ID_Input;
  id_gt?: ID_Input;
  id_gte?: ID_Input;
  id_contains?: ID_Input;
  id_not_contains?: ID_Input;
  id_starts_with?: ID_Input;
  id_not_starts_with?: ID_Input;
  id_ends_with?: ID_Input;
  id_not_ends_with?: ID_Input;
  concept?: ConceptWhereInput;
  assessML?: String;
  assessML_not?: String;
  assessML_in?: String[] | String;
  assessML_not_in?: String[] | String;
  assessML_lt?: String;
  assessML_lte?: String;
  assessML_gt?: String;
  assessML_gte?: String;
  assessML_contains?: String;
  assessML_not_contains?: String;
  assessML_starts_with?: String;
  assessML_not_starts_with?: String;
  assessML_ends_with?: String;
  assessML_not_ends_with?: String;
  javaScript?: String;
  javaScript_not?: String;
  javaScript_in?: String[] | String;
  javaScript_not_in?: String[] | String;
  javaScript_lt?: String;
  javaScript_lte?: String;
  javaScript_gt?: String;
  javaScript_gte?: String;
  javaScript_contains?: String;
  javaScript_not_contains?: String;
  javaScript_starts_with?: String;
  javaScript_not_starts_with?: String;
  javaScript_ends_with?: String;
  javaScript_not_ends_with?: String;
  order?: Int;
  order_not?: Int;
  order_in?: Int[] | Int;
  order_not_in?: Int[] | Int;
  order_lt?: Int;
  order_lte?: Int;
  order_gt?: Int;
  order_gte?: Int;
  AND?: AssessmentWhereInput[] | AssessmentWhereInput;
  OR?: AssessmentWhereInput[] | AssessmentWhereInput;
  NOT?: AssessmentWhereInput[] | AssessmentWhereInput;
}

export interface ConceptCreateManyWithoutCourseInput {
  create?: ConceptCreateWithoutCourseInput[] | ConceptCreateWithoutCourseInput;
  connect?: ConceptWhereUniqueInput[] | ConceptWhereUniqueInput;
}

export interface ConceptCreateInput {
  title: String;
  course: CourseCreateOneWithoutConceptsInput;
  assessments?: AssessmentCreateManyWithoutConceptInput;
  order: Int;
}

export interface AssessmentCreateWithoutConceptInput {
  assessML: String;
  javaScript: String;
  order: Int;
}

export interface ConceptUpdateInput {
  title?: String;
  course?: CourseUpdateOneRequiredWithoutConceptsInput;
  assessments?: AssessmentUpdateManyWithoutConceptInput;
  order?: Int;
}

export interface ConceptUpsertWithoutAssessmentsInput {
  update: ConceptUpdateWithoutAssessmentsDataInput;
  create: ConceptCreateWithoutAssessmentsInput;
}

export interface CourseCreateInput {
  title: String;
  concepts?: ConceptCreateManyWithoutCourseInput;
  order: Int;
}

export interface CourseUpdateInput {
  title?: String;
  concepts?: ConceptUpdateManyWithoutCourseInput;
  order?: Int;
}

export interface ConceptUpdateWithoutCourseDataInput {
  title?: String;
  assessments?: AssessmentUpdateManyWithoutConceptInput;
  order?: Int;
}

export interface CourseSubscriptionWhereInput {
  mutation_in?: MutationType[] | MutationType;
  updatedFields_contains?: String;
  updatedFields_contains_every?: String[] | String;
  updatedFields_contains_some?: String[] | String;
  node?: CourseWhereInput;
  AND?: CourseSubscriptionWhereInput[] | CourseSubscriptionWhereInput;
  OR?: CourseSubscriptionWhereInput[] | CourseSubscriptionWhereInput;
  NOT?: CourseSubscriptionWhereInput[] | CourseSubscriptionWhereInput;
}

export interface AssessmentUpdateWithoutConceptDataInput {
  assessML?: String;
  javaScript?: String;
  order?: Int;
}

export interface NodeNode {
  id: ID_Output;
}

export interface CoursePreviousValuesNode {
  id: ID_Output;
  title: String;
  order: Int;
}

export interface CoursePreviousValues
  extends Promise<CoursePreviousValuesNode>,
    Fragmentable {
  id: () => Promise<ID_Output>;
  title: () => Promise<String>;
  order: () => Promise<Int>;
}

export interface CoursePreviousValuesSubscription
  extends Promise<AsyncIterator<CoursePreviousValuesNode>>,
    Fragmentable {
  id: () => Promise<AsyncIterator<ID_Output>>;
  title: () => Promise<AsyncIterator<String>>;
  order: () => Promise<AsyncIterator<Int>>;
}

export interface AssessmentEdgeNode {
  cursor: String;
}

export interface AssessmentEdge
  extends Promise<AssessmentEdgeNode>,
    Fragmentable {
  node: <T = Assessment>() => T;
  cursor: () => Promise<String>;
}

export interface AssessmentEdgeSubscription
  extends Promise<AsyncIterator<AssessmentEdgeNode>>,
    Fragmentable {
  node: <T = AssessmentSubscription>() => T;
  cursor: () => Promise<AsyncIterator<String>>;
}

export interface ConceptPreviousValuesNode {
  id: ID_Output;
  title: String;
  order: Int;
}

export interface ConceptPreviousValues
  extends Promise<ConceptPreviousValuesNode>,
    Fragmentable {
  id: () => Promise<ID_Output>;
  title: () => Promise<String>;
  order: () => Promise<Int>;
}

export interface ConceptPreviousValuesSubscription
  extends Promise<AsyncIterator<ConceptPreviousValuesNode>>,
    Fragmentable {
  id: () => Promise<AsyncIterator<ID_Output>>;
  title: () => Promise<AsyncIterator<String>>;
  order: () => Promise<AsyncIterator<Int>>;
}

export interface BatchPayloadNode {
  count: Long;
}

export interface BatchPayload extends Promise<BatchPayloadNode>, Fragmentable {
  count: () => Promise<Long>;
}

export interface BatchPayloadSubscription
  extends Promise<AsyncIterator<BatchPayloadNode>>,
    Fragmentable {
  count: () => Promise<AsyncIterator<Long>>;
}

export interface AggregateCourseNode {
  count: Int;
}

export interface AggregateCourse
  extends Promise<AggregateCourseNode>,
    Fragmentable {
  count: () => Promise<Int>;
}

export interface AggregateCourseSubscription
  extends Promise<AsyncIterator<AggregateCourseNode>>,
    Fragmentable {
  count: () => Promise<AsyncIterator<Int>>;
}

export interface PageInfoNode {
  hasNextPage: Boolean;
  hasPreviousPage: Boolean;
  startCursor?: String;
  endCursor?: String;
}

export interface PageInfo extends Promise<PageInfoNode>, Fragmentable {
  hasNextPage: () => Promise<Boolean>;
  hasPreviousPage: () => Promise<Boolean>;
  startCursor: () => Promise<String>;
  endCursor: () => Promise<String>;
}

export interface PageInfoSubscription
  extends Promise<AsyncIterator<PageInfoNode>>,
    Fragmentable {
  hasNextPage: () => Promise<AsyncIterator<Boolean>>;
  hasPreviousPage: () => Promise<AsyncIterator<Boolean>>;
  startCursor: () => Promise<AsyncIterator<String>>;
  endCursor: () => Promise<AsyncIterator<String>>;
}

export interface CourseConnectionNode {}

export interface CourseConnection
  extends Promise<CourseConnectionNode>,
    Fragmentable {
  pageInfo: <T = PageInfo>() => T;
  edges: <T = Promise<Array<CourseEdgeNode>>>() => T;
  aggregate: <T = AggregateCourse>() => T;
}

export interface CourseConnectionSubscription
  extends Promise<AsyncIterator<CourseConnectionNode>>,
    Fragmentable {
  pageInfo: <T = PageInfoSubscription>() => T;
  edges: <T = Promise<AsyncIterator<Array<CourseEdgeSubscription>>>>() => T;
  aggregate: <T = AggregateCourseSubscription>() => T;
}

export interface AssessmentConnectionNode {}

export interface AssessmentConnection
  extends Promise<AssessmentConnectionNode>,
    Fragmentable {
  pageInfo: <T = PageInfo>() => T;
  edges: <T = Promise<Array<AssessmentEdgeNode>>>() => T;
  aggregate: <T = AggregateAssessment>() => T;
}

export interface AssessmentConnectionSubscription
  extends Promise<AsyncIterator<AssessmentConnectionNode>>,
    Fragmentable {
  pageInfo: <T = PageInfoSubscription>() => T;
  edges: <T = Promise<AsyncIterator<Array<AssessmentEdgeSubscription>>>>() => T;
  aggregate: <T = AggregateAssessmentSubscription>() => T;
}

export interface AggregateConceptNode {
  count: Int;
}

export interface AggregateConcept
  extends Promise<AggregateConceptNode>,
    Fragmentable {
  count: () => Promise<Int>;
}

export interface AggregateConceptSubscription
  extends Promise<AsyncIterator<AggregateConceptNode>>,
    Fragmentable {
  count: () => Promise<AsyncIterator<Int>>;
}

export interface AssessmentNode {
  id: ID_Output;
  assessML: String;
  javaScript: String;
  order: Int;
}

export interface Assessment extends Promise<AssessmentNode>, Fragmentable {
  id: () => Promise<ID_Output>;
  concept: <T = Concept>() => T;
  assessML: () => Promise<String>;
  javaScript: () => Promise<String>;
  order: () => Promise<Int>;
}

export interface AssessmentSubscription
  extends Promise<AsyncIterator<AssessmentNode>>,
    Fragmentable {
  id: () => Promise<AsyncIterator<ID_Output>>;
  concept: <T = ConceptSubscription>() => T;
  assessML: () => Promise<AsyncIterator<String>>;
  javaScript: () => Promise<AsyncIterator<String>>;
  order: () => Promise<AsyncIterator<Int>>;
}

export interface ConceptConnectionNode {}

export interface ConceptConnection
  extends Promise<ConceptConnectionNode>,
    Fragmentable {
  pageInfo: <T = PageInfo>() => T;
  edges: <T = Promise<Array<ConceptEdgeNode>>>() => T;
  aggregate: <T = AggregateConcept>() => T;
}

export interface ConceptConnectionSubscription
  extends Promise<AsyncIterator<ConceptConnectionNode>>,
    Fragmentable {
  pageInfo: <T = PageInfoSubscription>() => T;
  edges: <T = Promise<AsyncIterator<Array<ConceptEdgeSubscription>>>>() => T;
  aggregate: <T = AggregateConceptSubscription>() => T;
}

export interface ConceptSubscriptionPayloadNode {
  mutation: MutationType;
  updatedFields?: String[];
}

export interface ConceptSubscriptionPayload
  extends Promise<ConceptSubscriptionPayloadNode>,
    Fragmentable {
  mutation: () => Promise<MutationType>;
  node: <T = Concept>() => T;
  updatedFields: () => Promise<String[]>;
  previousValues: <T = ConceptPreviousValues>() => T;
}

export interface ConceptSubscriptionPayloadSubscription
  extends Promise<AsyncIterator<ConceptSubscriptionPayloadNode>>,
    Fragmentable {
  mutation: () => Promise<AsyncIterator<MutationType>>;
  node: <T = ConceptSubscription>() => T;
  updatedFields: () => Promise<AsyncIterator<String[]>>;
  previousValues: <T = ConceptPreviousValuesSubscription>() => T;
}

export interface CourseNode {
  id: ID_Output;
  title: String;
  order: Int;
}

export interface Course extends Promise<CourseNode>, Fragmentable {
  id: () => Promise<ID_Output>;
  title: () => Promise<String>;
  concepts: <T = Promise<Array<ConceptNode>>>(
    args?: {
      where?: ConceptWhereInput;
      orderBy?: ConceptOrderByInput;
      skip?: Int;
      after?: String;
      before?: String;
      first?: Int;
      last?: Int;
    }
  ) => T;
  order: () => Promise<Int>;
}

export interface CourseSubscription
  extends Promise<AsyncIterator<CourseNode>>,
    Fragmentable {
  id: () => Promise<AsyncIterator<ID_Output>>;
  title: () => Promise<AsyncIterator<String>>;
  concepts: <T = Promise<AsyncIterator<Array<ConceptSubscription>>>>(
    args?: {
      where?: ConceptWhereInput;
      orderBy?: ConceptOrderByInput;
      skip?: Int;
      after?: String;
      before?: String;
      first?: Int;
      last?: Int;
    }
  ) => T;
  order: () => Promise<AsyncIterator<Int>>;
}

export interface AssessmentPreviousValuesNode {
  id: ID_Output;
  assessML: String;
  javaScript: String;
  order: Int;
}

export interface AssessmentPreviousValues
  extends Promise<AssessmentPreviousValuesNode>,
    Fragmentable {
  id: () => Promise<ID_Output>;
  assessML: () => Promise<String>;
  javaScript: () => Promise<String>;
  order: () => Promise<Int>;
}

export interface AssessmentPreviousValuesSubscription
  extends Promise<AsyncIterator<AssessmentPreviousValuesNode>>,
    Fragmentable {
  id: () => Promise<AsyncIterator<ID_Output>>;
  assessML: () => Promise<AsyncIterator<String>>;
  javaScript: () => Promise<AsyncIterator<String>>;
  order: () => Promise<AsyncIterator<Int>>;
}

export interface AssessmentSubscriptionPayloadNode {
  mutation: MutationType;
  updatedFields?: String[];
}

export interface AssessmentSubscriptionPayload
  extends Promise<AssessmentSubscriptionPayloadNode>,
    Fragmentable {
  mutation: () => Promise<MutationType>;
  node: <T = Assessment>() => T;
  updatedFields: () => Promise<String[]>;
  previousValues: <T = AssessmentPreviousValues>() => T;
}

export interface AssessmentSubscriptionPayloadSubscription
  extends Promise<AsyncIterator<AssessmentSubscriptionPayloadNode>>,
    Fragmentable {
  mutation: () => Promise<AsyncIterator<MutationType>>;
  node: <T = AssessmentSubscription>() => T;
  updatedFields: () => Promise<AsyncIterator<String[]>>;
  previousValues: <T = AssessmentPreviousValuesSubscription>() => T;
}

export interface AggregateAssessmentNode {
  count: Int;
}

export interface AggregateAssessment
  extends Promise<AggregateAssessmentNode>,
    Fragmentable {
  count: () => Promise<Int>;
}

export interface AggregateAssessmentSubscription
  extends Promise<AsyncIterator<AggregateAssessmentNode>>,
    Fragmentable {
  count: () => Promise<AsyncIterator<Int>>;
}

export interface ConceptEdgeNode {
  cursor: String;
}

export interface ConceptEdge extends Promise<ConceptEdgeNode>, Fragmentable {
  node: <T = Concept>() => T;
  cursor: () => Promise<String>;
}

export interface ConceptEdgeSubscription
  extends Promise<AsyncIterator<ConceptEdgeNode>>,
    Fragmentable {
  node: <T = ConceptSubscription>() => T;
  cursor: () => Promise<AsyncIterator<String>>;
}

export interface ConceptNode {
  id: ID_Output;
  title: String;
  order: Int;
}

export interface Concept extends Promise<ConceptNode>, Fragmentable {
  id: () => Promise<ID_Output>;
  title: () => Promise<String>;
  course: <T = Course>() => T;
  assessments: <T = Promise<Array<AssessmentNode>>>(
    args?: {
      where?: AssessmentWhereInput;
      orderBy?: AssessmentOrderByInput;
      skip?: Int;
      after?: String;
      before?: String;
      first?: Int;
      last?: Int;
    }
  ) => T;
  order: () => Promise<Int>;
}

export interface ConceptSubscription
  extends Promise<AsyncIterator<ConceptNode>>,
    Fragmentable {
  id: () => Promise<AsyncIterator<ID_Output>>;
  title: () => Promise<AsyncIterator<String>>;
  course: <T = CourseSubscription>() => T;
  assessments: <T = Promise<AsyncIterator<Array<AssessmentSubscription>>>>(
    args?: {
      where?: AssessmentWhereInput;
      orderBy?: AssessmentOrderByInput;
      skip?: Int;
      after?: String;
      before?: String;
      first?: Int;
      last?: Int;
    }
  ) => T;
  order: () => Promise<AsyncIterator<Int>>;
}

export interface CourseEdgeNode {
  cursor: String;
}

export interface CourseEdge extends Promise<CourseEdgeNode>, Fragmentable {
  node: <T = Course>() => T;
  cursor: () => Promise<String>;
}

export interface CourseEdgeSubscription
  extends Promise<AsyncIterator<CourseEdgeNode>>,
    Fragmentable {
  node: <T = CourseSubscription>() => T;
  cursor: () => Promise<AsyncIterator<String>>;
}

export interface CourseSubscriptionPayloadNode {
  mutation: MutationType;
  updatedFields?: String[];
}

export interface CourseSubscriptionPayload
  extends Promise<CourseSubscriptionPayloadNode>,
    Fragmentable {
  mutation: () => Promise<MutationType>;
  node: <T = Course>() => T;
  updatedFields: () => Promise<String[]>;
  previousValues: <T = CoursePreviousValues>() => T;
}

export interface CourseSubscriptionPayloadSubscription
  extends Promise<AsyncIterator<CourseSubscriptionPayloadNode>>,
    Fragmentable {
  mutation: () => Promise<AsyncIterator<MutationType>>;
  node: <T = CourseSubscription>() => T;
  updatedFields: () => Promise<AsyncIterator<String[]>>;
  previousValues: <T = CoursePreviousValuesSubscription>() => T;
}

/*
The `Boolean` scalar type represents `true` or `false`.
*/
export type Boolean = boolean;

/*
The `Int` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1. 
*/
export type Int = number;

export type Long = string;

/*
The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"4"`) or integer (such as `4`) input value will be accepted as an ID.
*/
export type ID_Input = string | number;
export type ID_Output = string;

/*
The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text.
*/
export type String = string;

/**
 * Type Defs
 */

export const Prisma = makePrismaClientClass<ClientConstructor<Prisma>>({
  typeDefs,
  endpoint: "https://us1.prisma.sh/jordan-last/javascript-practice/dev"
});
export const prisma = new Prisma();
