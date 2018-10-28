import { html, render } from 'lit-html';
import { Store } from '../services/store';
import { jpContainerCSSClass} from '../services/constants';
import { request } from '../services/graphql';
import './jp-button';

class JPFeedbackSubmit extends HTMLElement {
    provideFeedbackTokenReward: number = 0;

    async connectedCallback() {
        Store.subscribe(() => render(this.render(Store.getState()), this));

        const response = await request(`
            query {
                feedbackReceivedTokenReward: tokenReward(where: {
                    type: FEEDBACK_SUBMITTED
                }) {
                    amount
                }
            }
        `);

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

    async submitClicked() {
        const feedbackTextarea = this.querySelector('#feedback-textarea');

        const response = await request(`
            mutation($text: String!) {
                submitFeedback(text: $text) {
                    success
                }
            }
        `, {
            text: feedbackTextarea.value
        });

        if (response.submitFeedback.success) {
            Store.dispatch({
                type: 'ADD_NOTIFICATION',
                notification: 'Feedback submitted'
            });
        }
    }

    render(state: any) {
        return html`
            <style>
                ${jpContainerCSSClass(state)}

                .jp-container::-webkit-scrollbar {
                    display: none;
                }

                .feedback-textarea {
                    width: 100%;
                    height: 25vh;
                    resize: none;
                    border: none;
                    padding: 0;
                    font-size: calc(16px + 1vmin);
                    padding: 10px;
                }
            </style>

            <div class="jp-container">
                <h1>Submit feedback</h1>
                <h2>+${this.provideFeedbackTokenReward} ${this.provideFeedbackTokenReward === 1 ? 'token' : 'tokens'}</h2>
                <p>Provide any kind of constructive feedback.</p>
                <p>Bugs, missing concepts, incorrect concept order...anything that you think could be improved.</p>
                <div>
                    <textarea id="feedback-textarea" class="feedback-textarea"></textarea>
                </div>
                <br>
                <jp-button .text=${'Submit'} @click=${() => this.submitClicked()}></jp-button>
            </div>
        `;
    }
}

window.customElements.define('jp-feedback-submit', JPFeedbackSubmit);