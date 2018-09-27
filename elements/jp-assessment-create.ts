import {html, render} from 'lit-html';
import {Store} from '../services/store';
import {request} from '../services/graphql';

class JPAssessmentCreate extends HTMLElement {
    connectedCallback() {
        Store.subscribe(() => render(this.render(Store.getState()), this));
    }    

    async submit() {
        const conceptSelect = this.querySelector(`#concept-select`);
        const orderInput = this.querySelector(`#order-input`);
        const assessMLTextarea = this.querySelector(`#assessml-textarea`);
        const javaScriptTextarea = this.querySelector(`#javascript-textarea`);

        const conceptId = conceptSelect ? conceptSelect.value : null;
        const order = orderInput ? parseInt(orderInput.value) : null;
        const assessML = assessMLTextarea ? assessMLTextarea.value : null;
        const javaScript = javaScriptTextarea ? javaScriptTextarea.value : null;

        const response = await request(`
            mutation($conceptId: ID!, $order: Int!, $assessML: String!, $javaScript: String!) {
                createAssessment(data: {
                    concept: {
                        connect: {
                            id: $conceptId
                        }
                    }
                    order: $order
                    assessML: $assessML
                    javaScript: $javaScript
                }) {
                    id
                }
            }
        `, {
            conceptId,
            order,
            assessML,
            javaScript
        });

        if (response) {
            alert('Question saved successfully');
        }
    }

    render(state: any) {
        return html`
            <div>
                <select id="concept-select">
                    ${state.concepts.map((concept: any) => {
                        return html`<option value=${concept.id}>${concept.title}</option>`;
                    })}
                </select>
            </div>

            <div>
                order: <input id="order-input" type="number">
            </div>

            <div>
                <h1>AssessML</h1>
                <textarea id="assessml-textarea" style="width: 100%; height: 50vh; font-size: 2em"></textarea>
            </div>

            <div>
                <h1>JavaScript</h1>
                <textarea id="javascript-textarea" style="width: 100%; height: 50vh; font-size: 2em"></textarea>
            </div>

            <div>
                <button @click=${(e: any) => this.submit()}>Submit</button>
            </div>
        `;
    }
}

window.customElements.define('jp-assessment-create', JPAssessmentCreate);