import {html, render} from 'lit-html';
import 'prendus-question-elements/prendus-view-question.ts';
import {Store} from '../services/store';

class JPAssessment extends HTMLElement {
    connectedCallback() {
        Store.subscribe(() => render(this.render(Store.getState()), this));
    }

    nextQuestionClick(state) {
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
                    width: 75em;
                    height: 25vh;
                    margin-left: 10vw;
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
                    <prendus-view-question .question=${state.currentQuestion} @question-response=${(e: any) => this.questionResponse(e)}>Loading...</prendus-view-question>
                    <button ?hidden=${state.currentQuestion && state.currentQuestion.order === 0} class="previous-question-button" @click=${(e: any) => this.previousQuestionClick()}>Previous question</button>
                    <button class="next-question-button" @click=${(e: any) => this.nextQuestionClick(state)}>Next question</button>
                </div>
            </div>
        `;
    }
}

window.customElements.define('jp-assessment', JPAssessment);