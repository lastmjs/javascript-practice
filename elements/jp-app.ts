import './jp-router';
import {html, render} from 'lit-html';
import './jp-concept-map';
import {Store} from '../services/store';

class JPApp extends HTMLElement {

    connectedCallback() {
        Store.subscribe(() => render(this.render(Store.getState()), this));

        Store.dispatch({
            type: 'DEFAULT_ACTION'
        });

        Store.dispatch({
            type: 'SET_INITIAL_URL'
        });
    }

    courseClick() {
        window.location.href = 'plans-and-pricing.html';
    }

    render(state: any) {
        return html`
            <style>
                .main-grid {
                    display: grid;
                    grid-template-columns: 20em 100vw;
                }

                .privacy-anchor {
                    color: black;
                    position: fixed;
                    bottom: 1em;
                    right: 1em;
                }

                .course-bar {
                    display: flex;
                    text-align: center;
                    box-shadow: 0px 0px 1px black;
                }

                .course {
                    flex-grow: 1;
                    padding: 2em;
                    cursor: pointer;
                    transition: background-color .5s ease;
                    font-weight: bold;
                    white-space: nowrap;
                }

                .course:hover {
                    background-color: rgba(1, 1, 1, .05);
                }

                .course-focused {
                    background-color: rgba(1, 1, 1, .1);
                }
            </style>

            <div class="main-grid">
                <jp-concept-map></jp-concept-map>

                <div>
                    <div class="course-bar">
                        <div class="course course-focused">JavaScript</div>
                        <div @click=${() => this.courseClick()} class="course">TypeScript</div>
                        <div @click=${() => this.courseClick()} class="course">DOM</div>
                        <div @click=${() => this.courseClick()} class="course">Web Components</div>
                        <div @click=${() => this.courseClick()} class="course">Redux</div>
                        <div @click=${() => this.courseClick()} class="course">GraphQL</div>
                        <div @click=${() => this.courseClick()} class="course">WebAssembly</div>
                        <div @click=${() => this.courseClick()} class="course">Web3</div>
                        <div @click=${() => this.courseClick()} class="course">NPM</div>
                        <div @click=${() => this.courseClick()} class="course">Node.js</div>
                        <div @click=${() => this.courseClick()} class="course">Deno</div>
                    </div>

                    <jp-router></jp-router>

                </div>

            </div>

            <a class="privacy-anchor" href="privacy.html">Privacy</a>
        `;
    }
}

window.customElements.define('jp-app', JPApp);
