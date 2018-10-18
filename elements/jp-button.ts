import {html, render} from 'lit-html';
import {Store} from '../services/store';

class JPButton extends HTMLElement {
    text: string = '';

    connectedCallback() {
        this.render();
    }

    render() {
        render(html`
            <style>
                .jp-button {
                    font-size: calc(12px + 1vmin);
                    font-family: monospace;
                    cursor: pointer;
                    background: none;
                    padding: calc(12px + 1vmin);
                    border: none;
                    box-shadow: 0px 0px 5px grey;
                }
            </style>

            <button class="jp-button">${this.text}</button>
        `, this);
    }
}

window.customElements.define('jp-button', JPButton);