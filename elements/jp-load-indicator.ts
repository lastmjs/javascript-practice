//TODO this is a near duplicate of jp-global-load-indicator
//TODO the reason they are duplicated is to get around some redux/event listener/change detection issues temporarily
//TODO those issues have been resolved, the two element implementations can be combined at any time

import { html, render } from 'lit-html';
import { Store } from '../services/store';
import { backgroundColorCSSValue, zIndexLayer5 } from '../services/constants';

class JPLoadIndicator extends HTMLElement {
    hide: boolean = false;
    lower: boolean = false;

    connectedCallback() {
        Store.subscribe(() => render(this.render(Store.getState()), this));        
    }
    
    render(state: any) {
        const theBackgroundColor = this.hide ? 'rgba(0, 0, 0, 0)' : backgroundColorCSSValue;

        return html`
            <style>
                .loading {
                    display: inline-block;
                    width: 50px;
                    height: 50px;
                    border: 3px solid rgba(255, 255 , 255, .3);
                    border-radius: 50%;
                    border-top-color: #fff;
                    animation: spin 1s ease-in-out infinite;
                    margin-top: 30vh;
                }

                .loading[hidden] {
                    display: none;
                }

                @keyframes spin {
                    to { transform: rotate(360deg); }
                }

                .load-indicator {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    top: 0;
                    right: 0;
                    background-color: ${theBackgroundColor};
                    z-index: ${zIndexLayer5};
                    pointer-events: none;
                    ${this.hide ? 'transition: background-color .5s linear;' : ''}
                    text-align: center;
                }
            </style>

            <div class="load-indicator">
                <div class="global-loading" ?hidden=${this.hide}></div>
            </div>
        `;
    }
}

window.customElements.define('jp-load-indicator', JPLoadIndicator);