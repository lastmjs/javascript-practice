import { html, render } from 'lit-html';
import { Store } from '../services/store';
import { jpContainerCSSClass } from '../services/constants';
import './jp-button';
import { request } from '../services/graphql';

class JPTokenBuy extends HTMLElement {
    totalPrice: string = '$5.00';
    pricePerToken: number = 0;
    minTokens: number = 0;

    async connectedCallback() {
        Store.subscribe(() => render(this.render(Store.getState()), this));

        const response = await request(`
            query {
                tokenReward(where: {
                    type: TOKEN_PURCHASE
                }) {
                    price
                }
            }
        `);

        //TODO local redux store
        this.minTokens = 500 / response.tokenReward.price;
        this.pricePerToken = response.tokenReward.price;

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

    numTokenInput(e: any) {
        const value = parseInt(e.target.value);
        const numTokens = isNaN(value) ? 0 : value;
        const totalPriceInt = numTokens * this.pricePerToken;

        this.totalPrice = totalPriceInt === 0 || totalPriceInt < 500 ? '' : `$${(totalPriceInt / 100).toFixed(2)}`;
        
        Store.dispatch({
            type: 'TRIGGER_RENDER'
        });
    }

    render(state: any) {
        return html`
            <style>
                ${jpContainerCSSClass(state)}
            </style>

            <div class="jp-container">
                <h1>Buy tokens</h1>
                <div>
                    Tokens: <input
                        id="tokens-input"
                        type="number"
                        value="${this.minTokens}"
                        style="font-size: calc(12px + 1vmin); width: ${this.querySelector('#tokens-input') ? `${this.querySelector('#tokens-input').value.length * 10 + 50}px` : '50px'}"
                        min="${this.minTokens}"
                        @input=${(e: any) => this.numTokenInput(e)}
                    >
                </div>
                <br>
                <div>Price: ${this.totalPrice}</div>
                <br>
                <jp-button @click=${() => this.buyNowClick()} style="cursor: pointer" .text=${"Buy now"}></jp-button>
            </div>
        `;
    }
}

window.customElements.define('jp-token-buy', JPTokenBuy);