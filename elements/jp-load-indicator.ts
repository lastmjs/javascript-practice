//TODO this is a near duplicate of jp-global-load-indicator
//TODO the reason they are duplicated is to get around some redux/event listener/change detection issues temporarily
//TODO those issues have been resolved, the two element implementations can be combined at any time

import {html, render} from 'lit-html';
import {Store} from '../services/store';
import {backgroundColor} from '../services/constants';

class JPLoadIndicator extends HTMLElement {
    hide: boolean = false;
    lower: boolean = false;

    connectedCallback() {
        Store.subscribe(() => render(this.render(Store.getState()), this));        
    }
    
    render(state) {
        const theBackgroundColor = this.hide ? 'rgba(0, 0, 0, 0)' : backgroundColor;
        const zIndex = this.lower ? '-100' : 5;

        return html`
            <style>
                .load-indicator {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    top: 0;
                    right: 0;
                    background-color: ${theBackgroundColor};
                    z-index: ${zIndex};
                    ${this.hide ? 'transition: background-color .5s linear;' : ''}
                }
            </style>

            <div class="load-indicator"></div>
        `;
    }
}

window.customElements.define('jp-load-indicator', JPLoadIndicator);