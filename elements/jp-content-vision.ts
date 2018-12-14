import { html, render } from 'lit-html';
import { jpContainerCSSClass } from '../services/constants';
import { Store } from '../services/store';

class JPContentVision extends HTMLElement {
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
                <h1>Our vision</h1>

                <br>

                <p>JavaScript Practice is an open source, crowdsourced, comprehensive JavaScript course.</p>

                <br>

                <hr style="width: 75%">

                <br>

                <p>We are <a href="https://demergence.org" target="_blank">Demergence</a>.</p>

                <p>Our goal is to facilitate the creation of the most comprehensive, high quality, and useful programming courses in existence.</p>
            
                <p>We believe that open source principles, crowdsourced content, and decentralization may be what gets us there.</p>

                <p>JavaScript Practice is our first project. We are purposefully starting small, starting centralized, and working towards our decentralized vision.</p>

                <p>Eventually we imagine many more courses becoming available as <a href="https://en.wikipedia.org/wiki/Network_effect" target="_blank">network effects</a> begin to take hold. These network effects can be thought of as demergent properties, which are essentially <a href="https://en.wikipedia.org/wiki/Emergence" target="_blank">emergent properties</a> that arise in decentralized networks.</p>

                <p>We hope you'll help us build the greatest courses ever conceived.</p>

                <h1>Roadmap</h1>

                <h2>Q3 2018</h2>

                <ul>
                    <li>Launch alpha</li>
                    <li>Validate usefulness of core JavaScript exercises</li>
                    <li>Implement feedback from user observations and feedback</li>
                </ul>

                <h2>Q4 2018</h2>

                <ul>
                    <li>Launch beta</li>
                    <li>Find technical partner</li>
                    <li>Finish initial exercise content for Primitive data types, Objects, Arrays, Functions, and Classes</li>
                    <li>Create navigable concept map UI</li>
                    <li>Validate exercise creation by users</li>
                    <li>Validate token model</li>
                </ul>

                <h2>Q1 2019</h2>

                <ul>
                    <li>Full release</li>
                    <li>Finish initial content for JavaScript course</li>
                    <li>Promote the project, build community of content contributors</li>
                    <li>Continue token model validation</li>
                </ul>

                <h2>Q2 2019</h2>

                <ul>
                    <li>Scale out with more courses</li>
                </ul>
            </div>
        `;
    }
}

window.customElements.define('jp-content-vision', JPContentVision);