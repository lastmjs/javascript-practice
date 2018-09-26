import {html, render} from 'lit-html';
import './jp-concept-item';
import {Store} from '../services/store';
import {request} from '../services/graphql';

class JPConceptMap extends HTMLElement {

    async connectedCallback() {
        Store.subscribe(() => render(this.render(Store.getState()), this));

        const response = await request(`
            query {
                concepts {
                    id
                    title
                    order
                    assessments {
                        id
                        order
                    }
                }
            }
        `);

        Store.dispatch({
            type: 'SET_CONCEPTS',
            concepts: response.concepts
        });
    }

    conceptItemClicked(e: any) {
        //TODO the event handlers are a little messed up here. I shouldn't be grabbing concept directly off of the event
        //TODO follow this issue: https://github.com/Polymer/lit-html/issues/520
        Store.dispatch({
            type: 'SWITCH_SELECTED_CONCEPT',
            concept: e.concept
        });
    }

    render(state: any) {
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
                ${state.concepts.map((concept: any) => {
                    return html`<jp-concept-item
                                    id=${concept.id}
                                    title=${concept.title}
                                    @click=${(e: any) => this.conceptItemClicked(e)}
                                    .concept=${concept}>
                                </jp-concept-item>`;
                })}
            </div>
        `;
    }
}

window.customElements.define('jp-concept-map', JPConceptMap);
