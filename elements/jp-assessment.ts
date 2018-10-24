import { html, render } from 'lit-html';
import 'prendus-question-elements/prendus-view-question.ts';
import { Store } from '../services/store';
import { request } from '../services/graphql';
import { jpContainerCSSClass, zIndexLayer6 } from '../services/constants';
import { loadUser } from '../services/init';

class JPAssessment extends HTMLElement {
    set assessmentId(val: string) {
        this._assessmentId = val;
        this.loadAssessment(val);
    }

    get assessmentId() {
        return this._assessmentId;
    }

    async connectedCallback() {
        Store.subscribe(() => render(this.render(Store.getState()), this));
    }

    async loadAssessment(assessmentId: string) {
        const response = await request(`
            query($assessmentId: ID!, $userId: ID!) {
                assessment(where: {
                    id: $assessmentId
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

                assessmentInfoes(where: {
                    user: {
                        id: $userId
                    }
                    assessment: {
                        id: $assessmentId
                    }
                }) {
                    id
                    answeredCorrectly
                }
            }
        `, {
            assessmentId,
            userId: Store.getState().user ? Store.getState().user.id : ''
        });

        if (response) {
            //TODO figure out local redux state management
            this.assessmentInfo = response.assessmentInfoes[0];
        }

        Store.dispatch({
            type: 'SET_CURRENT_ASSESSMENT',
            assessment: response.assessment
        });

        Store.dispatch({
            type: 'SET_CURRENT_CONCEPT',
            concept: response.assessment.concept
        });
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

        Store.dispatch({
            type: 'HIDE_LOAD_INDICATOR'
        });

        if (!response) {
            return;
        }

        if (!response.checkAnswer.allowed) {
            Store.dispatch({
                type: 'ADD_NOTIFICATION',
                notification: 'You do not have enough tokens to submit an answer'
            });
            return;
        }

        if (response.checkAnswer.correct) {
            Store.dispatch({
                type: 'ADD_NOTIFICATION',
                notification: 'Correct'
            });
        }

        if (!response.checkAnswer.correct) {
            Store.dispatch({
                type: 'ADD_NOTIFICATION',
                notification: 'Incorrect'
            });
        }

        if (response.checkAnswer.tokenReward > 0) {
            Store.dispatch({
                type: 'ADD_NOTIFICATION',
                notification: `+${response.checkAnswer.tokenReward} ${response.checkAnswer.tokenReward === 1 ? 'token' : 'tokens'}`
            });
        }

        if (response.checkAnswer.tokenReward < 0) {
            Store.dispatch({
                type: 'ADD_NOTIFICATION',
                notification: `${response.checkAnswer.tokenReward} ${response.checkAnswer.tokenReward === -1 ? 'token' : 'tokens'}`
            });
        }

        loadUser();

        this.loadAssessment(this.assessmentId);
    }

    questionChanged() {
        Store.dispatch({
            type: 'HIDE_GLOBAL_LOAD_INDICATOR'
        });

        Store.dispatch({
            type: 'HIDE_LOAD_INDICATOR'
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

        //TODO this is evil
        this.querySelector('#solution-button').innerHTML = `Solution`;
        this.querySelector('#submit-button').removeAttribute('disabled');
    }

    previousAssessmentClick() {
        Store.dispatch({
            type: 'PREVIOUS_QUESTION'
        });

        //TODO this is evil
        this.querySelector('#solution-button').innerHTML = `Solution`;
        this.querySelector('#submit-button').removeAttribute('disabled');
    }

    async showSolution() {
        Store.dispatch({
            type: 'SHOW_LOAD_INDICATOR'
        });

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
            Store.dispatch({
                type: 'HIDE_LOAD_INDICATOR'
            });

            return;
        }

        if (!showSolutionResponse.viewSolution.allowed) {
            Store.dispatch({
                type: 'ADD_NOTIFICATION',
                notification: 'You do not have enough tokens to view the solution'
            });

            Store.dispatch({
                type: 'HIDE_LOAD_INDICATOR'
            });

            return;
        }

        if (showSolutionResponse.viewSolution.tokenReward < 0) {
            Store.dispatch({
                type: 'ADD_NOTIFICATION',
                notification: `${showSolutionResponse.viewSolution.tokenReward} ${showSolutionResponse.viewSolution.tokenReward === -1 ? 'token' : 'tokens'}`
            });
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

        //TODO we need to figure out the rendering for the solution, any state changes erase the state of the solution
        //TODO and the question is shown again
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

        Store.dispatch({
            type: 'SET_USER_TOKENS',
            tokens: updateUserResponse.user.tokens
        });
    }

    submitAnswer() {
        Store.dispatch({
            type: 'SHOW_LOAD_INDICATOR'
        });

        const prendusViewQuestion = this.querySelector('#prendus-view-question');
        prendusViewQuestion.checkAnswer();
    }

    render(state: any) {
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
                        <h2>Exercise ${state.currentAssessment && state.currentAssessment.order + 1} / ${state.currentConcept && state.currentConcept.assessments.length} ${this.assessmentInfo && this.assessmentInfo.answeredCorrectly ? html`- <span style="color: green; background: transparent">Completed</span>` : ''}</h2>
                        <prendus-view-question
                            id="prendus-view-question"
                            .question=${state.currentAssessment}
                            @question-response=${(e: any) => this.questionResponse(e)}
                            @question-changed=${() => this.questionChanged()}
                            @question-built=${() => this.questionBuilt()}
                        >
                            Loading...
                        </prendus-view-question>
                    </div>
        
                    <div class="bottom-buttons-container">
                        <button
                            id="prev-button"
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
                            id="next-button"
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