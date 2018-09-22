import {html, render} from 'lit-html';

class JPConceptItem extends HTMLElement {
    _selectedConcept: string;

    set selectedConcept(val) {
        this._selectedConcept = val;
        this.render();
    }

    get selectedConcept() {
        return this._selectedConcept;
    }

    get id() {
        return `${this.title.toLowerCase().replace(/\s/g, '-')}-concept-item`;
    }

    connectedCallback() {
        this.render();
    }

    render() {
        render(html`
            <style>
                .concept {
                    position: relative;
                    flex-grow: 1;
                    padding: 2em;
                    cursor: pointer;
                    transition: background-color .5s ease;
                }

                .concept:hover {
                    background-color: rgba(1, 1, 1, .05);
                }

                .concept-focused {
                    background-color: rgba(1, 1, 1, .1);
                }

                .concept-overlay {
                    position: absolute;
                    height: 100%;
                    width: 100%;
                    background-color: rgba(6, 150, 14, .5);
                    top: 0;
                    left: 0;
                    z-index: -1;
                }
            </style>

            <div id=${this.id} class="concept${this.selectedConcept === this.id ? ' concept-focused' : ''}">
                ${this.title}
                <div class="concept-overlay">
                </div>
            </div>
        `, this);
    }
}

window.customElements.define('jp-concept-item', JPConceptItem);
