import './jp-group.js';
import {groups} from '../services/groups.js';
import {html, render} from 'lit-html/lib/lit-extended.js';

class JPApp extends HTMLElement {
    connectedCallback() {
        this.render();
    }

    async render() {
        //TODO we should be passing the question down to each jp-group element as a property

        render(html`
            <style>
                .groups-container {
                    display: flex;
                    justify-content: center;
                    flex-wrap: wrap;
                }
            </style>

            <div id="groups-container" class="groups-container">
                ${groups.map((group) => {
                    return html`<jp-group id="${group.id}" title=${group.title}></jp-group>`;
                })}
            </div>
        `, this);
    }
}

window.customElements.define('jp-app', JPApp);

function wait(time=0) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, time);
    });
}
