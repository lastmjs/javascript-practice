import { request } from '../services/graphql';
import { Store } from './store';
import page from 'page';
import { NO_MORE_EXERCISES } from './constants';

export async function configureParentConcept(parentConceptId: string) {
    const response = await request(`
        query {
            parentConcept: concepts(where: {
                id: "${parentConceptId}"
            }) {
                id
                title
                parent {
                    id
                    title
                    parent {
                        id
                    }
                }
            }

            parentConceptChildren: concepts(${parentConceptId ? `where: {
                parent: {
                    id: "${parentConceptId}"
                }
            }` : `where: {
                parent: null
            }`}, orderBy: order_ASC) {
                id
                title
                assessments(first: 1, orderBy: order_ASC) {
                    id
                }
                parent {
                    id
                    title
                    parent {
                        id
                    }
                }
            }
        }
    `);

    const currentConcept = response.parentConceptChildren[0];

    if (!currentConcept) {
        Store.dispatch({
            type: 'SET_CURRENT_CONCEPT',
            concept: response.parentConcept[0]
        });

        return;
    }

    const numAssessmentsResponse = await request(`
        query {
            assessmentsConnection(where: {
                concept: {
                    id: "${currentConcept.id}"
                }
            }) {
                aggregate {
                    count
                }
            }
        }
    `);

    Store.dispatch({
        type: 'SET_CURRENT_CONCEPT',
        concept: currentConcept
    });

    Store.dispatch({
        type: 'SET_CONCEPTS',
        concepts: response.parentConceptChildren
    });

    Store.dispatch({
        type: 'SET_CURRENT_CONCEPT_NUM_ASSESSMENTS',
        currentConceptNumAssessments: numAssessmentsResponse.assessmentsConnection.aggregate.count
    });

    if (currentConcept.assessments[0]) {
        //TODO figure out how to handle side effects elegantly
        setTimeout(() => {
            page(`/assessment/${currentConcept.assessments[0].id}/view`);
        });
    }
    else {
        setTimeout(() => {
            page(`/assessment/${NO_MORE_EXERCISES}/view`);
        });
    }
}

export async function configureCurrentAssessment(assessmentId: string) {

}

async function configureAssessmentsAndConcepts() {

}

// export async function configureAssessmentsAndConcepts(options: {
//     conceptId?: string,
//     assessmentId?: string
// }) {
//     //TODO set current concept
//     //TODO set concepts to current concept children
//     //TODO set current assessment
// }

// // export async function setCurrentAssessment() {
//     //TODO set current concept
//     //TODO set concepts to current concept children
//     //TODO set current assessment
// // }