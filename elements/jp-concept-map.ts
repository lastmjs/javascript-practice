import {html, render} from 'lit-html';
import './jp-concept-item';
import {Store} from '../services/store';

class JPConceptMap extends HTMLElement {
    selectedConcept: string;

    connectedCallback() {
        this.selectedConcept = `primitive-data-types-concept-item`;

        Store.subscribe(() => render(this.render(Store.getState()), this));

        setTimeout(() => {
            Store.dispatch({
                type: 'TRIGGER_RENDER'
            });
        });
    }

    conceptItemClicked(e) {
        this.selectedConcept = e.target.id;
        Store.dispatch({
            type: 'SET_NEW_CURRENT_QUESTION',
            level1ID: this.selectedConcept,
            level2ID: 1
        });
    }

    render(state) {
        return html`
            <style>
                .concepts-container {
                    display: flex;
                    flex-direction: column;
                    text-align: center;
                    box-shadow: 0px 0px 1px black;
                    background-color: rgba(1, 1, 1, .1);
                }
            </style>

            <div class="concepts-container">
                <jp-concept-item
                    title="Primitive data types"
                    @click=${(e) => this.conceptItemClicked(e)}
                    .selectedConcept=${this.selectedConcept}
                ></jp-concept-item>
                <jp-concept-item
                    title="Objects"
                    @click=${(e) => this.conceptItemClicked(e)}
                    .selectedConcept=${this.selectedConcept}
                ></jp-concept-item>
                <jp-concept-item
                    title="Functions"
                    @click=${(e) => this.conceptItemClicked(e)}
                    .selectedConcept=${this.selectedConcept}
                ></jp-concept-item>
                <jp-concept-item
                    title="Arrays"
                    @click=${(e) => this.conceptItemClicked(e)}
                    .selectedConcept=${this.selectedConcept}
                ></jp-concept-item>
                <jp-concept-item
                    title="Classes"
                    @click=${(e) => this.conceptItemClicked(e)}
                    .selectedConcept=${this.selectedConcept}
                ></jp-concept-item>
                <jp-concept-item
                    title="Modules"
                    @click=${(e) => this.conceptItemClicked(e)}
                    .selectedConcept=${this.selectedConcept}
                ></jp-concept-item>
                <jp-concept-item
                    title="Operators"
                    @click=${(e) => this.conceptItemClicked(e)}
                    .selectedConcept=${this.selectedConcept}
                ></jp-concept-item>
                <jp-concept-item
                    title="Control flow"
                    @click=${(e) => this.conceptItemClicked(e)}
                    .selectedConcept=${this.selectedConcept}
                ></jp-concept-item>
                <jp-concept-item
                    title="Variables"
                    @click=${(e) => this.conceptItemClicked(e)}
                    .selectedConcept=${this.selectedConcept}
                ></jp-concept-item>
                <jp-concept-item
                    title="Promises"
                    @click=${(e) => this.conceptItemClicked(e)}
                    .selectedConcept=${this.selectedConcept}
                ></jp-concept-item>
                <jp-concept-item
                    title="async/await"
                    @click=${(e) => this.conceptItemClicked(e)}
                    .selectedConcept=${this.selectedConcept}
                ></jp-concept-item>
                <jp-concept-item
                    title="Generators"
                    @click=${(e) => this.conceptItemClicked(e)}
                    .selectedConcept=${this.selectedConcept}
                ></jp-concept-item>
                <jp-concept-item
                    title="Scope"
                    @click=${(e) => this.conceptItemClicked(e)}
                    .selectedConcept=${this.selectedConcept}
                ></jp-concept-item>
                <jp-concept-item
                    title="Closures"
                    @click=${(e) => this.conceptItemClicked(e)}
                    .selectedConcept=${this.selectedConcept}
                ></jp-concept-item>
                <jp-concept-item
                    title="Callbacks"
                    @click=${(e) => this.conceptItemClicked(e)}
                    .selectedConcept=${this.selectedConcept}
                ></jp-concept-item>
                <jp-concept-item
                    title="Proxies"
                    @click=${(e) => this.conceptItemClicked(e)}
                    .selectedConcept=${this.selectedConcept}
                ></jp-concept-item>
            </div>
        `;
    }
}

window.customElements.define('jp-concept-map', JPConceptMap);
