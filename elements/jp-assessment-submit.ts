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

class JPAssessmentSubmit extends HTMLElement {
    assessmentSubmittedTokenReward: number = 0;
    openAssessmentSubmissions: any[] = [];
    closedAssessmentSubmissions: any[] = [];
    tabSelected: string = SUBMIT_TAB;

    async connectedCallback() {
        Store.subscribe(() => render(this.render(Store.getState()), this));

        await this.initialLoad();

        setTimeout(() => {
            Store.dispatch({
                type: 'HIDE_GLOBAL_LOAD_INDICATOR'
            });

            Store.dispatch({
                type: 'HIDE_LOAD_INDICATOR'
            });
        });
    }

    async initialLoad() {
        const response = await request(`
            query {
                assessmentSubmittedTokenReward: tokenReward(where: {
                    type: ASSESSMENT_SUBMITTED
                }) {
                    amount
                }

                openAssessmentSubmissions: assessmentSubmissions(where: {
                    open: true
                }) {
                    createdAt
                    text
                    description
                }

                closedAssessmentSubmissions: assessmentSubmissions(where: {
                    open: false
                }) {
                    createdAt
                    text
                    description
                }
            }
        `);

        this.assessmentSubmittedTokenReward = response.assessmentSubmittedTokenReward.amount;
        this.openAssessmentSubmissions = response.openAssessmentSubmissions;
        this.closedAssessmentSubmissions = response.closedAssessmentSubmissions;
    }

    async submitClicked() {
        Store.dispatch({
            type: 'SHOW_LOAD_INDICATOR'
        });

        const assessmentTextarea = this.querySelector('#assessment-textarea');

        const response = await request(`
            mutation($text: String!) {
                submitAssessment(text: $text) {
                    success
                }
            }
        `, {
            text: assessmentTextarea.value
        });

        if (response.submitAssessment.success) {
            await this.initialLoad();
            await loadUser();

            // Local Redux store
            this.tabSelected = OPEN_TAB;

            // evil
            this.querySelector('#assessment-textarea').value = '';

            Store.dispatch({
                type: 'ADD_NOTIFICATION',
                notification: `+${this.assessmentSubmittedTokenReward} ${this.assessmentSubmittedTokenReward === 1 ? 'token' : 'tokens'}`
            });

            Store.dispatch({
                type: 'HIDE_LOAD_INDICATOR'
            });
        }
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

                .assessment-textarea {
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
                <h1>Submit an exercise</h1>

                <vaadin-tabs .selected="${tabIndeces[this.tabSelected]}">
                    <vaadin-tab @click=${() => this.submitTabClicked()}>Submit</vaadin-tab>
                    <vaadin-tab @click=${() => this.openTabClicked()}>Open</vaadin-tab>
                    <vaadin-tab @click=${() => this.closedTabClicked()}>Closed</vaadin-tab>
                </vaadin-tabs>

                <div ?hidden=${this.tabSelected !== SUBMIT_TAB}>
                    <h2>+${this.assessmentSubmittedTokenReward} ${this.assessmentSubmittedTokenReward === 1 ? 'token' : 'tokens'}</h2>
                    <p>The full exercise creation editor is not available. Submit the text of your exercise and we will do the rest.</p>
                    <p>Exercises that you create will be publicly available.</p>
                    <p>Obey all copyright laws (get the rights, utilize fair use, or create an original...you know).</p>
                    <div>
                        <textarea id="assessment-textarea" class="assessment-textarea"></textarea>
                    </div>
                    <br>
                    <jp-button .text=${'Submit'} @click=${() => this.submitClicked()}></jp-button>
                </div>

                <div ?hidden=${this.tabSelected !== OPEN_TAB}>
                    <h2>Open exercises</h2>
                    ${this.openAssessmentSubmissions.map((assessmentSubmission) => {
                        return html`
                            <div style="box-shadow: 0px 0px 5px grey; margin: 10px; padding: 25px">
                                <div>Submitted: ${new Date(assessmentSubmission.createdAt)}</div>
                                <br>
                                <div>Exercise text: ${DOMPurify.sanitize(assessmentSubmission.text)}
                                </div>
                                <br>
                                <div>Comments: ${DOMPurify.sanitize(assessmentSubmission.description)}</div>
                            </div>
                            <br>
                        `;
                    })}
                </div>

                <div ?hidden=${this.tabSelected !== CLOSED_TAB}>
                    <h2>Closed exercises</h2>
                    ${this.closedAssessmentSubmissions.map((assessmentSubmission) => {
                        return html`
                            <div style="box-shadow: 0px 0px 5px grey; margin: 10px; padding: 25px">
                                <div>Submitted: ${new Date(assessmentSubmission.createdAt)}</div>
                                <br>
                                <div>Exercise text: ${DOMPurify.sanitize(assessmentSubmission.text)}
                                </div>
                                <br>
                                <div>Comments: ${DOMPurify.sanitize(assessmentSubmission.description)}</div>
                            </div>
                            <br>
                        `;
                    })}
                </div>
            </div>
        `;
    }
}

window.customElements.define('jp-assessment-submit', JPAssessmentSubmit);