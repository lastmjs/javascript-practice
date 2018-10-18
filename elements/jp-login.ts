import {html, render} from 'lit-html';
import {Store} from '../services/store';
import {
    authenticationInput,
    authenticationInputsContainer,
    authenticationInputRow,
    authenticationSubmitButton
} from '../services/constants';
import { request } from '../services/graphql';

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
                    }
                    token
                }
            }
        `, {
            email,
            password
        })

        if (response.login.token) {
            Store.dispatch({
                type: 'LOGIN_USER',
                user: response.login.user,
                userToken: response.login.token
            });
        }
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
                    <input id="login-email-input" type="text" class="authentication-input" placeholder="email">
                </div>

                <div class="authentication-input-row">
                    <input id="login-password-input" type="password" class="authentication-input" placeholder="password">
                </div>

                <div class="authentication-input-row">
                    <button @click=${() => this.loginClick()} class="authentication-submit-button">Login</button>
                </div>
            </div>
        `;
    }
}

window.customElements.define('jp-login', JPLogin);