import { html, render } from 'lit-html';
import { Store } from '../services/store';
import {
    authenticationInput,
    authenticationInputsContainer,
    authenticationInputRow,
    authenticationSubmitButton
} from '../services/constants';
import { request } from '../services/graphql';

class JPSignup extends HTMLElement {
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

    async signupClick() {
        const email = this.querySelector('#email-input').value;
        const password1 = this.querySelector('#password-input-1').value;
        const password2 = this.querySelector('#password-input-2').value;

        if (email === '') {
            alert('Email cannot be empty');
            return;
        }

        if (password1 === '' || password2 === '') {
            alert('Passwords cannot be empty');
            return;
        }

        if (password1 !== password2) {
            alert('Passwords must match');
            return;
        }

        const response = await request(`
            mutation($email: String!, $password: String!) {
                signup(email: $email, password: $password) {
                    user {
                        id
                        email
                    }
                    token
                }
            }
        `, {
            email,
            password: password1
        })

        if (response.signup.token) {
            Store.dispatch({
                type: 'LOGIN_USER',
                user: response.signup.user,
                userToken: response.signup.token
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
                    <input id="email-input" type="text" class="authentication-input" placeholder="email">
                </div>

                <div class="authentication-input-row">
                    <input id="password-input-1" type="password" class="authentication-input" placeholder="password">
                </div>

                <div class="authentication-input-row">
                    <input id="password-input-2" type="password" class="authentication-input" placeholder="re-enter password">
                </div>

                <div class="authentication-input-row">
                    <button @click=${() => this.signupClick()} class="authentication-submit-button">Signup</button>
                </div>
            </div>
        `;
    }
}

window.customElements.define('jp-signup', JPSignup);