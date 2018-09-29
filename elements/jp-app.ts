import './jp-router';
import {html, render} from 'lit-html';
import './jp-concept-map';
import {Store} from '../services/store';
import {highlightColor, backgroundColor, zIndexLayer6} from '../services/constants';
import './jp-load-indicator';
import '../services/listeners';

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

    render(state: any) {
        return html`
            <style>
                @media (min-width: 1024px) {
                    .main-grid {
                        display: grid;
                        grid-template-columns: ${state.showMainMenu ? '20' : '0'}% ${state.showMainMenu ? '80' : '100'}%;
                        height: 100%;
                        overflow: hidden;
                    }
                }

                @media (max-width: 1024px) {
                    .main-grid {
                        display: grid;
                        grid-template-columns: 0% 100%;
                        height: 100%;
                        overflow: hidden;
                    }
                }

                .privacy-anchor {
                    color: black;
                    position: fixed;
                    bottom: 1em;
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
                    box-shadow: 0px 4px 2px -2px grey;
                    z-index: ${zIndexLayer6};
                    position: relative;
                }

                .menu-button {
                    background: none;
                    font-size: calc(12px + 1vmin);
                    padding: calc(12px + 1vmin);
                    cursor: pointer;
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
                        <button
                            id="main-menu-button"
                            class="menu-button"
                            @click=${() => this.mainMenuToggle()}
                        >${state.showMainMenu ? 'Hide menu' : 'Menu'}</button>
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
