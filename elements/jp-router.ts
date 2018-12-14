import { html, render } from 'lit-html';
import { Store } from '../services/store';
import page from 'page';

page('/:entity/:id/:behavior', (context: any) => {
    Store.dispatch({
        type: 'SET_ROUTE',
        entity: context.params.entity,
        entityId: context.params.id,
        entityBehavior: context.params.behavior,
        routePath: context.path
    });
});

page('/:entity/:behavior', (context: any) => {
    Store.dispatch({
        type: 'SET_ROUTE',
        entity: context.params.entity,
        entityBehavior: context.params.behavior,
        routePath: context.path
    });
});

page();

class JPRouter extends HTMLElement {
    connectedCallback() {
        Store.subscribe(async () => render(await this.render(Store.getState()), this));
    }

    async render(state: any) {
        const routes = {
            assessment: {
                view: {
                    template: html`<jp-assessment .assessmentId=${state.currentEntityId}></jp-assessment>`,
                    loadModules: async () => {
                        await import('./jp-assessment.ts');
                    }
                },
                create: {
                    template: html`<jp-assessment .assessmentId=${'CREATE_ASSESSMENT'}></jp-assessment>`,
                    loadModules: async () => {
                        await import('./jp-assessment.ts');
                    }
                },
                edit: {
                    //TODO the edit view should take you to the live exercise, and open the source code tab automatically
                    template: html`<jp-assessment-edit .assessmentId=${state.currentEntityId}></jp-assessment-edit>`,
                    loadModules: async () => {
                        await import('./jp-assessment-edit.ts');
                    }
                }
            },
            user: {
                login: {
                    template: html`<jp-login></jp-login>`,
                    loadModules: async () => {
                        await import('./jp-login.ts');
                    }
                },
                signup: {
                    template: html`<jp-signup></jp-signup>`,
                    loadModules: async () => {
                        await import('./jp-signup.ts');
                    }
                },
                profile: {
                    template: html`<jp-profile></jp-profile>`,
                    loadModules: async () => {
                        await import('./jp-profile.ts');
                    }
                }
            },
            token: {
                overview: {
                    template: html`<jp-token-overview></jp-token-overview>`,
                    loadModules: async () => {
                        await import('./jp-token-overview.ts');
                    }
                },
                buy: {
                    template: html`<jp-token-buy></jp-token-buy>`,
                    loadModules: async () => {
                        await import('./jp-token-buy.ts');
                    }
                },
                earn: {
                    template: html`<jp-token-earn></jp-token-earn>`,
                    loadModules: async () => {
                        await import('./jp-token-earn.ts');
                    }
                }
            },
            legal: {
                'terms-and-privacy': {
                    template: html`<jp-legal-terms-and-privacy></jp-legal-terms-and-privacy>`,
                    loadModules: async () => {
                        await import('./jp-legal-terms-and-privacy.ts');
                    }
                },
                'accept-new-terms': {
                    template: html`<jp-legal-accept-new-terms></jp-legal-accept-new-terms>`,
                    loadModules: async () => {
                        await import('./jp-legal-accept-new-terms.ts');
                    }
                }
            },
            feedback: {
                submit: {
                    template: html`<jp-feedback-submit></jp-feedback-submit>`,
                    loadModules: async () => {
                        await import('./jp-feedback-submit.ts');
                    }
                }
            },
            content: {
                vision: {
                    template: html`<jp-content-vision></jp-content-vision>`,
                    loadModules: async () => {
                        await import('./jp-content-vision.ts');
                    }
                }
            }
        };

        const route = routes[state.currentEntity][state.currentEntityBehavior];
        await route.loadModules();
        return route.template;
    }
}

window.customElements.define('jp-router', JPRouter);