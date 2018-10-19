import { html, render } from 'lit-html';
import 'prendus-question-elements/prendus-view-question.ts';
import { Store } from '../services/store';
import { request } from '../services/graphql';
import { jpContainerCSSClass, zIndexLayer6 } from '../services/constants';

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

    async questionResponse(e: any) {
        const checkAnswerResponse = e.detail.checkAnswerResponse;

        const response = await request(`
            mutation($assessmentId: ID!, $correct: Boolean!) {
                checkAnswer(assessmentId: $assessmentId, correct: $correct) {
                    allowed
                    tokenReward
                    correct
                }
            }
        `, {
            assessmentId: Store.getState().currentAssessment.id,
            correct: checkAnswerResponse === 'Correct'
        });

        if (!response) {
            return;
        }

        if (!response.checkAnswer.allowed) {
            alert('You do not have enough tokens to submit an answer');
            return;
        }

        if (response.checkAnswer.correct) {
            alert('Correct!');
        }

        if (!response.checkAnswer.correct) {
            alert('Incorrect!');
        }

        if (response.checkAnswer.tokenReward > 0) {
            alert(`+${response.checkAnswer.tokenReward} ${response.checkAnswer.tokenReward === 1 ? 'token' : 'tokens'}!`);
        }

        if (response.checkAnswer.tokenReward < 0) {
            alert(`${response.checkAnswer.tokenReward} ${response.checkAnswer.tokenReward === -1 ? 'token' : 'tokens'}!`);
        }

        const updateUserResponse = await request(`
            query($userId: ID!) {
                user(where: {
                    id: $userId
                }) {
                    tokens
                }
            }
        `, {
            userId: Store.getState().user.id
        });

        Store.dispatch({
            type: 'SET_USER_TOKENS',
            tokens: updateUserResponse.user.tokens
        });
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

    async showSolution() {
        const showSolutionResponse = await request(`
            mutation($assessmentId: ID!) {
                viewSolution(assessmentId: $assessmentId) {
                    allowed
                    tokenReward
                }
            }
        `, {
            assessmentId: Store.getState().currentAssessment.id
        });

        if (!showSolutionResponse) {
            return;
        }

        if (!showSolutionResponse.viewSolution.allowed) {
            alert('You do not have enough tokens to view the solution');
            return;
        }

        if (showSolutionResponse.viewSolution.tokenReward < 0) {
            alert(`${showSolutionResponse.viewSolution.tokenReward} ${showSolutionResponse.viewSolution.tokenReward === -1 ? 'token' : 'tokens'}!`);
        }

        const updateUserResponse = await request(`
            query($userId: ID!) {
                user(where: {
                    id: $userId
                }) {
                    tokens
                }
            }
        `, {
            userId: Store.getState().user.id
        });

        Store.dispatch({
            type: 'SET_USER_TOKENS',
            tokens: updateUserResponse.user.tokens
        });

        //TODO we need to figure out the rendering for the solution, any state changes erase the state of the solution
        //TODO and the question is shown again
        // setTimeout(() => {
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
                this.querySelector('#solution-button').innerHTML = `Exercise`;
                this.querySelector('#submit-button').setAttribute('disabled', true);
            }
        // }, 1000);
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

                ${jpContainerCSSClass(state)}                

                .assessment-container {
                    display: grid;
                    grid-template-rows: 90% 10%;
                    height: 100%;
                }

                .bottom-buttons-container {
                    display: flex;
                    z-index: ${zIndexLayer6};
                    box-shadow: 0px -5px 5px -5px grey;
                }

                .bottom-button {
                    flex: 1;
                    font-size: calc(12px + 1vmin);
                    padding: calc(12px + 1vmin);
                    background: none;
                    border: none;
                    font-family: monospace;
                    transition: background-color .5s ease;
                    cursor: pointer;
                }
            </style>

            <div class="assessment-container">
                    <div id="question-container" class="jp-container">
                        <h1>${state.currentConcept && state.currentConcept.title}</h1>
                        <h2>Exercise ${state.currentAssessment && state.currentAssessment.order + 1} / ${state.currentConcept && state.currentConcept.assessments.length}</h2>
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