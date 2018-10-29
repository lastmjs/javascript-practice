import { html, render } from 'lit-html';
import { Store } from '../services/store';
import { jpContainerCSSClass } from '../services/constants';
import './jp-button';
import { request } from '../services/graphql';
import { loadUser } from '../services/init';
// TODO it would be nice to have this be an es module, perhaps bring it up with Stripe
// import 'https://checkout.stripe.com/checkout.js';

class JPTokenBuy extends HTMLElement {
    totalPrice: string = '$5.00';
    pricePerToken: number = 0;
    minTokens: number = 0;
    numTokens: number = 0;

    async connectedCallback() {
        Store.subscribe(() => render(this.render(Store.getState()), this));

        const response = await request(`
            query {
                constant(where: {
                    key: TOKEN_PRICE
                }) {
                    value
                }
            }
        `);

        //TODO local redux store
        this.minTokens = 500 / parseInt(response.constant.value);
        this.numTokens = this.minTokens;
        this.pricePerToken = parseInt(response.constant.value);

        this.stripeHandler = window.StripeCheckout.configure({
            key: 'pk_test_Deq4Kig1vsbwSZmXc3yBn2wf',
            image: 'javascript-logo.png',
            locale: 'auto',
            token: async (token: any) => {
                Store.dispatch({
                    type: 'SHOW_LOAD_INDICATOR'
                });

                const response = await request(`
                    mutation($stripeTokenId: String!, $numTokens: Int!, $pricePerToken: Int!) {
                        buyTokens(stripeTokenId: $stripeTokenId, numTokens: $numTokens, pricePerToken: $pricePerToken) {
                            success
                        }
                    }
                `, {
                    stripeTokenId: token.id,
                    numTokens: this.numTokens,
                    pricePerToken: this.pricePerToken
                });

                if (response && response.buyTokens.success) {
                    await loadUser();

                    Store.dispatch({
                        type: 'HIDE_LOAD_INDICATOR'
                    });

                    Store.dispatch({
                        type: 'ADD_NOTIFICATION',
                        notification: 'Payment successful'
                    });
                }
                else {
                    Store.dispatch({
                        type: 'HIDE_LOAD_INDICATOR'
                    });

                    Store.dispatch({
                        type: 'ADD_NOTIFICATION',
                        notification: 'Payment unsuccessful, try again'
                    });
                }
            }
        });

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
        request(`
            mutation {
                buyNowClick
            }
        `);

        Store.dispatch({
            type: 'ADD_NOTIFICATION',
            notification: 'Payment integration coming soon'
        });

        return;

        const totalPriceInt = this.numTokens * this.pricePerToken;
        if (totalPriceInt < 50) {
            return;
        }

        this.stripeHandler.open({
            name: `javascriptpractice.com`,
            description: `${this.numTokens} tokens`,
            amount: this.numTokens * this.pricePerToken,
            zipCode: true
        });
    }

    numTokenInput(e: any) {
        const value = parseInt(e.target.value);
        this.numTokens = isNaN(value) ? 0 : value;
        const totalPriceInt = this.numTokens * this.pricePerToken;

        this.totalPrice = totalPriceInt === 0 || totalPriceInt < 50 ? '' : `$${(totalPriceInt / 100).toFixed(2)}`;
        
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
                        min="5"
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