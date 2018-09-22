import {html, render} from 'lit-html';
import './jp-concept-map';

class JPApp extends HTMLElement {
    connectedCallback() {
        this.render();
    }

    render() {
        render(html`
            <style>
                body {
                    margin: 0;
                }

                .main-grid {
                    display: grid;
                    grid-template-columns: 20em 50vw;
                }
            </style>

            <div class="main-grid">
                <jp-concept-map></jp-concept-map>

                <div>
                    monkey
                </div>
            </div>
        `, this);
    }
}

window.customElements.define('jp-app', JPApp);
