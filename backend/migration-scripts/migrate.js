/*
Copyright 2018 Prendus LLC

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

const { GraphQLClient } = require('graphql-request');

if (process.argv.length <= 3) {
  console.log("USAGE: node convert-syntax.js ENDPOINT AUTH_TOKEN");
  process.exit(-1);
}

const ENDPOINT = process.argv[2];
const AUTH_TOKEN = process.argv[3];
const client = new GraphQLClient(ENDPOINT, {
  headers: {
    Authorization: `Bearer ${AUTH_TOKEN}`
  }
});

module.exports = async (pageSize, countOriginalEntities, getOriginalEntities, buildMutations) => {
    const totalNumEntities = await countOriginalEntities(client);
    await processEntities(0, totalNumEntities, pageSize, getOriginalEntities, buildMutations);
};

async function processEntities(cursor, count, pageSize, getOriginalEntities, buildMutations) {
    const entities = await getOriginalEntities(client, cursor, pageSize);

    if (entities.length === 0) {
        console.log(`${count}/${count}...Completed`);
        return;
    }

    console.log(`${cursor}/${count}...`);

    const buildMutationsResult = buildMutations(entities);
    const updateQuery = `
        mutation(${buildVariableDefinitions(buildMutationsResult.mutationVariables, buildMutationsResult.mutationVariableTypes)}) {
            ${buildMutationsResult.mutationString}
        }
    `;

    await client.request(updateQuery, buildMutationsResult.mutationVariables);
    await processEntities(cursor + pageSize, count, pageSize, getOriginalEntities, buildMutations);
}

function buildVariableDefinitions(mutationVariables, mutationVariableTypes) {
    return Object.keys(mutationVariables).reduce((result, mutationVariableKey) => {
        const mutationVariableType = mutationVariableTypes[mutationVariableKey];
        return `${result} $${mutationVariableKey}: ${mutationVariableType}`;
    }, '');
}