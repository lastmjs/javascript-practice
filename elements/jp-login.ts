import { html, render } from 'lit-html';
import { Store } from '../services/store';
import {
    authenticationInputCSSClass,
    authenticationInputsContainerCSSClass,
    authenticationInputRowCSSClass
} from '../services/constants';
import { request } from '../services/graphql';
import './jp-button';
import page from 'page';

class JPLogin extends HTMLElement {
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

    async loginClick() {
        Store.dispatch({
            type: 'SHOW_LOAD_INDICATOR'
        });

        const email = this.querySelector('#login-email-input').value;
        const password = this.querySelector('#login-password-input').value;

        if (email === '') {
            alert('Email cannot be empty');
            return;
        }

        if (password === '') {
            alert('Password cannot be empty');
            return;
        }

        const response = await request(`
            mutation($email: String!, $password: String!) {
                login(email: $email, password: $password) {
                    user {
                        id
                        email
                        tokens
                    }
                    jwt
                }
            }
        `, {
            email,
            password
        })

        if (response && response.login.jwt) {
            Store.dispatch({
                type: 'LOGIN_USER',
                user: response.login.user,
                userJWT: response.login.jwt
            });

            page(`/assessment/${Store.getState().currentAssessment.id}/view`);
        }

        Store.dispatch({
            type: 'HIDE_LOAD_INDICATOR'
        });
    }

    render(state: any) {
        return html`
            <style>
                ${authenticationInputCSSClass}
                ${authenticationInputsContainerCSSClass}
                ${authenticationInputRowCSSClass}
            </style>

            <div class="authentication-inputs-container">
                <div class="authentication-input-row">
                    <input id="login-email-input" type="text" class="authentication-input" placeholder="email">
                </div>

                <div class="authentication-input-row">
                    <input id="login-password-input" type="password" class="authentication-input" placeholder="password">
                </div>

                <div class="authentication-input-row">
                    <jp-button @click=${() => this.loginClick()} .text=${"Login"}></jp-button>
                </div>
            </div>
        `;
    }
}

window.customElements.define('jp-login', JPLogin);