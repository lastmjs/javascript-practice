import { html, render } from 'lit-html';
import { Store } from '../services/store';
import { backgroundColorCSSValue, zIndexLayer8 } from '../services/constants';

class JPGlobalLoadIndicator extends HTMLElement {
    connectedCallback() {
        Store.subscribe(() => render(this.render(Store.getState()), this));        
    }
    
    render(state: any) {
        const theBackgroundColor = state.hideGlobalLoadIndicator ? 'rgba(0, 0, 0, 0)' : backgroundColorCSSValue;

        return html`
            <!-- The spinner code has the following two licenses -->

            <!--
            Copyright (c) 2018 by Scott Kellum (https://codepen.io/scottkellum/pen/tzjCK)

            Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

            The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

            THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
            -->
            
            <!--
            Copyright (c) 2018 by Scott Kellum (https://codepen.io/scottkellum/pen/tzjCK)

            Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

            The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

            THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
            -->           

            <style>
                .global-loading {
                    display: inline-block;
                    width: 50px;
                    height: 50px;
                    border: 3px solid rgba(255, 255 , 255, .3);
                    border-radius: 50%;
                    border-top-color: #fff;
                    animation: spin 1s ease-in-out infinite;
                    margin-top: 30vh;
                }

                .global-loading[hidden] {
                    display: none;
                }

                @keyframes spin {
                    to { transform: rotate(360deg); }
                }

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
                    text-align: center;
                }
            </style>

            <div class="global-load-indicator">
                <div class="global-loading" ?hidden=${state.hideGlobalLoadIndicator}></div>
            </div>
        `;
    }
}

window.customElements.define('jp-global-load-indicator', JPGlobalLoadIndicator);