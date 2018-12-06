import { html, render } from 'lit-html';
import { Store } from '../services/store';
import { jpContainerCSSClass } from '../services/constants';
import { request } from '../services/graphql';

class JPTokenEarn extends HTMLElement {
    submitAssessmentTokenReward: number = 0;
    submitFeedbackTokenReward: number = 0;

    async connectedCallback() {
        Store.subscribe(() => render(this.render(Store.getState()), this));

        const response = await request(`
            query {
                submitAssessmentTokenReward: tokenReward(where: {
                    type: ASSESSMENT_SUBMITTED
                }) {
                    amount
                }

                submitFeedbackTokenReward: tokenReward(where: {
                    type: FEEDBACK_SUBMITTED
                }) {
                    amount
                }
            }
        `);

        //TODO local redux store
        this.submitAssessmentTokenReward = response.submitAssessmentTokenReward.amount;
        this.submitFeedbackTokenReward = response.submitFeedbackTokenReward.amount;

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
                <p>We are building this course together.</p>
                <p>Lend your expertise and help create the most comprehensive core JavaScript learning resource available.</p>
                <h2>+${this.submitAssessmentTokenReward} tokens: <a href="assessment/create">Create an exercise</a></h2>
                <h2>+${this.submitFeedbackTokenReward} tokens: <a href="feedback/submit">Provide feedback</a></h2>
            </div>
        `;
    }
}

window.customElements.define('jp-token-earn', JPTokenEarn);