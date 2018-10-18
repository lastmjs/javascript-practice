import {html, render} from 'lit-html';
import {Store} from '../services/store';
import './jp-button';
import { jpContainerCSSClass } from '../services/constants';

class JPProfile extends HTMLElement {
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
                <button ?hidden=${!state.user} @click=${() => this.logoutClick()}>Logout</button>
            </div>
        `;
    }
}

window.customElements.define('jp-profile', JPProfile);