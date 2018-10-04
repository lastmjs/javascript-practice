import {html, render} from 'lit-html';
import {Store} from '../services/store';

class JPHamburger extends HTMLElement {
    connectedCallback() {
        Store.subscribe(() => render(this.render(Store.getState()), this));
    }

    render(state: any) {
        return html`
            <style>
                .hamburger-container {
                    font-size: ${state.desktopScreen ? '10px' : '6px' };
                    cursor: pointer;
                    text-align: center;
                    vertical-align: middle;
                }

                .hamburger-row {
                    height: .5em;
                    width: 3.5em;
                    background-color: black;
                }
            </style>

            <div class="hamburger-container">
                <div class="hamburger-row" style="margin-bottom: .5em"></div>
                <div class="hamburger-row" style="margin-bottom: .5em"></div>
                <div class="hamburger-row"></div>
            </div>
        `;
    }
}

window.customElements.define('jp-hamburger', JPHamburger);