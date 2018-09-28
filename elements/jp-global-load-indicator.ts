import {html, render} from 'lit-html';
import {Store} from '../services/store';
import {backgroundColor} from '../services/constants';

class JPGlobalLoadIndicator extends HTMLElement {
    connectedCallback() {
        Store.subscribe(() => render(this.render(Store.getState()), this));        
    }
    
    render(state) {
        const theBackgroundColor = state.hideGlobalLoadIndicator ? 'rgba(0, 0, 0, 0)' : backgroundColor;
        const zIndex = state.lowerGlobalLoadIndicator ? '-100' : 100;

        return html`
            <style>
                .global-load-indicator {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    top: 0;
                    right: 0;
                    background-color: ${theBackgroundColor};
                    z-index: ${zIndex};
                    transition: background-color 1s linear;
                }
            </style>

            <div class="global-load-indicator"></div>
        `;
    }
}

window.customElements.define('jp-global-load-indicator', JPGlobalLoadIndicator);