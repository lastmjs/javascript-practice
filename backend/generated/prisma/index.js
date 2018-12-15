"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prisma_lib_1 = require("prisma-client-lib");
var typeDefs = require("./prisma-schema").typeDefs;

var models = [
  {
    name: "AnswerAttempt",
    embedded: false
  },
  {
    name: "Assessment",
    embedded: false
  },
  {
    name: "AssessmentInfo",
    embedded: false
  },
  {
    name: "Concept",
    embedded: false
  },
  {
    name: "Constant",
    embedded: false
  },
  {
    name: "ConstantKey",
    embedded: false
  },
  {
    name: "Course",
    embedded: false
  },
  {
    name: "FeedbackSubmission",
    embedded: false
  },
  {
    name: "TokenReward",
    embedded: false
  },
  {
    name: "TokenTransaction",
    embedded: false
  },
  {
    name: "TokenTransactionType",
    embedded: false
  },
  {
    name: "User",
    embedded: false
  },
  {
    name: "VisibilityType",
    embedded: false
  }
];
exports.Prisma = prisma_lib_1.makePrismaClientClass({
  typeDefs,
  models,
  endpoint: `${process.env["PRISMA_SERVER_ENDPOINT"]}`,
  secret: `${process.env["PRISMA_SERVER_SECRET"]}`
});
exports.prisma = new exports.Prisma();
