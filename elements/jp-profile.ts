import {html, render} from 'lit-html';
import {Store} from '../services/store';
import './jp-button';
import { jpContainerCSSClass } from '../services/constants';
import '@vaadin/vaadin-tabs/vaadin-tabs.js';
import { request } from '../services/graphql';
import 'assess-elements/assess-item.ts';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';

enum tabSelected {
    PERFORMANCE_TAB,
    ASSESSMENTS_TAB,
    TOKENS_TAB,
}

class JPProfile extends HTMLElement {
    tabSelected: tabSelected = tabSelected.PERFORMANCE_TAB;
    assessments: any[] = [];
    assessmentSkipIndex = 0;
    tokenTransactions: any[] = [];
    answerAttempts: any[] = [];
    totalAnswerAttempts: number = 0;
    totalCorrectAnswerAttempts: number = 0;
    totalIncorrectAnswerAttempts: number = 0;
    percentageCorrect: string = '';

    async connectedCallback() {
        Store.subscribe(() => render(this.render(Store.getState()), this)); 
        
        await this.loadPerformance();
        this.loadAssessments();
        this.loadTokenTransactions();

        setTimeout(() => {
            Store.dispatch({
                type: 'HIDE_GLOBAL_LOAD_INDICATOR'
            });

            Store.dispatch({
                type: 'HIDE_LOAD_INDICATOR'
            });
        });
    }

    async loadPerformance() {
        const performanceResponse = await request(`
            query($userId: ID!) {
                answerAttempts(where: {
                    assessmentInfo: {
                        user: {
                            id: $userId
                        }
                    }
                }, orderBy: createdAt_DESC) {
                    correct
                    createdAt
                    assessmentInfo {
                        id
                        assessment {
                            id
                        }
                    }
                }
            }
        `, {
            userId: Store.getState().user.id
        });

        this.answerAttempts = performanceResponse.answerAttempts;
        this.totalAnswerAttempts = performanceResponse.answerAttempts.length;
        this.totalCorrectAnswerAttempts = performanceResponse.answerAttempts.filter((answerAttempt: any) => answerAttempt.correct).length;
        this.totalIncorrectAnswerAttempts = performanceResponse.answerAttempts.filter((answerAttempt: any) => !answerAttempt.correct).length;
        this.percentageCorrect = ((this.totalCorrectAnswerAttempts / (this.totalCorrectAnswerAttempts + this.totalIncorrectAnswerAttempts)) * 100).toFixed(2);
    }

    async loadTokenTransactions() {
        const tokenTransactionsResponse = await request(`
            query($userId: ID!) {
                tokenTransactions(where: {
                    user: {
                        id: $userId
                    }
                }, orderBy: createdAt_DESC) {
                    amount
                    description
                }
            }
        `, {
            userId: Store.getState().user.id
        });

        this.tokenTransactions = tokenTransactionsResponse.tokenTransactions;
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

    performanceTabClicked() {
        this.tabSelected = tabSelected.PERFORMANCE_TAB;

        Store.dispatch({
            type: 'TRIGGER_RENDER'
        });
    }

    exercisesTabClicked() {
        this.tabSelected = tabSelected.ASSESSMENTS_TAB;

        Store.dispatch({
            type: 'TRIGGER_RENDER'
        });
    }

    tokensTabClicked() {
        this.tabSelected = tabSelected.TOKENS_TAB;

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
                <h1>Welcome ${state.user ? state.user.email : 'unregistered user'}</h1>
                <jp-button ?hidden=${!state.user} @click=${() => this.logoutClick()} .text=${'Logout'}></jp-button>
                
                <br>
                <br>

                <vaadin-tabs .selected=${this.tabSelected}>
                    <vaadin-tab @click=${() => this.performanceTabClicked()}>My performance</vaadin-tab>
                    <vaadin-tab @click=${() => this.exercisesTabClicked()}>My exercises</vaadin-tab>
                    <vaadin-tab @click=${() => this.tokensTabClicked()}>My token history</vaadin-tab>
                </vaadin-tabs>

                <div ?hidden=${this.tabSelected !== tabSelected.PERFORMANCE_TAB}>
                    <h2>Total answer attempts: ${this.totalAnswerAttempts}</h2>
                    <h2>Total correct attempts: <span style="color: green">${this.totalCorrectAnswerAttempts}</span></h2>
                    <h2>Total incorrect attempts: <span style="color: red">${this.totalIncorrectAnswerAttempts}</span></h2>
                    <h2>Percentage correct: ${this.percentageCorrect}%</h2>
                    ${this.answerAttempts.map((answerAttempt) => {
                        return html`
                            <br>
                            <div><a href="assessment/${answerAttempt.assessmentInfo.assessment.id}/view" target="_blank">Answered ${answerAttempt.correct ? 'correctly' : 'incorrectly'}</a> on ${new Date(answerAttempt.createdAt)}</div>
                            <br>
                            <hr style="width: 75%">
                        `;
                    })}
                </div>

                <div ?hidden=${this.tabSelected !== tabSelected.ASSESSMENTS_TAB}>
                    <button ?hidden=${this.assessmentSkipIndex === 0} @click=${() => this.loadPreviousAssessments()}>Prev</button>
                    <button @click=${() => this.loadNextAssessments()}>Next</button>
                    ${this.assessments.length !== 0 ? this.assessments.map((assessment: any) => {
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

                <div ?hidden=${this.tabSelected !== tabSelected.TOKENS_TAB}>
                    <h3>You have ${state.user ? state.user.tokens : 0} ${state.user ? state.user.tokens === 1 ? 'token, use it wisely' : 'tokens, use them wisely' : 'tokens, signup to get some'}</h3>
                    ${this.tokenTransactions.map((tokenTransaction: any) => {
                        return html`
                            <br>
                            <div>${tokenTransaction.amount > 0 ? '+ ' : ''}${tokenTransaction.amount} ${tokenTransaction.amount === 1 || tokenTransaction.amount === -1 ? 'token' : 'tokens'}, ${unsafeHTML(tokenTransaction.description)}</div>
                            <br>
                            <hr style="width: 75%">
                        `;
                    })}
                </div>                
            </div>
        `;
    }
}

window.customElements.define('jp-profile', JPProfile);