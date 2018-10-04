import {html, render} from 'lit-html';
import {Store} from '../services/store';
import {
    authenticationInput,
    authenticationInputsContainer,
    authenticationInputRow,
    authenticationSubmitButton
} from '../services/constants';

class JPLogin extends HTMLElement {
    connectedCallback() {
        Store.subscribe(() => render(this.render(Store.getState()), this));    
        
        setTimeout(() => {
            Store.dispatch({
                type: 'HIDE_GLOBAL_LOAD_INDICATOR'
            });
        });
    }

    loginClick() {
        alert('logged in!');
    }

    render(state: any) {
        return html`
            <style>
                ${authenticationInput}
                ${authenticationInputsContainer}
                ${authenticationInputRow}
                ${authenticationSubmitButton}
            </style>

            <div class="authentication-inputs-container">
                <div class="authentication-input-row">
                    <input type="text" class="authentication-input" placeholder="email">
                </div>

                <div class="authentication-input-row">
                    <input type="password" class="authentication-input" placeholder="password">
                </div>

                <div class="authentication-input-row">
                    <button @click=${() => this.loginClick()} class="authentication-submit-button">Login</button>
                </div>
            </div>
        `;
    }
}

window.customElements.define('jp-login', JPLogin);