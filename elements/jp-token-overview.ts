import { html, render } from 'lit-html';
import { Store } from '../services/store';
import { jpContainerCSSClass } from '../services/constants';

class JPTokenOverview extends HTMLElement {
    connectedCallback() {
        Store.subscribe(() => render(this.render(Store.getState()), this));    
        
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
                <h3>+20: Create an exercise that is accepted into the course</h3>
                <h3>+1: Answer correctly (only applies once per exercise)</h3>
                <h3>-2: Answer incorrectly (only applies once per exercise and before answering correctly)</h3>
                <h3>-1: View solution (only applies once per exercise and before answering correctly)</h3>
            </div>
        `;
    }
}

window.customElements.define('jp-token-overview', JPTokenOverview);