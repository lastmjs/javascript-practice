import {html, render} from 'lit-html';
import {Store} from '../services/store';

class JPConceptItem extends HTMLElement {
    _selectedConcept: string;

    set selectedConcept(val) {
        this._selectedConcept = val;

        // Store.dispatch({
        //     type: 'DEFAULT_ACTION'
        // });
    }

    get selectedConcept() {
        return this._selectedConcept;
    }

    get id() {
        return `${this.title.toLowerCase().replace(/\s/g, '-')}-concept-item`;
    }

    connectedCallback() {
        Store.subscribe(() => render(this.render(Store.getState()), this));
        //
        // setTimeout(() => {
        //     Store.dispatch({
        //         type: 'TRIGGER_RENDER'
        //     });
        // });
    }

    render(state) {
        const numTotalQuestions = Object.values(state.conceptItems[this.id].questions).length;
        const numUserCompletedQuestions = state.conceptItems[this.id].numUserCompletedQuestions;
        const percentage = (numUserCompletedQuestions / numTotalQuestions) * 100;

        return html`
            <style>
                .concept {
                    position: relative;
                    flex-grow: 1;
                    padding: 2em;
                    cursor: pointer;
                    transition: background-color .5s ease;
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

            <div id=${this.id} class="concept${this.selectedConcept === this.id ? ' concept-focused' : ''}">
                ${this.title}
                <div class="concept-overlay" style="width: ${percentage}%">
                </div>
            </div>
        `;
    }
}

window.customElements.define('jp-concept-item', JPConceptItem);
