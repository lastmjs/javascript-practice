import {html, render} from 'lit-html';
import 'prendus-question-elements/prendus-view-question.ts';
import {Store} from '../services/store';
import {request} from '../services/graphql';
import {highlightColor, zIndexLayer6} from '../services/constants';

class JPAssessment extends HTMLElement {
    set assessmentId(val: string) {
        (async () => {
            const response = await request(`
                query($id: ID!) {
                    assessment(where: {
                        id: $id
                    }) {
                        id
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
        Store.subscribe(() => {
            //TODO be very careful with this change detection, it could be the source of significant bugs in the future
            const state = Store.getState();

            if (
                state.currentAssessment === this.previousAssessment &&
                state.currentConcept === this.previousConcept
            ) {
                return;
            }

            this.previousAssessment = state.currentAssessment;
            this.previousConcept = state.currentConcept;

            render(this.render(state), this);
        });
    }

    questionResponse(e: any) {
        const checkAnswerResponse = e.detail.checkAnswerResponse;
        
        alert(checkAnswerResponse);

        if (checkAnswerResponse === 'Correct') {
            Store.dispatch({
                type: 'SET_USER_COMPLETED'
            });
        }
    }

    viewQuestionReady() {
        Store.dispatch({
            type: 'HIDE_GLOBAL_LOAD_INDICATOR'
        });
    }

    questionBuilt() {
        Store.dispatch({
            type: 'HIDE_LOAD_INDICATOR'
        });
    }

    nextAssessmentClick() {
        Store.dispatch({
            type: 'NEXT_QUESTION'
        });

        this.querySelector('#solution-button').innerHTML = `Solution`;
        this.querySelector('#submit-button').removeAttribute('disabled');
    }

    previousAssessmentClick() {
        Store.dispatch({
            type: 'PREVIOUS_QUESTION'
        });
    }

    showSolution() {
        const prendusViewQuestion = this.querySelector('#prendus-view-question');
        prendusViewQuestion.showSolutionClick();

        //TODO everything below here is evil
        //TODO rendering of this component really needs to be redone
        const solutionTemplate = <HTMLTemplateElement> this.querySelector('#solution1');

        if (solutionTemplate) {
            this.querySelector('#solution-button').innerHTML = `Solution`;
            this.querySelector('#submit-button').removeAttribute('disabled');
        }
        else {
            this.querySelector('#solution-button').innerHTML = `Question`;
            this.querySelector('#submit-button').setAttribute('disabled', true);
        }
    }

    submitAnswer() {
        const prendusViewQuestion = this.querySelector('#prendus-view-question');
        prendusViewQuestion.checkAnswer();
    }

    render(state) {
        return html`
            <style>
                /* This is just to hack the input boxes temporarily */
                span {
                    min-width: 100px !important;
                    background-color: white;
                }

                @media (min-width: 1024px) {
                    .question-container {
                        margin-left: auto;
                        margin-right: auto;
                        width: 75%;
                        font-size: calc(12px + 1vmin);
                        overflow-y: auto;
                    }
                }

                @media (max-width: 1024px) {
                    .question-container {
                        width: 96%;
                        margin-left: 2%;
                        margin-right: 2%;
                        font-size: calc(12px + 1vmin);
                        overflow-y: auto;
                    }
                }

                .assessment-container {
                    display: grid;
                    grid-template-rows: 90% 10%;
                    height: 100%;
                }

                .bottom-buttons-container {
                    display: flex;
                    z-index: ${zIndexLayer6};
                }

                .bottom-button {
                    flex: 1;
                    font-size: calc(12px + 1vmin);
                    padding: calc(12px + 1vmin);
                    background: none;
                    font-family: monospace;
                    transition: background-color .5s ease;
                    cursor: pointer;
                }
            </style>

            <div class="assessment-container">
                    <div class="question-container">
                        <h1>${state.currentConcept && state.currentConcept.title}</h1>
                        <h2>Question ${state.currentAssessment && state.currentAssessment.order + 1} / ${state.currentConcept && state.currentConcept.assessments.length}</h2>
                        <prendus-view-question
                            id="prendus-view-question"
                            .question=${state.currentAssessment}
                            @question-response=${(e: any) => this.questionResponse(e)}
                            @ready=${() => this.viewQuestionReady()}
                            @question-built=${() => this.questionBuilt()}
                        >
                            Loading...
                        </prendus-view-question>
                    </div>
        
                    <div class="bottom-buttons-container">
                        <button
                            class="bottom-button"
                            @click=${() => this.previousAssessmentClick()}
                            ?disabled=${state.currentAssessment && state.currentAssessment.order === 0}
                        >
                            Prev
                        </button>

                        <button
                            id="solution-button"
                            class="bottom-button"
                            @click=${() => this.showSolution()}
                        >
                            Solution
                        </button>

                        <button
                            id="submit-button"
                            class="bottom-button"
                            @click=${() => this.submitAnswer()}
                        >
                            Submit
                        </button>
                        
                        <button
                            class="bottom-button"
                            @click=${() => this.nextAssessmentClick()}
                            ?disabled=${state.currentAssessment && state.currentConcept && state.currentAssessment.order === state.currentConcept.assessments.length - 1}
                        >
                            Next
                        </button>
                    </div>
            </div>

        `;
    }
}

window.customElements.define('jp-assessment', JPAssessment);