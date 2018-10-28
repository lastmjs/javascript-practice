import { html, render } from 'lit-html';
import './jp-concept-item';
import { Store } from '../services/store';
import { request } from '../services/graphql';
import { backgroundColorCSSValue, zIndexLayer7, menuItemCSSProperties, highlightColorCSSValue } from '../services/constants';
import page from 'page';

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

    earnTokensClicked() {
        page('/token/earn');
    }

    buyTokensClicked() {
        page('/token/buy');
    }

    legalClicked() {
        page('/legal/terms-and-privacy');
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
                    display: none;
                }

                .concepts-container {
                    display: flex;
                    flex-direction: column;
                    text-align: center;
                    box-shadow: 0px 0px 1px black;
                    background-color: ${backgroundColorCSSValue};
                    height: 100vh;
                    overflow-y: auto;
                    ${state.mobileScreen ? 'position: absolute;' : ''}
                    ${state.mobileScreen ? 'width: 70%;' : ''}
                    ${state.mobileScreen ? `z-index: ${zIndexLayer7};` : ''}
                }

                .menu-item-title {
                    ${menuItemCSSProperties}
                    font-size: calc(10px + 1vmin);
                }

                .menu-item {
                    ${menuItemCSSProperties}
                    font-size: calc(8px + 1vmin);
                }

                .menu-item:hover {
                    background-color: ${highlightColorCSSValue};
                }

                ${state.mobileScreen ? `
                    .concepts-container-hidden {
                        visibility: hidden;
                    }
                ` : ''}
            </style>

            <div id="concepts-container" class="concepts-container${state.showMainMenu ? '' : ' concepts-container-hidden'}">                
                <div class="menu-item-title">JS Practice Alpha</div>
                <hr style="width: 90%">
                <div class="menu-item" @click=${() => this.earnTokensClicked()}>Earn tokens</div>
                <div class="menu-item" @click=${() => this.buyTokensClicked()}>Buy tokens</div>
                <div class="menu-item" @click=${() => this.legalClicked()}>Legal</div>
                <hr style="width: 90%">
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
