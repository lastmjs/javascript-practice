import {html, render} from 'lit-html';
import './jp-concept-item'; 
import {Store} from '../services/store';
import {request} from '../services/graphql';

class JPConceptMap extends HTMLElement {

    async connectedCallback() {
        Store.subscribe(() => render(this.render(Store.getState()), this));

        setTimeout(() => {
            Store.dispatch({
                type: 'TRIGGER_RENDER'
            });
        });

        try {
            const response = await request(`
                query {
                    concepts {
                        title
                        order
                    }
                }
            `);

            Store.dispatch({
                type: 'SET_CONCEPTS',
                concepts: response.concepts
            });
        }
        catch(error) {
            alert(JSON.stringify(error, null, 2));
        }
    }

    conceptItemClicked(e) {
        Store.dispatch({
            type: 'SET_NEW_CURRENT_CONCEPT',
            concept: e.target.id
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
                ${state.concepts.map((concept) => {
                    return html`<jp-concept-item 
                                    title=${concept.title}
                                    @click=${(e) => this.conceptItemClicked(e)}
                                    .selectedConcept=${state.currentConcept}>
                                </jp-concept-item>`;
                })}
            </div>
        `;
    }
}

window.customElements.define('jp-concept-map', JPConceptMap);
