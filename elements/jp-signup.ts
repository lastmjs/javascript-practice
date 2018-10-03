import {html, render} from 'lit-html';
import {Store} from '../services/store';

class JPSignup extends HTMLElement {
    connectedCallback() {
        Store.subscribe(() => render(this.render(Store.getState()), this));    
        
        setTimeout(() => {
            Store.dispatch({
                type: 'HIDE_GLOBAL_LOAD_INDICATOR'
            });
        });
    }

    signupClick() {
        alert('signed up!');
    }

    render(state: any) {
        return html`
            <div>
                Email: <input type="text">
            </div>

            <div>
                Password: <input type="text">
            </div>

            <div>
                Re-enter password: <input type="text">
            </div>

            <div>
                <button @click=${() => this.signupClick()}>Signup</button>
            </div>
        `;
    }
}

window.customElements.define('jp-signup', JPSignup);