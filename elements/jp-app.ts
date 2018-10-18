import './jp-router';
import {html, render} from 'lit-html';
import './jp-concept-map';
import {Store} from '../services/store';
import {highlightColor, backgroundColor, zIndexLayer6, zIndexLayer5} from '../services/constants';
import './jp-load-indicator';
import './jp-hamburger';
import '../services/listeners';
import page from 'page';
import '../services/init';

class JPApp extends HTMLElement {

    connectedCallback() {
        Store.subscribe(() => render(this.render(Store.getState()), this));

        Store.dispatch({
            type: 'DEFAULT_ACTION'
        });
    }

    mainMenuToggle() {
        Store.dispatch({
            type: 'TOGGLE_MAIN_MENU'
        });
    }

    loginClick() {
        Store.dispatch({
            type: 'SHOW_LOAD_INDICATOR'
        });

        page(`/user/login`);

        setTimeout(() => {
            Store.dispatch({
                type: 'HIDE_LOAD_INDICATOR'
            });
        });
    }

    signupClick() {
        Store.dispatch({
            type: 'SHOW_LOAD_INDICATOR'
        });

        page(`/user/signup`);

        setTimeout(() => {
            Store.dispatch({
                type: 'HIDE_LOAD_INDICATOR'
            });
        });
    }

    emailClick() {
        page('/user/profile');
    }

    tokensClick() {
        page('/token/overview');
    }

    render(state: any) {
        return html`
            <style>
                .main-grid {
                    display: grid;
                    height: 100%;
                    overflow: hidden;
                    grid-template-columns: ${state.showMainMenu ? '20' : '0'}% ${state.showMainMenu ? '80' : '100'}%;
                }

                .privacy-anchor {
                    color: black;
                    position: fixed;
                    top: 11vh;
                    right: 1em;
                }

                .router-area {
                    height: ${window.innerHeight}px;
                    overflow: hidden;
                    position: relative;
                }

                .router-container {
                    height: 90%;
                }

                .top-bar {
                    height: 10%;
                    border-left: 1px solid grey;
                    display: flex;
                    width: 100%;
                    background-color: ${backgroundColor};
                    box-shadow: 0px 5px 5px -5px grey;
                    z-index: ${zIndexLayer6};
                    position: relative;
                    align-items: center;
                }

                .hamburger-menu {
                    padding: calc(12px + 1vmin);
                    cursor: pointer;
                }

                .menu-button {
                    font-family: monospace;
                    background: none;
                    border: none;
                    font-size: calc(12px + 1vmin);
                    padding: calc(12px + 1vmin);
                    cursor: pointer;
                }

                .account-buttons {
                    margin-left: auto;
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    margin-right: calc(12px + 1vmin);
                    overflow: hidden;
                }

                .account-buttons-logged-in {
                    grid-template-columns: 1fr 5fr;
                }

                #user-logged-out-account-buttons[hidden], #user-logged-in-account-buttons[hidden] {
                    display: none;
                }
            </style>

            <div class="main-grid">
                <jp-concept-map></jp-concept-map>

                <div class="router-area">

                    <jp-load-indicator
                        .hide=${state.hideLoadIndicator}
                        .lower=${state.lowerLoadIndicator}
                    ></jp-load-indicator>
                    
                    <div class="top-bar">
                        <jp-hamburger
                            @click=${() => this.mainMenuToggle()}
                            class="hamburger-menu"
                        ></jp-hamburger>

                        <div id="user-logged-out-account-buttons" class="account-buttons" ?hidden=${state.user}>
                            <button 
                                class="menu-button"
                                @click=${() => this.loginClick()}
                            >
                                Login
                            </button>
                            <button
                                class="menu-button"
                                @click=${() => this.signupClick()}
                            >
                                Signup
                            </button>
                        </div>

                        <div id="user-logged-in-account-buttons" class="account-buttons account-buttons-logged-in" ?hidden=${!state.user}>
                            <button
                                class="menu-button"
                                @click=${() => this.tokensClick()}
                            >
                                ${state.user ? state.user.tokens : ''}
                            </button>
                            <button
                                class="menu-button"
                                @click=${() => this.emailClick()}
                            >
                                ${state.user ? state.user.email : ''}
                            </button>
                        </div>
                    </div>

                    <div class="router-container">
                        <jp-router></jp-router>
                    </div>

                </div>

            </div>

            <a class="privacy-anchor" href="privacy.html">Privacy</a>
        `;
    }
}

window.customElements.define('jp-app', JPApp);
