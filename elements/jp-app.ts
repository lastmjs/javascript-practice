import './jp-router';
import {html, render} from 'lit-html';
import './jp-concept-map';
import {Store} from '../services/store';
import {highlightColor, backgroundColor} from '../services/constants';
import './jp-load-indicator';

window.addEventListener('resize', () => {
    Store.dispatch({
        type: 'WINDOW_RESIZE'
    });
});

class JPApp extends HTMLElement {

    connectedCallback() {
        Store.subscribe(() => render(this.render(Store.getState()), this));

        Store.dispatch({
            type: 'DEFAULT_ACTION'
        });
    }

    mainMenuToggle() {
        Store.dispatch({
            type: 'TOGGLE_MAIN_MENU'
        });
    }

    render(state: any) {
        return html`
            <style>
                @media (min-width: 1024px) {
                    .main-grid {
                        display: grid;
                        grid-template-columns: 20% 80%;
                        height: 100%;
                        overflow: hidden;
                    }

                    .menu-button {
                        display: none;
                    }
                }

                @media (max-width: 1024px) {
                    .main-grid {
                        display: grid;
                        grid-template-columns: 0% 100%;
                        height: 100%;
                        overflow: hidden;
                    }

                    .menu-button {
                        display: block;
                    }
                }

                .privacy-anchor {
                    color: black;
                    position: fixed;
                    bottom: 1em;
                    right: 1em;
                }

                .router-area {
                    height: ${window.innerHeight}px;
                    overflow: hidden;
                }
            </style>

            <div class="main-grid">
                <jp-concept-map></jp-concept-map>

                <div class="router-area">

                    <jp-load-indicator .hide=${state.hideLoadIndicator} .lower=${state.lowerLoadIndicator}></jp-load-indicator>
                    
                    <!-- <div style="border-left: 1px solid grey; display: flex; width: 100%; background-color: ${backgroundColor}; box-shadow: 0px 4px 2px -2px grey">
                        <button id="main-menu-button" class="menu-button" @click=${() => this.mainMenuToggle()}>Menu</button>
                        <button ?hidden=${state.currentAssessment && state.currentAssessment.order === 0} class="previous-question-button" @click=${(e: any) => this.previousQuestionClick()}>Previous question</button>
                        <button ?hidden=${state.currentAssessment && state.currentConcept && state.currentAssessment.order === state.currentConcept.assessments.length - 1} class="next-question-button" @click=${(e: any) => this.nextQuestionClick(state)}>Next question</button>
                    </div> -->

                    <jp-router></jp-router>

                </div>

            </div>

            <a class="privacy-anchor" href="privacy.html">Privacy</a>
        `;
    }
}

window.customElements.define('jp-app', JPApp);
