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
                    flex-grow: 1;
                    padding: 2em;
                    cursor: pointer;
                }

                .concept:hover {
                    background-color: rgba(1, 1, 1, .05);
                }

                .concept-focused {
                    background-color: rgba(1, 1, 1, .1);
                }
            </style>

            <div id=${this.id} class="concept${this.selectedConcept === this.id ? ' concept-focused' : ''}">${this.title}</div>
        `, this);
    }
}

window.customElements.define('jp-concept-item', JPConceptItem);
