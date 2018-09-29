import {html, render} from 'lit-html';
import {Store} from '../services/store';
import {backgroundColor, zIndexLayer8} from '../services/constants';

class JPGlobalLoadIndicator extends HTMLElement {
    connectedCallback() {
        Store.subscribe(() => render(this.render(Store.getState()), this));        
    }
    
    render(state) {
        const theBackgroundColor = state.hideGlobalLoadIndicator ? 'rgba(0, 0, 0, 0)' : backgroundColor;

        return html`
            <style>
                .global-load-indicator {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    top: 0;
                    right: 0;
                    background-color: ${theBackgroundColor};
                    z-index: ${zIndexLayer8};
                    transition: background-color 1s linear;
                    pointer-events: none;
                }
            </style>

            <div class="global-load-indicator"></div>
        `;
    }
}

window.customElements.define('jp-global-load-indicator', JPGlobalLoadIndicator);