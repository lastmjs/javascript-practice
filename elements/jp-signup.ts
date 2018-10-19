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
        Store.dispatch({
            type: 'SHOW_LOAD_INDICATOR'
        });

        const email = this.querySelector('#signup-email-input').value;
        const password1 = this.querySelector('#signup-password-input-1').value;
        const password2 = this.querySelector('#signup-password-input-2').value;

        if (email === '') {
            alert('Email cannot be empty');

            Store.dispatch({
                type: 'HIDE_LOAD_INDICATOR'
            });

            return;
        }

        if (password1 === '' || password2 === '') {
            alert('Passwords cannot be empty');

            Store.dispatch({
                type: 'HIDE_LOAD_INDICATOR'
            });

            return;
        }

        if (password1 !== password2) {
            alert('Passwords must match');

            Store.dispatch({
                type: 'HIDE_LOAD_INDICATOR'
            });

            return;
        }

        const response = await request(`
            mutation($email: String!, $password: String!) {
                signup(email: $email, password: $password) {
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
            password: password1
        })

        if (response && response.signup.jwt) {
            Store.dispatch({
                type: 'LOGIN_USER',
                user: response.signup.user,
                userJWT: response.signup.jwt
            });

            page(`/assessment/${Store.getState().currentAssessment.id}/view`);
        }

        Store.dispatch({
            type: 'HIDE_LOAD_INDICATOR'
        });
    }

    passwordInputKeydown(e: any) {
        if (e.keyCode === 13) {
            this.signupClick();
        }
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
                    <input id="signup-email-input" type="text" class="authentication-input" placeholder="email">
                </div>

                <div class="authentication-input-row">
                    <input id="signup-password-input-1" type="password" class="authentication-input" placeholder="password">
                </div>

                <div class="authentication-input-row">
                    <input
                        id="signup-password-input-2"
                        type="password"
                        class="authentication-input"
                        placeholder="re-enter password"
                        @keydown=${(e: any) => this.passwordInputKeydown(e)}
                    >
                </div>

                <div class="authentication-input-row">
                    <jp-button @click=${() => this.signupClick()} .text=${"Signup"}></jp-button>
                </div>
            </div>
        `;
    }
}

window.customElements.define('jp-signup', JPSignup);