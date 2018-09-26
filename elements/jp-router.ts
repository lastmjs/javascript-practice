import {html, render} from 'lit-html';
import {Store} from '../services/store';
import page from 'page';
import './jp-assessment';

page('/:entity/:id/:behavior', (context: any) => {
    Store.dispatch({
        type: 'SET_ROUTE',
        entity: context.params.entity,
        entityId: context.params.id,
        entityBehavior: context.params.behavior,
        routePath: context.path
    });
});
page();

class JPRouter extends HTMLElement {
    connectedCallback() {
        Store.subscribe(() => render(this.render(Store.getState()), this));
    }

    render(state: any) {
        const routes = {
            assessment: {
                view: html`<jp-assessment .assessmentId=${state.currentEntityId}></jp-assessment>`
            }
        };

        return routes[state.currentEntity][state.currentEntityBehavior];
    }
}

window.customElements.define('jp-router', JPRouter);