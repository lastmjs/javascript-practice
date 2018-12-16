import { html, render } from 'lit-html';
import './jp-concept-item';
import { Store } from '../services/store';
import { request } from '../services/graphql';
import { backgroundColorCSSValue, zIndexLayer7, menuItemCSSProperties, highlightColorCSSValue } from '../services/constants';
import page from 'page';
import { configureParentConcept } from '../services/utilities';

class JPConceptMap extends HTMLElement {

    async connectedCallback() {
        Store.subscribe(() => render(this.render(Store.getState()), this));

        const response = await request(`
            query {
                concepts(where: {
                    AND: [
                        {
                            title: "JavaScript"
                        },
                        {
                            level: 0
                        }
                    ]
                }) {
                    id
                }
            }
        `);

        await configureParentConcept(response.concepts[0].id);
    }

    async conceptItemClicked(e: any) {
        await configureParentConcept(e.currentTarget.concept.id);
    }

    earnTokensClicked() {
        //TODO all of these should somehow be put into Redux, so that when the path is officially changed, the side effect occurs in the subscriber function
        page('/token/earn');
    }

    buyTokensClicked() {
        page('/token/buy');
    }

    legalClicked() {
        page('/legal/terms-and-privacy');
    }

    titleClicked() {
        page(`/assessment/${Store.getState().currentAssessment.id}/view`);
    }

    ourVisionClicked() {
        page(`/content/vision`);
    }

    async parentConceptClick() {
        const grandparentConcept = Store.getState().currentConcept.parent.parent;
        await configureParentConcept(grandparentConcept ? grandparentConcept.id : null);
    }

    render(state: any) {
        console.log(state);
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

                .parent-concept-menu-item {
                    ${menuItemCSSProperties}
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
                <div class="menu-item-title" @click=${() => this.titleClicked()}>JS Practice Alpha</div>
                <hr style="width: 90%">
                <div class="menu-item" @click=${() => this.ourVisionClicked()}>Our vision</div>
                <div class="menu-item" @click=${() => this.earnTokensClicked()}>Earn tokens</div>
                <div class="menu-item" @click=${() => this.buyTokensClicked()}>Buy tokens</div>
                <div class="menu-item" @click=${() => this.legalClicked()}>Legal</div>
                <hr style="width: 90%">
                <div ?hidden=${state.currentConcept && !state.currentConcept.parent} class="parent-concept-menu-item" @click=${() => this.parentConceptClick()}><- ${state.currentConcept && state.currentConcept.parent && state.currentConcept.parent.title}</div>
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
