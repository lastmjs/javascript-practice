import { html, render } from 'lit-html';
import { Store } from '../services/store';
import { jpContainerCSSClass } from '../services/constants';
import { request } from '../services/graphql';
import page from 'page';

class JPLegalAcceptNewTerms extends HTMLElement {
    connectedCallback() {
        Store.subscribe(() => render(this.render(Store.getState()), this));    
        
        setTimeout(() => {
            Store.dispatch({
                type: 'HIDE_GLOBAL_LOAD_INDICATOR'
            });

            Store.dispatch({
                type: 'HIDE_LOAD_INDICATOR'
            });
        });
    }

    async checked() {
        if (this.querySelector('#new-acceptance-checkbox').checked) {
            const termsAndPrivacyVersionResponse = await request(`
                query {
                    constant(where: {
                        key: TERMS_AND_PRIVACY_VERSION
                    }) {
                        value
                    }
                }
            `);

            const termsAcceptedResponse = await request(`
                mutation {
                    acceptNewTerms {
                        success
                    }
                }
            `);

            if (termsAcceptedResponse.acceptNewTerms.success) {
                page(`/assessment/${Store.getState().currentAssessment.id}/view`);
            }
        }
    }

    render(state: any) {
        return html`
            <style>
                ${jpContainerCSSClass(state)}
            </style>

            <div class="jp-container">
                <h1>Accept the new terms of use and privacy policy</h1>
                <input id="new-acceptance-checkbox" type="checkbox" @input=${() => this.checked()}> I accept the new <a href="legal/terms-and-privacy" target="_blank">terms of use</a> and <a href="legal/terms-and-privacy" target="_blank">privacy policy</a>
            </div>
        `;
    }
}

window.customElements.define('jp-legal-accept-new-terms', JPLegalAcceptNewTerms);