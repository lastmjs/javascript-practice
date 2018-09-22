class JPApp extends HTMLElement {
    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
            <style>
                body {
                    margin: 0;
                }

                .concepts-container {
                    display: flex;
                    flex-direction: column;
                    text-align: center;
                }

                .concept {
                    flex-grow: 1;
                    padding: 1em;
                    border: 1px solid black;
                    cursor: pointer;
                }

                .concept:hover {
                    background-color: rgba(1, 1, 1, .1);
                }
            </style>

            <div style="display: grid; grid-template-columns: 20em 50vw">
                <div class="concepts-container">
                    <div class="concept">Primitive data types</div>
                    <div class="concept">Objects</div>
                    <div class="concept">Functions</div>
                    <div class="concept">Arrays</div>
                    <div class="concept">Classes</div>
                    <div class="concept">Modules</div>
                    <div class="concept">Operators</div>
                    <div class="concept">Control flow</div>
                    <div class="concept">Variables</div>
                    <div class="concept">Promises</div>
                    <div class="concept">async/await</div>
                    <div class="concept">Generators</div>
                    <div class="concept">Scope</div>
                    <div class="concept">Closures</div>
                    <div class="concept">Callbacks</div>
                    <div class="concept">Proxies</div>
                </div>

                <div>
                    mlonkey
                </div>
            </div>
        `;
    }
}

window.customElements.define('jp-app', JPApp);
