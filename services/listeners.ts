import {Store} from './store';

window.addEventListener('resize', () => {
    Store.dispatch({
        type: 'WINDOW_RESIZE_EVENT',
        desktopScreen: window.matchMedia('(min-width: 1024px)').matches,
        mobileScreen: window.matchMedia('(max-width: 1024px)').matches
    });
});

document.body.addEventListener('click', (e) => {    
    if (
        Store.getState().mobileScreen &&
        Store.getState().showMainMenu &&
        Store.getState().bodyClickListenerLock === false
    ) {
        Store.dispatch({
            type: 'TOGGLE_MAIN_MENU'
        });

        Store.dispatch({
            type: 'LOCK_BODY_CLICK_LISTENER'
        });
    }

    if (
        Store.getState().mobileScreen &&
        Store.getState().showMainMenu &&
        Store.getState().bodyClickListenerLock === true
    ) {
        Store.dispatch({
            type: 'UNLOCK_BODY_CLICK_LISTENER'
        });
    } 
});