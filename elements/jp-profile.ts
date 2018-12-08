import {html, render} from 'lit-html';
import {Store} from '../services/store';
import './jp-button';
import { jpContainerCSSClass } from '../services/constants';
import '@vaadin/vaadin-tabs/vaadin-tabs.js';
import { request } from '../services/graphql';

enum tabSelected {
    ASSESSMENTS_TAB
}

class JPProfile extends HTMLElement {
    tabSelected: tabSelected = tabSelected.ASSESSMENTS_TAB;

    async connectedCallback() {
        Store.subscribe(() => render(this.render(Store.getState()), this)); 
        
        const assessmentsResponse = await request(`
            query($userId: ID!) {
                assessments(where: {
                    user: {
                        id: $userId
                    }
                }) {
                    assessML
                    javaScript
                    verified
                }
            }
        `, {
            userId: Store.getState().user.id
        });

        setTimeout(() => {
            Store.dispatch({
                type: 'HIDE_GLOBAL_LOAD_INDICATOR'
            });

            Store.dispatch({
                type: 'HIDE_LOAD_INDICATOR'
            });
        });
    }

    logoutClick() {
        Store.dispatch({
            type: 'LOGOUT_USER'
        });
    }

    render(state: any) {
        return html`
            <style>
                ${jpContainerCSSClass(state)}
            </style>

            <div class="jp-container">
                <h1>Welcome ${state.user ? state.user.email : 'unregistered user'}</h1>
                <h2>You have ${state.user ? state.user.tokens : 0} ${state.user ? state.user.tokens === 1 ? 'token, use it wisely' : 'tokens, use them wisely' : 'tokens, signup to get some'}</h2>
                <jp-button ?hidden=${!state.user} @click=${() => this.logoutClick()} .text=${'Logout'}></jp-button>
                <vaadin-tabs .selected=${this.tabSelected}>
                    <div>

                    </div>
                </vaadin-tabs>
            </div>
        `;
    }
}

window.customElements.define('jp-profile', JPProfile);