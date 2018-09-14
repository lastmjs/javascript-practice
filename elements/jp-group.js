import '@polymer/paper-card/paper-card.js';
import '@polymer/paper-button/paper-button.js';
import 'prendus-question-elements/prendus-view-question.ts';
import {groups} from '../services/groups.js';

class JPGroup extends HTMLElement {

    connectedCallback() {
        this.render();

        //TODO this is very imperative, use lit-html to pass the question property down from jp-app
        const group = groups.find((item) => {
            return item.id === this.id;
        });

        this.querySelector(`#${group.id}`).question = group.question;
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
                    <prendus-view-question id="${this.id}"></prendus-view-question>
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
