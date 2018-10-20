import { html, render } from 'lit-html';

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
                    padding-top: calc(5px + 1vmin);
                    padding-bottom: calc(5px + 1vmin);
                    padding-left: calc(20px + 1vmin);
                    padding-right: calc(20px + 1vmin);
                    border: none;
                    color: white;
                    background-color: black;
                }
            </style>

            <button class="jp-button">${this.text}</button>
        `, this);
    }
}

window.customElements.define('jp-button', JPButton);