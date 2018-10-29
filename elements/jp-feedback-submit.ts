import { html, render } from 'lit-html';
import { Store } from '../services/store';
import { jpContainerCSSClass} from '../services/constants';
import { request } from '../services/graphql';
import './jp-button';
import '@vaadin/vaadin-tabs/vaadin-tabs.js';
import DOMPurify from 'dompurify';
import { loadUser } from '../services/init';

const SUBMIT_TAB = 'SUBMIT_TAB';
const OPEN_TAB = 'OPEN_TAB';
const CLOSED_TAB = 'CLOSED_TAB';

const tabIndeces = {
    [SUBMIT_TAB]: 0,
    [OPEN_TAB]: 1,
    [CLOSED_TAB]: 2
};

class JPFeedbackSubmit extends HTMLElement {
    provideFeedbackTokenReward: number = 0;
    openFeedbackSubmissions: any[] = [];
    closedFeedbackSubmissions: any[] = [];
    tabSelected: string = SUBMIT_TAB;

    async connectedCallback() {
        Store.subscribe(() => render(this.render(Store.getState()), this));

        await this.initalLoad();

        setTimeout(() => {
            Store.dispatch({
                type: 'HIDE_GLOBAL_LOAD_INDICATOR'
            });

            Store.dispatch({
                type: 'HIDE_LOAD_INDICATOR'
            });
        });
    }

    async initalLoad() {
        const response = await request(`
            query {
                feedbackReceivedTokenReward: tokenReward(where: {
                    type: FEEDBACK_SUBMITTED
                }) {
                    amount
                }

                openFeedbackSubmissions: feedbackSubmissions(orderBy: createdAt_DESC, where: {
                    open: true
                }) {
                    createdAt
                    text
                    description
                }

                closedFeedbackSubmissions: feedbackSubmissions(orderBy: createdAt_DESC, where: {
                    open: false
                }) {
                    createdAt
                    text
                    description
                }
            }
        `);

        this.provideFeedbackTokenReward = response.feedbackReceivedTokenReward.amount;
        this.openFeedbackSubmissions = response.openFeedbackSubmissions;
        this.closedFeedbackSubmissions = response.closedFeedbackSubmissions;
    }

    async submitClicked() {
        Store.dispatch({
            type: 'SHOW_LOAD_INDICATOR'
        });

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

        if (response && response.submitFeedback.success) {
            await this.initalLoad();
            await loadUser();

            // Local Redux store
            this.tabSelected = OPEN_TAB;

            // evil
            this.querySelector('#feedback-textarea').value = '';

            Store.dispatch({
                type: 'ADD_NOTIFICATION',
                notification: `+${this.provideFeedbackTokenReward} ${this.provideFeedbackTokenReward === 1 ? 'token' : 'tokens'}`
            });
        }

        Store.dispatch({
            type: 'HIDE_LOAD_INDICATOR'
        });
    }

    submitTabClicked() {
        this.tabSelected = SUBMIT_TAB;
        
        Store.dispatch({
            type: 'TRIGGER_RENDER'
        });
    }

    openTabClicked() {
        this.tabSelected = OPEN_TAB;

        Store.dispatch({
            type: 'TRIGGER_RENDER'
        });
    }

    closedTabClicked() {
        this.tabSelected = CLOSED_TAB;

        Store.dispatch({
            type: 'TRIGGER_RENDER'
        });
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

                <vaadin-tabs .selected="${tabIndeces[this.tabSelected]}">
                    <vaadin-tab @click=${() => this.submitTabClicked()}>Submit</vaadin-tab>
                    <vaadin-tab @click=${() => this.openTabClicked()}>Open</vaadin-tab>
                    <vaadin-tab @click=${() => this.closedTabClicked()}>Closed</vaadin-tab>
                </vaadin-tabs>

                <div ?hidden=${this.tabSelected !== SUBMIT_TAB}>
                    <h2>+${this.provideFeedbackTokenReward} ${this.provideFeedbackTokenReward === 1 ? 'token' : 'tokens'}</h2>
                    <p>Provide any kind of constructive feedback.</p>
                    <p>Bugs, missing concepts, incorrect concept order...anything that you think could be improved.</p>
                    <p>Feedback that you give will be publicly available.</p>
                    <div>
                        <textarea id="feedback-textarea" class="feedback-textarea"></textarea>
                    </div>
                    <br>
                    <jp-button .text=${'Submit'} @click=${() => this.submitClicked()}></jp-button>
                </div>

                <div ?hidden=${this.tabSelected !== OPEN_TAB}>
                    <h2>Open feedback</h2>
                    ${this.openFeedbackSubmissions.map((feedbackSubmission) => {
                        return html`
                            <div style="box-shadow: 0px 0px 5px grey; margin: 10px; padding: 25px">
                                <div>Submitted: ${new Date(feedbackSubmission.createdAt)}</div>
                                <br>
                                <div>Feedback: ${DOMPurify.sanitize(feedbackSubmission.text)}
                                </div>
                                <br>
                                <div>Comments: ${DOMPurify.sanitize(feedbackSubmission.description)}</div>
                            </div>
                            <br>
                        `;
                    })}
                </div>

                <div ?hidden=${this.tabSelected !== CLOSED_TAB}>
                    <h2>Closed feedback</h2>
                    ${this.closedFeedbackSubmissions.map((feedbackSubmission) => {
                        return html`
                            <div style="box-shadow: 0px 0px 5px grey; margin: 10px; padding: 25px">
                                <div>Submitted: ${new Date(feedbackSubmission.createdAt)}</div>
                                <br>
                                <div>Feedback: ${DOMPurify.sanitize(feedbackSubmission.text)}
                                </div>
                                <br>
                                <div>Comments: ${DOMPurify.sanitize(feedbackSubmission.description)}</div>
                            </div>
                            <br>
                        `;
                    })}
                </div>
            </div>
        `;
    }
}

window.customElements.define('jp-feedback-submit', JPFeedbackSubmit);