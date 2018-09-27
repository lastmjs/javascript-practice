import {html, render} from 'lit-html';
import 'prendus-question-elements/prendus-view-question.ts';
import {Store} from '../services/store';
import {request} from '../services/graphql';

class JPAssessment extends HTMLElement {
    set assessmentId(val: string) {
        (async () => {
            const response = await request(`
                query($id: ID!) {
                    assessment(where: {
                        id: $id
                    }) {
                        assessML
                        javaScript
                        order
                        concept {
                            id
                            title
                            assessments {
                                id
                                order
                            }
                        }
                    }
                }
            `, {
                id: val
            });

            Store.dispatch({
                type: 'SET_CURRENT_ASSESSMENT',
                assessment: response.assessment
            });

            Store.dispatch({
                type: 'SET_CURRENT_CONCEPT',
                concept: response.assessment.concept
            });
        })();
    }

    async connectedCallback() {
        Store.subscribe(() => render(this.render(Store.getState()), this));
    }

    questionResponse(e: any) {
        const checkAnswerResponse = e.detail.checkAnswerResponse;
        alert(checkAnswerResponse);
        // Store.dispatch({
        //     type: 'SET_USER_COMPLETED',
        //     correct: checkAnswerResponse === 'Correct'
        // });
    }

    render(state) {
        return html`
            <style>
                /* This is just to hack the input boxes temporarily */
                span {
                    min-width: 100px !important;
                }

                @media (min-width: 1000px) {
                    .question-container {
                        margin-top: 10vh;
                        margin-left: auto;
                        margin-right: auto;
                        width: 75%;
                    }
                }

                @media (max-width: 1000px) {
                    .question-container {
                        width: 100%;
                    }
                }
            </style>

            <div class="question-container">
                <prendus-view-question .question=${state.currentAssessment} @question-response=${(e: any) => this.questionResponse(e)}>Loading...</prendus-view-question>
            </div>
        `;
    }
}

window.customElements.define('jp-assessment', JPAssessment);