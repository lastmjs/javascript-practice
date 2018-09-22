import {html, render} from 'lit-html';
import './jp-concept-map';
import 'prendus-question-elements/prendus-view-question.ts';
import {Store} from '../services/store';

class JPApp extends HTMLElement {

    constructor() {
        super();

        Store.subscribe(() => render(this.render(Store.getState()), this));
    }

    connectedCallback() {
        Store.dispatch({
            type: 'DEFAULT_ACTION'
        });

        Store.dispatch({
            type: 'DEFAULT_ACTION'
        });
    }

    nextQuestionClick() {
        alert('There are going to be SO MANY QUESTIONS');
    }

    render(state) {
        return html`
            <style>
                body {
                    margin: 0;
                    background-color: rgba(1, 1, 1, .1);
                    font-family: monospace;
                }

                /* This is just to hack the input boxes temporarily */
                span {
                    min-width: 100px !important;
                }

                .main-grid {
                    display: grid;
                    grid-template-columns: 20em 100vw;
                }

                .question-container {
                    margin-top: 10vh;
                    width: 75em;
                    height: 25vh;
                    margin-left: 10vw;
                }

                .question-wrapper {
                    background-color: white;
                    padding: 5em;
                    position: relative;
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
                }

                .next-question-button:hover {
                    background-color: rgba(1, 1, 1, .05);
                }
            </style>

            <div class="main-grid">
                <jp-concept-map></jp-concept-map>

                <div class="question-container">
                    <div class="question-wrapper">
                        <prendus-view-question .question=${state.currentQuestion}>Loading...</prendus-view-question>
                        <button class="next-question-button" @click=${(e) => this.nextQuestionClick()}>Next question</button>
                    </div>
                </div>
            </div>
        `;
    }
}

window.customElements.define('jp-app', JPApp);
