import {html, render} from 'lit-html';
import './jp-concept-map';
import 'prendus-question-elements/prendus-view-question.ts';

class JPApp extends HTMLElement {
    viewQuestionLoaded: boolean;

    constructor() {
        super();

        this.viewQuestionLoaded = false;
    }

    connectedCallback() {
        this.render();

        //TODO I am setting this timeout to get the question property on prendus-view-question to not be null
        setTimeout(() => {
            this.render();
        });
    }

    render() {
        const question = {
            assessML: `
                <p>What are the six primitive data types in JavaScript?</p>
                <p><br></p>
                <p>[input1]</p>
                <p>[input2]</p>
                <p>[input3]</p>
                <p>[input4]</p>
                <p>[input5]</p>
                <p>[input6]</p>
                [solution1]
                    <p>The primitive data types in JavaScript are: boolean, null, undefined, number, string, and symbol.</p>
                    <p>More information can be found <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Data_types" target="_blank">here</a>.</p>
                    <p><br></p>
                [solution1]
            `,
            javaScript: 'answer = true'
        };

        render(html`
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
                        <prendus-view-question .question=${question}>Loading...</prendus-view-question>
                    </div>
                </div>
            </div>
        `, this);
    }
}

window.customElements.define('jp-app', JPApp);
