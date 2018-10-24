import { html, render } from 'lit-html';
import { Store } from '../services/store';
import { jpContainerCSSClass } from '../services/constants';
import { request } from '../services/graphql';

class JPTokenOverview extends HTMLElement {
    createExerciseTokenReward: number = 0;
    answerIncorrectTokenReward: number = 0;
    viewSolutionTokenReward: number = 0;

    async connectedCallback() {
        Store.subscribe(() => render(this.render(Store.getState()), this));    
        
        const response = await request(`
            query {
                createExerciseTokenReward: tokenReward(where: {
                    type: EXERCISE_CREATED_AND_ACCEPTED
                }) {
                    amount
                }

                answerIncorrectTokenReward: tokenReward(where: {
                    type: ANSWER_INCORRECT
                }) {
                    amount
                }

                viewSolutionTokenReward: tokenReward(where: {
                    type: VIEW_SOLUTION
                }) {
                    amount
                }
            }
        `);

        //TODO local redux store
        this.createExerciseTokenReward = response.createExerciseTokenReward.amount;
        this.answerIncorrectTokenReward = response.answerIncorrectTokenReward.amount;
        this.viewSolutionTokenReward = response.viewSolutionTokenReward.amount;

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
                <h1>Tokenomics</h1>
                <h2>You have ${state.user ? state.user.tokens : 0} ${state.user ? state.user.tokens === 1 ? 'token, use it wisely' : 'tokens, use them wisely' : 'tokens, signup to get some'}</h2>
                <h3>+${this.createExerciseTokenReward}: Create an exercise that is accepted into the course</h3>
                <h3>-1: Answer incorrectly (only applies once per exercise and before answering correctly)</h3>
                <h3>-1: View solution (only applies once per exercise, before answering correctly, and after attempting an answer)</h3>
            </div>
        `;
    }
}

window.customElements.define('jp-token-overview', JPTokenOverview);