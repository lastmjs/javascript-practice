import './jp-group.js';

class JPApp extends HTMLElement {
    connectedCallback() {
        this.render();
    }

    async render() {
        this.innerHTML = `
            <style>
                .groups-container {
                    display: flex;
                    justify-content: center;
                    flex-wrap: wrap;
                }
            </style>

            <div id="groups-container" class="groups-container">
                <jp-group title="Basic data types"></jp-group>
                <jp-group title="Objects"></jp-group>
                <jp-group title="Functions"></jp-group>
                <jp-group title="Arrays"></jp-group>
                <jp-group title="Classes"></jp-group>
                <!--<jp-group title="Modules"></jp-group>
                <jp-group title="Operators"></jp-group>
                <jp-group title="Control flow"></jp-group>
                <jp-group title="Variables"></jp-group>
                <jp-group title="Promises"></jp-group>
                <jp-group title="async/await"></jp-group>
                <jp-group title="Generators"></jp-group>
                <jp-group title="Scope"></jp-group>
                <jp-group title="Closures"></jp-group>
                <jp-group title="Callbacks"></jp-group>
                <jp-group title="Proxy"></jp-group>-->
            </div>
        `;

        // const titles = [
        //     'Basic data types',
        //     'Objects',
        //     'Functions',
        //     'Arrays',
        //     'Classes',
        //     'Modules',
        //     'Operators',
        //     'Control flow',
        //     'Variables',
        //     'Promises',
        //     'async/await',
        //     'Generators',
        //     'Scope',
        //     'Closures',
        //     'Callbacks',
        //     'Proxy'
        // ];
        //
        // for(let i=0; i < titles.length; i++) {
        //     const title = titles[i];
        //     await wait(1000);
        //     this.querySelector(`#groups-container`).innerHTML += `<jp-group title="${title}"></jp-group>`;
        // }
    }
}

window.customElements.define('jp-app', JPApp);

function wait(time=0) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, time);
    });
}
