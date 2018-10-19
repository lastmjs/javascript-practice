import { html, render } from 'lit-html';
import { Store } from '../services/store';
import '@polymer/paper-toast';

class JPNotifications extends HTMLElement {
    connectedCallback() {
        Store.subscribe(() => render(this.render(Store.getState()), this));
    }

    openedChanged(e: any) {
        const state = Store.getState();

        if (
            !e.target.opened &&
            state.notifications.length > 0
        ) {
            Store.dispatch({
                type: 'CLEAR_NOTIFICATIONS'
            });
        }
    }

    render(state: any) {
        const notificationsPaperToast = this.querySelector('#notifications-toast');

        if (
            notificationsPaperToast &&
            state.notifications.length > 0
        ) {
            this.querySelector('#notifications-toast').open();
        }

        return html`
            <paper-toast id="notifications-toast" vertical-align="top" horizontal-align="right" duration="5000" @opened-changed=${(e: any) => this.openedChanged(e)} .fitInto=${this.fitInto}>
                ${state.notifications.map((notification: string, index: number) => `${notification}${index !== state.notifications.length - 1 ? ', ' : ''}`)}
            </paper-toast>
        `;
    }
}

window.customElements.define('jp-notifications', JPNotifications);