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
        Store.subscribe(() => render(this.render(Store.getState()), this));
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

    questionChanged() {
        Store.dispatch({
            type: 'HIDE_GLOBAL_LOAD_INDICATOR'
        });

        Store.dispatch({
            type: 'HIDE_LOAD_INDICATOR'
        });
    }

    nextAssessmentClick() {
        Store.dispatch({
            type: 'NEXT_QUESTION'
        });

        //TODO this is evil
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

                #question-container::-webkit-scrollbar {
                    display: none;
                }

                .question-container {
                    overflow-y: auto;
                    font-size: calc(12px + 1vmin);
                    width: ${state.desktopScreen ? '75%' : '96%'};
                    margin-left: ${state.desktopScreen ? 'auto' : '2%'};
                    margin-right: ${state.desktopScreen ? 'auto' : '2%'};
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
                    <div id="question-container" class="question-container">
                        <h1>${state.currentConcept && state.currentConcept.title}</h1>
                        <h2>Question ${state.currentAssessment && state.currentAssessment.order + 1} / ${state.currentConcept && state.currentConcept.assessments.length}</h2>
                        <prendus-view-question
                            id="prendus-view-question"
                            .question=${state.currentAssessment}
                            @question-response=${(e: any) => this.questionResponse(e)}
                            @question-changed=${() => this.questionChanged()}
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