import '@polymer/paper-card/paper-card.js';

class JPGroup extends HTMLElement {

    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
            <style>
                .question-container {
                    width: 100vw;
                    max-width: 1000px;
                    margin-bottom: 5vh;
                }
            </style>

            <paper-card class="question-container">
                <div class="card-content">
                    ${this.title}
                </div>
            </paper-card>
        `;
    }
}

window.customElements.define('jp-group', JPGroup);
