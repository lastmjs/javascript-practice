import {html, render} from 'lit-html';
import './jp-concept-item';
import {Store} from '../services/store';
import {request} from '../services/graphql';
import {backgroundColor, highlightColor} from '../services/constants';

document.body.addEventListener('click', (e) => {
    if (Store.getState().showMainMenu && e.target.id !== 'main-menu-button') {
        Store.dispatch({
            type: 'TOGGLE_MAIN_MENU'
        });
    }
});

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
        Store.dispatch({
            type: 'SWITCH_SELECTED_CONCEPT',
            concept: e.currentTarget.concept
        });
    }

    render(state: any) {
        return html`
            <style>
                /*TODO I know this is a vendor prefix and is non-standard.
                * The scrollbars on FireFox look good, but on Chrome look really bad
                * I think it's worth it for now so that we don't have to use some huge library
                * or implement something ourselves
                */
                #concepts-container::-webkit-scrollbar {
                    width: 0;
                }

                @media (min-width: 1024px) {
                    .concepts-container {
                        display: flex;
                        flex-direction: column;
                        text-align: center;
                        box-shadow: 0px 0px 1px black;
                        background-color: ${backgroundColor};
                        height: 100vh;
                        overflow-y: scroll;                   
                    }
                }

                @media (max-width: 1024px) {
                    .concepts-container {
                        width: 70%;
                        z-index: 5;
                        position: absolute;
                        display: flex;
                        flex-direction: column;
                        text-align: center;
                        box-shadow: 0px 0px 1px black;
                        background-color: ${backgroundColor};
                        height: 100vh;
                        overflow-y: scroll;                       
                    }

                    .concepts-container-hidden {
                        visibility: hidden;
                    }
                }
            </style>

            <div id="concepts-container" class="concepts-container${state.showMainMenu ? '' : ' concepts-container-hidden'}">
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
