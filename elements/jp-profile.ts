import {html, render} from 'lit-html';
import {Store} from '../services/store';

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
            <button @click=${() => this.logoutClick()}>Logout</button>
        `;
    }
}

window.customElements.define('jp-profile', JPProfile);