import './jp-router';
import {html, render} from 'lit-html';
import './jp-concept-map';
import {Store} from '../services/store';
import {highlightColor} from '../services/constants';

class JPApp extends HTMLElement {

    connectedCallback() {
        Store.subscribe(() => render(this.render(Store.getState()), this));

        Store.dispatch({
            type: 'DEFAULT_ACTION'
        });
    }

    courseClick() {
        window.location.href = 'plans-and-pricing.html';
    }

    mainMenuToggle() {
        Store.dispatch({
            type: 'TOGGLE_MAIN_MENU'
        });
    }

    nextQuestionClick(state: any) {
        Store.dispatch({
            type: 'NEXT_QUESTION'
        });
    }

    previousQuestionClick() {
        Store.dispatch({
            type: 'PREVIOUS_QUESTION'
        });
    }

    render(state: any) {
        return html`
            <style>
                @media (min-width: 1024px) {
                    .main-grid {
                        display: grid;
                        grid-template-columns: 20% 80%;
                    }

                    .menu-button {
                        display: none;
                    }
                }

                @media (max-width: 1024px) {
                    .main-grid {
                        display: grid;
                        grid-template-columns: 0% 100%;
                    }
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
                    font-size: 1.5em;
                }

                .course:hover {
                    background-color: rgba(1, 1, 1, .05);
                }

                .course-focused {
                    background-color: ${highlightColor};
                }

                .previous-question-button {
                    border: none;
                    background-color: white;
                    padding: 1.5em;
                    cursor: pointer;
                    font-family: monospace;
                    transition: background-color .5s ease;
                    color: black;
                    box-shadow: 0px 0px 1px black;
                    font-size: calc(12px + 1vmin);
                }

                .previous-question-button:hover {
                    background-color: ${highlightColor};
                }

                .next-question-button {
                    margin-left: auto;
                    border: none;
                    background-color: white;
                    padding: 1.5em;
                    cursor: pointer;
                    font-family: monospace;
                    transition: background-color .5s ease;
                    color: black;
                    box-shadow: 0px 0px 1px black;
                    font-size: calc(12px + 1vmin);
                }

                .next-question-button:hover {
                    background-color: ${highlightColor};
                }
            </style>

            <div class="main-grid">
                <jp-concept-map></jp-concept-map>

                <div>
                    
                    <!-- <div style="width: 100%; background-color: black; height: 5vh; color: white"> -->
                        <!-- Bar where stuff can go -->
                        <button id="main-menu-button" class="menu-button" @click=${() => this.mainMenuToggle()}>Menu</button>
                    <!-- </div> -->

                    <div style="display: flex">
                        <button ?hidden=${state.currentAssessment && state.currentAssessment.order === 0} class="previous-question-button" @click=${(e: any) => this.previousQuestionClick()}>Previous question</button>
                        <button ?hidden=${state.currentAssessment && state.currentConcept && state.currentAssessment.order === state.currentConcept.assessments.length - 1} class="next-question-button" @click=${(e: any) => this.nextQuestionClick(state)}>Next question</button>
                    </div>

                    <jp-router></jp-router>

                </div>

            </div>

            <a class="privacy-anchor" href="privacy.html">Privacy</a>
        `;
    }
}

window.customElements.define('jp-app', JPApp);
