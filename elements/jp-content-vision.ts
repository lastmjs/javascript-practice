import { html, render } from 'lit-html';
import { jpContainerCSSClass } from '../services/constants';
import { Store } from '../services/store';

class JPContentVision extends HTMLElement {
    connectedCallback() {
        Store.subscribe(() => render(this.render(Store.getState()), this));
        
        setTimeout(() => {
            Store.dispatch({
                type: 'HIDE_GLOBAL_LOAD_INDICATOR'
            });

            Store.dispatch({
                type: 'HIDE_LOAD_INDICATOR'
            });
        });
    }

    render(state: any) {
        return html`
            <style>
                ${jpContainerCSSClass(state)}
            </style>

            <div class="jp-container">
                <h1>Our vision</h1>

                <br>


                <p>JavaScript Practice is an open source, crowdsourced, comprehensive JavaScript course.</p>

                <br>

                <hr style="width: 75%">

                <br>


                <p>We are Demergence.</p>

                <p>Our goal is to facilitate the creation of the most comprehensive, high quality, and useful programming courses in existence.</p>
            
                <p>We believe that open source principles, crowdsourced content, and decentralization may be what gets us there.</p>

                <p>JavaScript Practice is our first project. We are purposefully starting small, starting centralized, and working towards our decentralized vision.</p>

                <p>Eventually we imagine many more courses becoming available as network effects begin to take hold. These network effects can be thought of as demergent properties, which are essentially emergent properties that arise in decentralized networks.</p>

                <p>We hope you'll help us build the greatest courses ever conceived.</p>
            </div>
        `;
    }
}

window.customElements.define('jp-content-vision', JPContentVision);