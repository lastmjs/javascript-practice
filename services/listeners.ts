import {Store} from './store';

window.addEventListener('resize', () => {
    Store.dispatch({
        type: 'WINDOW_RESIZE_EVENT',
        desktopScreen: window.matchMedia('(min-width: 1024px)').matches,
        mobileScreen: window.matchMedia('(max-width: 1024px)').matches
    });
});

document.body.addEventListener('click', (e) => {
    if (Store.getState().showMainMenu && e.target.id !== 'main-menu-button' && window.matchMedia('(max-width: 1024px)').matches) {
        Store.dispatch({
            type: 'TOGGLE_MAIN_MENU'
        });
    }
});