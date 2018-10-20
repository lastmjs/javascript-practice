import { html, render } from 'lit-html';
import { Store } from '../services/store';
import { jpContainerCSSClass } from '../services/constants';

class JPTokenBuy extends HTMLElement {
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

    buyNowClick() {
        Store.dispatch({
            type: 'ADD_NOTIFICATION',
            notification: 'Your credit card has been charged $100,000,000...thank you'
        });
    }

    render(state: any) {
        return html`
            <style>
                ${jpContainerCSSClass(state)}
            </style>

            <div class="jp-container">
                <h1>Buy tokens</h1>
                <h2>1 token = $.10</h2>
                <div>
                    <input type="number" value="1" style="font-size: calc(12px + 1vmin)" min="1">
                </div>
                <button @click=${() => this.buyNowClick()} style="cursor: pointer">Buy now</button>
            </div>
        `;
    }
}

window.customElements.define('jp-token-buy', JPTokenBuy);