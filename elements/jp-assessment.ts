import { html, render } from 'lit-html';
import 'assess-elements/assess-item.ts';
import { Store } from '../services/store';
import { request } from '../services/graphql';
import { jpContainerCSSClass, zIndexLayer6 } from '../services/constants';
import { loadUser } from '../services/init';
import page from 'page';
import { NO_MORE_EXERCISES } from '../services/constants';
import { CREATE_ASSESSMENT } from '../services/constants';
import '@vaadin/vaadin-tabs/vaadin-tabs.js';
import './jp-assessment-edit';

class JPAssessment extends HTMLElement {
    tabIndex: number = 0;

    set assessmentId(val: string) {
        this._assessmentId = val;

        if (val === NO_MORE_EXERCISES) {
            setTimeout(() => {
                Store.dispatch({
                    type: 'TRIGGER_RENDER'
                });
            });
            return;
        }

        if (val === CREATE_ASSESSMENT) {
            this.tabIndex = 2;
            setTimeout(() => {
                Store.dispatch({
                    type: 'TRIGGER_RENDER'
                });
            });
            return;
        }

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
                    verified
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

        this.tabIndex = 0;
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
        const state = Store.getState();
        if (state.currentAssessment && state.currentConcept && state.currentAssessment.order === state.currentConcept.assessments.length - 1) {
            page(`/assessment/${NO_MORE_EXERCISES}/view`);
        }
        else {
            Store.dispatch({
                type: 'NEXT_QUESTION'
            });
        }
    }

    previousAssessmentClick() {
        const state = Store.getState();
        if (this.assessmentId === NO_MORE_EXERCISES) {
            page(`/assessment/${state.currentAssessment.id}/view`);
        }
        else {
            Store.dispatch({
                type: 'PREVIOUS_QUESTION'
            });
        }
    }

    showExercise(e: any) {
        e.stopPropagation();

        this.tabIndex = 0;

        const prendusViewQuestion = this.querySelector('#prendus-view-question');
        prendusViewQuestion.showExercise();
    }

