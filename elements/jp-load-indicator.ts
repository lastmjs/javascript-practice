import {html, render} from 'lit-html';
import {Store} from '../services/store';
import {backgroundColor} from '../services/constants';

class JPLoadIndicator extends HTMLElement {
    connectedCallback() {
        Store.subscribe(() => render(this.render(Store.getState()), this));        
    }
    
    render(state) {
        const theBackgroundColor = state.hideGlobalLoadIndicator ? 'rgba(0, 0, 0, 0)' : backgroundColor;

        return html`
            <style>
                .load-indicator {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    top: 0;
                    right: 0;
                    background-color: ${theBackgroundColor};
                    z-index: 100;
                    transition: background-color 2s linear;
                }
            </style>

            <div class="load-indicator"></div>
        `;
    }
}

window.customElements.define('jp-load-indicator', JPLoadIndicator);