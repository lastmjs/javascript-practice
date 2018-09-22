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
                }
            </style>

            <div class="main-grid">
                <jp-concept-map></jp-concept-map>

                <div class="question-container">
                    <div class="question-wrapper">
                        <prendus-view-question .question=${state.currentQuestion}>Loading...</prendus-view-question>
                    </div>
                </div>
            </div>
        `;
    }
}

window.customElements.define('jp-app', JPApp);