    async showSolution(e: any) {
        e.stopPropagation();

        const prendusViewQuestion = this.querySelector('#prendus-view-question');
        
        if (prendusViewQuestion.showingSolution) {
            return;
        }
        
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
        
        this.tabIndex = 1;

        prendusViewQuestion.showSolution();

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

    async showSourceCode(e: any) {
        e.stopPropagation();
        
        Store.dispatch({
            type: 'SHOW_LOAD_INDICATOR'
        });
        
        const viewSourceCodeResponse = await request(`
            mutation($assessmentId: ID!) {
                viewSourceCode(assessmentId: $assessmentId) {
                    allowed
                    tokenReward
                }
            }
        `, {
            assessmentId: Store.getState().currentAssessment.id
        });
        
        if (!viewSourceCodeResponse) {
            Store.dispatch({
                type: 'HIDE_LOAD_INDICATOR'
            });
            
            return;
        }
        
        if (!viewSourceCodeResponse.viewSourceCode.allowed) {
            Store.dispatch({
                type: 'ADD_NOTIFICATION',
                notification: 'You do not have enough tokens to view the source code'
            });
            
            Store.dispatch({
                type: 'HIDE_LOAD_INDICATOR'
            });
            
            return;
        }
        
        if (viewSourceCodeResponse.viewSourceCode.tokenReward < 0) {
            Store.dispatch({
                type: 'ADD_NOTIFICATION',
                notification: `${viewSourceCodeResponse.viewSourceCode.tokenReward} ${viewSourceCodeResponse.viewSourceCode.tokenReward === -1 ? 'token' : 'tokens'}`
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
        
        this.tabIndex = 2;

        Store.dispatch({
            type: 'SET_USER_TOKENS',
            tokens: updateUserResponse.user.tokens
        });

        Store.dispatch({
            type: 'HIDE_LOAD_INDICATOR'
        });
    }

    render(state: any) {
        return html`
            <style>
                /* This is just to hack the input boxes temporarily */
                span {
                    min-width: 100px !important;
                    background-color: white;
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
                        <h1
                            ?hidden=${this.assessmentId === CREATE_ASSESSMENT}
                        >
                            ${state.currentConcept && state.currentConcept.title}
                        </h1>
                        <h2
                            ?hidden=${this.assessmentId === NO_MORE_EXERCISES || this.assessmentId === CREATE_ASSESSMENT}
                        >
                            Exercise
                                ${state.currentAssessment && state.currentAssessment.order + 1} / 
                                ${state.currentConcept && state.currentConcept.assessments.length}
                                ${this.assessmentInfo && this.assessmentInfo.answeredCorrectly ? 
                                    html`- <span style="color: green; background: transparent">Completed</span>` : 
                                ''
                            }
                        </h2>
                        <h4
                            ?hidden=${this.assessmentId === NO_MORE_EXERCISES || this.assessmentId === CREATE_ASSESSMENT}
                            style="color: ${state.currentAssessment.verified ? 'green' : 'red'}"
                            title="${
                                state.currentAssessment.verified ? 
                                'This exercise has been reviewed by the JavaScript Practice team and has been found to be of high quality.' : 
                                'This exercise has not been reviewed by the JavaScript Practice team. Its quality is unknown.'
                            }"
                        >
                            ${state.currentAssessment.verified ? 'Verified' : 'Unverified'}
                        </h4>
                        <vaadin-tabs .selected="${this.tabIndex}" ?hidden=${this.assessmentId === NO_MORE_EXERCISES}>
                            <vaadin-tab ?disabled=${this.assessmentId === CREATE_ASSESSMENT} @click=${(e: any) => this.showExercise(e)}>Exercise</vaadin-tab>
                            <vaadin-tab ?disabled=${this.assessmentId === CREATE_ASSESSMENT} @click=${(e: any) => this.showSolution(e)}>Solution</vaadin-tab>
                            <vaadin-tab @click=${(e: any) => this.showSourceCode(e)}>Source code</vaadin-tab>
                        </vaadin-tabs>
                        <h2 ?hidden=${this.assessmentId !== NO_MORE_EXERCISES}>Looks like there are no more exercises</h2>
                        <h3 ?hidden=${this.assessmentId !== NO_MORE_EXERCISES}>Why not <a href="assessment/create">create an exercise</a>?</h3>
                        <p ?hidden=${this.assessmentId !== NO_MORE_EXERCISES}>We are building this course together, so help shape it!</p>
                        <p ?hidden=${this.assessmentId !== NO_MORE_EXERCISES}>You might learn something new and help others learn from your unique point of view.</p>
                        <assess-item
                            id="prendus-view-question"
                            .question=${state.currentAssessment}
                            @question-response=${(e: any) => this.questionResponse(e)}
                            @question-changed=${() => this.questionChanged()}
                            @question-built=${() => this.questionBuilt()}
                            ?hidden=${
                                this.assessmentId === NO_MORE_EXERCISES ||
                                this.assessmentId === CREATE_ASSESSMENT ||
                                this.tabIndex === 2
                            }
                        >
                            Loading...
                        </assess-item>

                        <div style="padding: 2%">
                            <jp-assessment-edit
                                .assessmentId=${this.assessmentId}
                                ?hidden=${this.assessmentId === NO_MORE_EXERCISES || this.tabIndex !== 2}
                            ></jp-assessment-edit>
                        </div>
                   
                    </div>
        
                    <div class="bottom-buttons-container">
                        <button
                            id="prev-button"
                            class="bottom-button"
                            @click=${() => this.previousAssessmentClick()}
                            ?disabled=${
                                (state.currentAssessment && state.currentAssessment.order === 0) ||
                                this.assessmentId === CREATE_ASSESSMENT
                            }
                        >
                            Prev
                        </button>

                        <button
                            id="submit-button"
                            class="bottom-button"
                            @click=${() => this.submitAnswer()}
                            ?disabled=${
                                this.assessmentId === NO_MORE_EXERCISES ||
                                this.assessmentId === CREATE_ASSESSMENT ||
                                this.tabIndex === 1
                            }
                        >
                            Submit
                        </button>
                        
                        <button
                            id="next-button"
                            class="bottom-button"
                            @click=${() => this.nextAssessmentClick()}
                            ?disabled=${
                                this.assessmentId === NO_MORE_EXERCISES ||
                                this.assessmentId === CREATE_ASSESSMENT
                            }
                        >
                            Next
                        </button>
                    </div>
            </div>

        `;
    }
}

window.customElements.define('jp-assessment', JPAssessment);