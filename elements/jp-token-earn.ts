import { html, render } from 'lit-html';
import { Store } from '../services/store';
import { jpContainerCSSClass } from '../services/constants';

class JPTokenEarn extends HTMLElement {
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
                <h1>Earn tokens</h1>
                <h2>+20 tokens: <a href="/">Create an exercise</a></h2>
                <h2>+5 tokens: <a href="/">Provide feedback</a></h2>
                <h2>+5 tokens: <a href="/">Report a bug</a></h2>
            </div>
        `;
    }
}

window.customElements.define('jp-token-earn', JPTokenEarn);