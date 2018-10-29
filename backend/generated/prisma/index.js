"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prisma_lib_1 = require("prisma-client-lib");
var typeDefs = require("./prisma-schema").typeDefs;

exports.Prisma = prisma_lib_1.makePrismaClientClass({
  typeDefs,
  endpoint: `${process.env["PRISMA_SERVER_ENDPOINT"]}`,
  secret: `${process.env["PRISMA_SERVER_SECRET"]}`
});
exports.prisma = new exports.Prisma();
