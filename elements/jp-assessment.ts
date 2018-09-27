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

    questionResponse(e: any) {
        const checkAnswerResponse = e.detail.checkAnswerResponse;
        
        Store.dispatch({
            type: 'SET_USER_COMPLETED',
            correct: checkAnswerResponse === 'Correct'
        });

        //TODO the below code is obviously disgusting and evil and must be changed...but not yet
        if (checkAnswerResponse === 'Correct') {
            this.querySelector('#question-wrapper').style.backgroundColor = 'rgba(0, 255, 0, .5)';
            
            setTimeout(() => {
                
                this.querySelector('#question-wrapper').style.transition = 'background-color .5s linear';
                this.querySelector('#question-wrapper').style.backgroundColor = 'white';
    
                setTimeout(() => {
                    this.querySelector('#question-wrapper').style.transition = '';
                }, 1000);
            });
        }
        else {
            this.querySelector('#question-wrapper').style.backgroundColor = 'rgba(255, 0, 0, .5)';
            
            setTimeout(() => {
                
                this.querySelector('#question-wrapper').style.transition = 'background-color .5s linear';
                this.querySelector('#question-wrapper').style.backgroundColor = 'white';
                
                if (checkAnswerResponse !== 'Incorrect') {
                    alert(checkAnswerResponse);
                }
    
                setTimeout(() => {
                    this.querySelector('#question-wrapper').style.transition = '';
                }, 1000);
            });
        }
    }

    render(state) {
        return html`
            <style>
                /* This is just to hack the input boxes temporarily */
                span {
                    min-width: 100px !important;
                }

                .question-container {
                    margin-top: 5vh;
                    /* width: 50vw; */
                    /* max-width: 100%; */
                    /* min-width: 50%; */
                    /* width: 75vw; */
                    /* width: calc(200vw - 100%); */
                    /* width: calc(50% - 50vw); */
                    /* margin-left: auto; */
                    /* margin-right: auto; */
                    min-width: 75%;
                    max-width: 100%;
                    width: calc((1000px - 100%) * 1000);
                    margin-left: auto;
                    margin-right: auto;
                    /* margin-left: calc(50% - 50vw); */
                    /* margin-right: calc(50% - 50vw); */
                    /* margin: auto; */
                    /* width: 75em; */
                    /* height: 25vh; */
                    /* margin-left: 10vw; */
                }

                .question-wrapper {
                    background-color: white;
                    padding: 5em;
                    position: relative;
                    box-shadow: 0px 0px 1px black;
                }

                .question-wrapper-user-completed {
                    box-shadow: 0px 0px 5px green;
                }

                .previous-question-button {
                    position: absolute;
                    left: 0;
                    bottom: -75px;
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
                    bottom: -75px;
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
                <div id="question-wrapper" class="question-wrapper${state.currentQuestion && state.currentQuestion.userCompleted === true ? ' question-wrapper-user-completed' : ''}">
                    <prendus-view-question .question=${state.currentAssessment} @question-response=${(e: any) => this.questionResponse(e)}>Loading...</prendus-view-question>
                    <button ?hidden=${state.currentAssessment && state.currentAssessment.order === 0} class="previous-question-button" @click=${(e: any) => this.previousQuestionClick()}>Previous question</button>
                    <button ?hidden=${state.currentAssessment && state.currentConcept && state.currentAssessment.order === state.currentConcept.assessments.length - 1} class="next-question-button" @click=${(e: any) => this.nextQuestionClick(state)}>Next question</button>
                </div>
            </div>
        `;
    }
}

window.customElements.define('jp-assessment', JPAssessment);