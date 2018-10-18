import { html, render } from 'lit-html';
import { Store } from '../services/store';
import {
    highlightColorCSSValue,
    selectedColorCSSValue,
    zIndexLayer1,
    menuItemCSSProperties
} from '../services/constants';

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
        const numTotalAssessments = state.concepts.find((concept: any) => concept.id === this.id).assessments.length;
        const numUserCompletedAssessments = Object.values(state.userProgress[this.id] || {}).length;
        const percentage = (numUserCompletedAssessments / numTotalAssessments) * 100;

        return html`
            <style>
                .concept-item {
                    ${menuItemCSSProperties}
                }

                .concept-item:hover {
                    background-color: ${highlightColorCSSValue};
                }

                .concept-item-focused {
                    background-color: ${selectedColorCSSValue};
                }

                .concept-overlay {
                    position: absolute;
                    height: 100%;
                    background-color: rgba(6, 150, 14, .5);
                    top: 0;
                    left: 0;
                    z-index: ${zIndexLayer1};
                }
            </style>

            <div class="concept-item${state.currentConcept && state.currentConcept.id === this.id ? ' concept-item-focused' : ''}">
                ${this.title}
                <div class="concept-overlay" style="width: ${percentage}%">
                </div>
            </div>
        `;
    }
}

window.customElements.define('jp-concept-item', JPConceptItem);
