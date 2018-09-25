import {html, render} from 'lit-html';
import './jp-concept-map';
import 'prendus-question-elements/prendus-view-question.ts';
import {Store} from '../services/store';

class JPApp extends HTMLElement {

    connectedCallback() {
        Store.subscribe(() => render(this.render(Store.getState()), this));

        Store.dispatch({
            type: 'DEFAULT_ACTION'
        });

        Store.dispatch({
            type: 'DEFAULT_ACTION'
        });

        Store.dispatch({
            type: 'SET_INITIAL_CURRENT_QUESTION'
        });
    }

    nextQuestionClick() {
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
            type: 'UPDATE_NUM_USER_COMPLETED_QUESTIONS',
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

    courseClick() {
        window.location.href = 'plans-and-pricing.html';
    }

    render(state: any) {
        return html`
            <style>
                /* This is just to hack the input boxes temporarily */
                span {
                    min-width: 100px !important;
                }

                .main-grid {
                    display: grid;
                    grid-template-columns: 20em 100vw;
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

                .javascript-logo {
                    position: fixed;
                    top: 0;
                    right: 0;
                    width: 50px;
                    padding: 5px;
                    box-shadow: 0px 0px 5px black;
                }

                .privacy-anchor {
                    color: black;
                    position: fixed;
                    bottom: 1em;
                    right: 1em;
                }

                .course-bar {
                    display: flex;
                    text-align: center;
                    box-shadow: 0px 0px 1px black;
                }

                .course {
                    flex-grow: 1;
                    padding: 2em;
                    cursor: pointer;
                    transition: background-color .5s ease;
                    font-weight: bold;
                    white-space: nowrap;
                }

                .course:hover {
                    background-color: rgba(1, 1, 1, .05);
                }

                .course-focused {
                    background-color: rgba(1, 1, 1, .1);
                }
            </style>

            <div class="main-grid">
                <jp-concept-map></jp-concept-map>

                <div>
                    <div class="course-bar">
                        <div class="course course-focused">JavaScript</div>
                        <div @click=${() => this.courseClick()} class="course">TypeScript</div>
                        <div @click=${() => this.courseClick()} class="course">DOM</div>
                        <div @click=${() => this.courseClick()} class="course">Web Components</div>
                        <div @click=${() => this.courseClick()} class="course">Redux</div>
                        <div @click=${() => this.courseClick()} class="course">GraphQL</div>
                        <div @click=${() => this.courseClick()} class="course">WebAssembly</div>
                        <div @click=${() => this.courseClick()} class="course">Web3</div>
                        <div @click=${() => this.courseClick()} class="course">NPM</div>
                        <div @click=${() => this.courseClick()} class="course">Node.js</div>
                        <div @click=${() => this.courseClick()} class="course">Deno</div>
                    </div>

                    <div class="question-container">
                        <div id="question-wrapper" class="question-wrapper">
                            <prendus-view-question .question=${state.currentQuestion} @question-response=${(e: any) => this.questionResponse(e)}>Loading...</prendus-view-question>
                            <button ?hidden=${state.currentQuestionId === 1} class="previous-question-button" @click=${(e: any) => this.previousQuestionClick()}>Previous question</button>
                            <button class="next-question-button" @click=${(e: any) => this.nextQuestionClick()}>Next question</button>
                        </div>
                    </div>
                </div>

            </div>

            <!-- <a href="/">
                <img src="javascript-logo.png" class="javascript-logo">
            </a> -->

            <a class="privacy-anchor" href="privacy.html">Privacy</a>
        `;
    }
}

window.customElements.define('jp-app', JPApp);
