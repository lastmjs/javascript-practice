const migrate = require('./migrate.js');

const PAGE_SIZE = 100;

try {
    migrate(PAGE_SIZE, countOriginalEntities, getOriginalEntities, buildMutations);
}
catch(error) {
    console.log(error);
}

function countOriginalEntities() {
    return 'unknown, not yet implemented in Prisma';
}

async function getOriginalEntities(client, cursor, pageSize) {
    const data = await client.request(`
        query($cursor: Int!, $pageSize: Int!) {
            assessments(skip: $cursor, first: $pageSize) {
                id
            }
        }
    `, {
        cursor,
        pageSize
    });

    return data.assessments;
}

function buildMutations(assessments) {
    return assessments.reduce((result, assessment, index) => {
        const assessmentIdVariableKey = `assessmentId${index}`;
        const assessmentIdVariableValue = assessment.id;

        const authorIdVariableKey = `authorId${index}`;
        throw new Error('Make sure to enter the correct authorId');
        const authorIdVariableValue = '';

        return {
            ...result,
            mutationString: `${result.mutationString}
                updateAssessment${index}: updateAssessment(data: {
                    author: {
                        connect: {
                            id: $${authorIdVariableKey}
                        }
                    }
                }, where: {
                    id: $${assessmentIdVariableKey}
                }) {
                    id
                }
            `,
            mutationVariables: {
                ...result.mutationVariables,
                [assessmentIdVariableKey]: assessmentIdVariableValue,
                [authorIdVariableKey]: authorIdVariableValue
            },
            mutationVariableTypes: {
                ...result.mutationVariableTypes,
                [assessmentIdVariableKey]: 'ID!',
                [authorIdVariableKey]: 'ID!'
            }
        };
    }, {
        mutationString: '',
        mutationVariables: {}
    });
}