import { html, render } from 'lit-html';
import { Store } from '../services/store';
import { jpContainerCSSClass } from '../services/constants';
import { request } from '../services/graphql';

class JPTokenEarn extends HTMLElement {
    createExerciseTokenReward: number = 0;
    provideFeedbackTokenReward: number = 0;

    async connectedCallback() {
        Store.subscribe(() => render(this.render(Store.getState()), this));

        const response = await request(`
            query {
                createExerciseTokenReward: tokenReward(where: {
                    type: EXERCISE_CREATED_AND_ACCEPTED
                }) {
                    amount
                }

                feedbackReceivedTokenReward: tokenReward(where: {
                    type: FEEDBACK_RECEIVED
                }) {
                    amount
                }
            }
        `);

        //TODO local redux store
        this.createExerciseTokenReward = response.createExerciseTokenReward.amount;
        this.provideFeedbackTokenReward = response.feedbackReceivedTokenReward.amount;

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
                <h2>+${this.createExerciseTokenReward} tokens: <a href="/">Create an exercise</a></h2>
                <h2>+${this.provideFeedbackTokenReward} tokens: <a href="/">Provide feedback</a></h2>
            </div>
        `;
    }
}

window.customElements.define('jp-token-earn', JPTokenEarn);