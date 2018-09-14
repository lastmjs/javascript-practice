import './jp-group.ts';

class JPApp extends HTMLElement {
    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
            <style>
                .groups-container {
                    display: flex;
                    justify-content: center;
                    flex-wrap: wrap;
                }
            </style>

            <div class="groups-container">
                <jp-group title="Basic data types"></jp-group>
                <jp-group title="Objects"></jp-group>
                <jp-group title="Functions"></jp-group>
                <jp-group title="Arrays"></jp-group>
                <jp-group title="Classes"></jp-group>
                <jp-group title="Modules"></jp-group>
                <jp-group title="Operators"></jp-group>
                <jp-group title="Control flow"></jp-group>
                <jp-group title="Variables"></jp-group>
                <jp-group title="Promises"></jp-group>
                <jp-group title="async/await"></jp-group>
                <jp-group title="Generators"></jp-group>
                <jp-group title="Scope"></jp-group>
                <jp-group title="Closures"></jp-group>
                <jp-group title="Callbacks"></jp-group>
                <jp-group title="Proxy"></jp-group>
            </div>
        `;
    }
}

window.customElements.define('jp-app', JPApp);
