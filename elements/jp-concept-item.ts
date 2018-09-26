import {html, render} from 'lit-html';
import {Store} from '../services/store';

class JPConceptItem extends HTMLElement {

    connectedCallback() {
        Store.subscribe(() => render(this.render(Store.getState()), this));
        
        setTimeout(() => {
            Store.dispatch({
                type: 'TRIGGER_RENDER'
            });
        });
    }

    render(state: any) {
        //TODO this will all be done on the server
        // const numTotalQuestions = Object.values(state.questions).length;
        // const numUserCompletedQuestions = Object.values(state.questions).reduce((result, question) => {
        //     return result + (question.userCompleted === true ? 1 : 0);
        // }, 0);
        // const percentage = (numUserCompletedQuestions / numTotalQuestions) * 100;
        const percentage = 0;

        return html`
            <style>
                .concept {
                    position: relative;
                    flex-grow: 1;
                    padding: 2em;
                    cursor: pointer;
                    transition: background-color .5s ease;
                    font-weight: bold;
                }

                .concept:hover {
                    background-color: rgba(1, 1, 1, .05);
                }

                .concept-focused {
                    background-color: rgba(1, 1, 1, .1);
                }

                .concept-overlay {
                    position: absolute;
                    height: 100%;
                    background-color: rgba(6, 150, 14, .5);
                    top: 0;
                    left: 0;
                    z-index: -1;
                }
            </style>

            <div class="concept${state.currentConcept && state.currentConcept.id === this.id ? ' concept-focused' : ''}" @click=${(e) => e.concept = this.concept}>
                ${this.title}
                <div class="concept-overlay" style="width: ${percentage}%">
                </div>
            </div>
        `;
    }
}

window.customElements.define('jp-concept-item', JPConceptItem);
