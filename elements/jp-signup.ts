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
        const termsAccepted = this.querySelector('#terms-checkbox').checked;

        if (email === '') {
            Store.dispatch({
                type: 'ADD_NOTIFICATION',
                notification: 'Email cannot be empty'
            });

            Store.dispatch({
                type: 'HIDE_LOAD_INDICATOR'
            });

            return;
        }

        if (password1 === '' || password2 === '') {
            Store.dispatch({
                type: 'ADD_NOTIFICATION',
                notification: 'Passwords cannot be empty'
            });

            Store.dispatch({
                type: 'HIDE_LOAD_INDICATOR'
            });

            return;
        }

        if (password1 !== password2) {
            Store.dispatch({
                type: 'ADD_NOTIFICATION',
                notification: 'Passwords must match'
            });

            Store.dispatch({
                type: 'HIDE_LOAD_INDICATOR'
            });

            return;
        }

        if (!termsAccepted) {
            Store.dispatch({
                type: 'ADD_NOTIFICATION',
                notification: 'You must agree to the terms of use and the privacy policy'
            });

            Store.dispatch({
                type: 'HIDE_LOAD_INDICATOR'
            });

            return;
        }

        //TODO we should somehow combine this with init/load-user, because we're repeating the user selection/loading in 3 places
        const response = await request(`
            mutation($email: String!, $password: String!, $termsAccepted: Boolean!) {
                signup(email: $email, password: $password, termsAccepted: $termsAccepted) {
                    user {
                        id
                        email
                        tokens
                        assessmentInfos {
                            id
                            assessment {
                                concept {
                                    id
                                }
                            }
                            answeredCorrectly
                        }
                    }
                    jwt
                }
            }
        `, {
            email,
            password: password1,
            termsAccepted
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
                    <input id="terms-checkbox" type="checkbox"> I agree to the <a href="legal/terms-and-privacy" target="_blank">terms of use</a> and the <a href="legal/terms-and-privacy" target="_blank">privacy policy</a>
                </div>

                <div class="authentication-input-row">
                    <jp-button @click=${() => this.signupClick()} .text=${"Signup"}></jp-button>
                </div>
            </div>
        `;
    }
}

window.customElements.define('jp-signup', JPSignup);