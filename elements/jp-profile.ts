import {html, render} from 'lit-html';
import {Store} from '../services/store';
import './jp-button';
import { jpContainerCSSClass } from '../services/constants';
import '@vaadin/vaadin-tabs/vaadin-tabs.js';
import { request } from '../services/graphql';
import 'assess-elements/assess-item.ts';

enum tabSelected {
    ASSESSMENTS_TAB
}

class JPProfile extends HTMLElement {
    tabSelected: tabSelected = tabSelected.ASSESSMENTS_TAB;
    assessments: any;
    assessmentSkipIndex = 0;

    async connectedCallback() {
        Store.subscribe(() => render(this.render(Store.getState()), this)); 
        
        await this.loadAssessments();

        setTimeout(() => {
            Store.dispatch({
                type: 'HIDE_GLOBAL_LOAD_INDICATOR'
            });

            Store.dispatch({
                type: 'HIDE_LOAD_INDICATOR'
            });
        });
    }

    async loadAssessments() {
        const assessmentsResponse = await request(`
            query($userId: ID!, $skip: Int!) {
                assessments(where: {
                    author: {
                        id: $userId
                    }
                }, skip: $skip, first: 5, orderBy: createdAt_DESC) {
                    id
                    assessML
                    javaScript
                    verified
                }
            }
        `, {
            userId: Store.getState().user.id,
            skip: this.assessmentSkipIndex
        });

        this.assessments = assessmentsResponse.assessments;
    }

    async loadPreviousAssessments() {
        Store.dispatch({
            type: 'SHOW_LOAD_INDICATOR'
        });

        this.assessmentSkipIndex -= 5;
        await this.loadAssessments();

        Store.dispatch({
            type: 'HIDE_LOAD_INDICATOR'
        });
    }

    async loadNextAssessments() {
        Store.dispatch({
            type: 'SHOW_LOAD_INDICATOR'
        });

        this.assessmentSkipIndex += 5;
        await this.loadAssessments();

        Store.dispatch({
            type: 'HIDE_LOAD_INDICATOR'
        });
    }

    logoutClick() {
        Store.dispatch({
            type: 'LOGOUT_USER'
        });
    }

    render(state: any) {
        return html`
            <style>
                ${jpContainerCSSClass(state)}
            </style>

            <div class="jp-container">
                <h1>Welcome ${state.user ? state.user.email : 'unregistered user'}</h1>
                <h2>You have ${state.user ? state.user.tokens : 0} ${state.user ? state.user.tokens === 1 ? 'token, use it wisely' : 'tokens, use them wisely' : 'tokens, signup to get some'}</h2>
                <jp-button ?hidden=${!state.user} @click=${() => this.logoutClick()} .text=${'Logout'}></jp-button>
                
                <vaadin-tabs .selected=${this.tabSelected}>
                    <vaadin-tab>Exercises</vaadin-tab>
                </vaadin-tabs>

                <div>
                    <button ?hidden=${this.assessmentSkipIndex === 0} @click=${() => this.loadPreviousAssessments()}>Prev</button>
                    <button @click=${() => this.loadNextAssessments()}>Next</button>
                    ${this.assessments ? this.assessments.map((assessment: any) => {
                        return html`
                            <p
                                title="Your exercise has not yet been reviewed for quality by the JavaScript Practice team."
                                style="color: ${assessment.verified ? 'green' : 'red'}"
                            >
                                ${assessment.verified ? 'Verified' : 'Unverified'}
                            </p>
                            <assess-item
                                .question=${{
                                    assessML: assessment.assessML,
                                    javaScript: assessment.javaScript
                                }}
                            >
                            </assess-item>
                            <a href="assessment/${assessment.id}/view">View live exercise</a>
                            <hr style="width: 75%">
                        `;
                    }) : 'You have not created any exercises'}
                </div>
            </div>
        `;
    }
}

window.customElements.define('jp-profile', JPProfile);