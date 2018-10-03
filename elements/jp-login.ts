import {html, render} from 'lit-html';
import {Store} from '../services/store';
import {selectedColor} from '../services/constants';

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
                .authentication-input {
                    font-family: monospace;
                    font-size: calc(20px + 1vmin);
                    padding: calc(12px + 1vmin);
                    border: none;
                    box-shadow: 0px 0px 1px grey;
                    background-color: ${selectedColor};
                }

                .authentication-inputs-container {
                    display: grid;
                    margin-top: 10vh;
                }

                .authentication-input-row {
                    margin-bottom: 5vh;
                    text-align: center;
                }

                .authentication-submit-button {
                    font-size: calc(12px + 1vmin);
                    font-family: monospace;
                }
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