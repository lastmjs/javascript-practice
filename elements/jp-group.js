import '@polymer/paper-card/paper-card.js';
import '@polymer/paper-button/paper-button.js';
import 'prendus-question-elements/prendus-view-question.ts';

interface Monkey {

}

class JPGroup extends HTMLElement {

    connectedCallback() {
        this.render();

        this.querySelector('#prendus-view-question').question = {
            assessML: 'This will be a question',
            javaScript: 'answer = true'
        };
    }

    render() {
        this.innerHTML = `
            <style>
                .question-container {
                    width: 100vw;
                    max-width: 1000px;
                    margin-bottom: 5vh;
                }
            </style>

            <paper-card class="question-container" heading="${this.title}">
                <div class="card-actions">
                    <div style="padding: 25px">
                    <prendus-view-question id="prendus-view-question"></prendus-view-question>
                    </div>
                </div>

                <div class="card-actions">
                    <paper-button>Next question</paper-button>
                </div>

            </paper-card>
        `;
    }
}

window.customElements.define('jp-group', JPGroup);
