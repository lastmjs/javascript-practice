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

    nextQuestionClick(state: any) {
        Store.dispatch({
            type: 'NEXT_QUESTION'
        });
    }

    previousQuestionClick() {
        Store.dispatch({
            type: 'PREVIOUS_QUESTION'
        });
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

                .previous-question-button {
                    position: absolute;
                    left: 0;
                    top: 0;
                    border: none;
                    background-color: white;
                    padding: 1.5em;
                    cursor: pointer;
                    font-family: monospace;
                    transition: background-color .5s ease;
                    color: black;
                    box-shadow: 0px 0px 1px black;
                }

                .previous-question-button:hover {
                    background-color: rgba(1, 1, 1, .05);
                }

                .next-question-button {
                    position: absolute;
                    right: 0;
                    top: 0;
                    border: none;
                    background-color: white;
                    padding: 1.5em;
                    cursor: pointer;
                    font-family: monospace;
                    transition: background-color .5s ease;
                    color: black;
                    box-shadow: 0px 0px 1px black;
                }

                .next-question-button:hover {
                    background-color: rgba(1, 1, 1, .05);
                }
            </style>

            <div class="question-container">
                <prendus-view-question .question=${state.currentAssessment} @question-response=${(e: any) => this.questionResponse(e)}>Loading...</prendus-view-question>
                <button ?hidden=${state.currentAssessment && state.currentAssessment.order === 0} class="previous-question-button" @click=${(e: any) => this.previousQuestionClick()}>Previous question</button>
                <button ?hidden=${state.currentAssessment && state.currentConcept && state.currentAssessment.order === state.currentConcept.assessments.length - 1} class="next-question-button" @click=${(e: any) => this.nextQuestionClick(state)}>Next question</button>
            </div>
        `;
    }
}

window.customElements.define('jp-assessment', JPAssessment);