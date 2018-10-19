import {createStore} from 'redux';
import page from 'page';

let persistedState = JSON.parse(window.localStorage.getItem('state'));

if (persistedState && persistedState.version !== 2) {
    window.localStorage.setItem('state', null);
    persistedState = null;
}

const InitialState = persistedState ?  {
    ...persistedState,
    hideGlobalLoadIndicator: false
} : {
    version: 2,
    currentConcept: null,
    currentEntity: 'assessment',
    currentEntityId: 'cjmjovn4p00hi0a58cfsjusdq',
    currentEntityBehavior: 'view',
    currentAssessment: null,
    concepts: [],
    showMainMenu: window.matchMedia('(min-width: 1024px)').matches,
    userProgress: {},
    hideGlobalLoadIndicator: false,
    hideLoadIndicator: false,
    desktopScreen: window.matchMedia('(min-width: 1024px)').matches,
    mobileScreen: window.matchMedia('(max-width: 1024px)').matches,
    bodyClickListenerLock: true,
    user: null,
    userJWT: null,
    notifications: []
};

const RootReducer = (state=InitialState, action: any) => {
    if (action.type === 'ADD_NOTIFICATION') {
        return {
            ...state,
            notifications: [...state.notifications, action.notification]
        };
    }

    if (action.type === 'CLEAR_NOTIFICATIONS') {
        return {
            ...state,
            notifications: []
        };
    }

    if (action.type === 'SET_USER_TOKENS') {
        return {
            ...state,
            user: {
                ...state.user,
                tokens: action.tokens
            }
        };
    }

    if (action.type === 'LOGOUT_USER') {
        return {
            ...state,
            user: null,
            userJWT: null
        };
    }

    if (action.type === 'LOGIN_USER') {
        return {
            ...state,
            user: action.user,
            userJWT: action.userJWT
        };
    }

    if (action.type === 'LOCK_BODY_CLICK_LISTENER') {
        return {
            ...state,
            bodyClickListenerLock: true
        };
    }

    if (action.type === 'UNLOCK_BODY_CLICK_LISTENER') {
        return {
            ...state,
            bodyClickListenerLock: false
        };
    }

    if (action.type === 'SHOW_LOAD_INDICATOR') {
        return {
            ...state,
            hideLoadIndicator: false
        };
    }

    if (action.type === 'WINDOW_RESIZE_EVENT') {
        return {
            ...state,
            desktopScreen: action.desktopScreen,
            mobileScreen: action.mobileScreen,
            bodyClickListenerLock: action.mobileScreen ? !state.showMainMenu : true
        };
    }

    if (action.type === 'HIDE_LOAD_INDICATOR') {
        return {
            ...state,
            hideLoadIndicator: true
        };
    }

    if (action.type === 'HIDE_GLOBAL_LOAD_INDICATOR') {
        return {
            ...state,
            hideGlobalLoadIndicator: true
        };
    }

    if (action.type === 'TOGGLE_MAIN_MENU') {
        return {
            ...state,
            showMainMenu: !state.showMainMenu
        };
    }

    if (action.type === 'SET_CONCEPTS') {
        return {
            ...state,
            concepts: action.concepts
        };
    }

    if (action.type === 'SET_ROUTE') {
        const currentEntity = action.entity;
        const currentEntityId = action.entityId;
        const currentEntityBehavior = action.entityBehavior;
        const currentRoutePath = action.routePath;

        return {
            ...state,
            currentEntity,
            currentEntityId,
            currentEntityBehavior,
            currentRoutePath
        };
    }

    if (action.type === 'SET_CURRENT_ASSESSMENT') {
        return {
            ...state,
            currentAssessment: action.assessment
        };
    }

    if (action.type === 'SET_CURRENT_CONCEPT') {
        return {
            ...state,
            currentConcept: action.concept
        };
    }
    
    if (action.type === 'SWITCH_SELECTED_CONCEPT') {
        const currentConcept = action.concept;
        const currentAssessment = currentConcept.assessments.find((assessment: any) => {
            return assessment.order === 0;
        });

        //TODO figure out how to handle side effects elegantly
        setTimeout(() => {
            page(`/assessment/${currentAssessment.id}/view`);
        });

        return {
            ...state,
            currentConcept,
            hideLoadIndicator: state.currentConcept.id === action.concept.id ? true : false
        };
    }

    if (action.type === 'SET_USER_COMPLETED') {
        return {
            ...state,
            userProgress: {
                ...state.userProgress,
                [state.currentConcept.id]: {
                    ...state.userProgress[state.currentConcept.id],
                    [state.currentAssessment.id]: true
                }
            }
        };
    }

    if (action.type === 'NEXT_QUESTION') {
        const currentOrder = state.currentAssessment.order;
        const sortedConceptQuestions = state.currentConcept.assessments.sort((a, b) => a.order < b.order);
        const lastOrder = sortedConceptQuestions[0].order;
        const nextOrder = currentOrder < lastOrder ? currentOrder + 1 : currentOrder;
        const nextOrderAssessmentId = state.currentConcept.assessments.find((assessment) => assessment.order === nextOrder).id;

        //TODO figure out how to handle side effects elegantly
        setTimeout(() => {
            page(`/assessment/${nextOrderAssessmentId}/view`);
        });

        return {
            ...state,
            hideLoadIndicator: false
        };
    }

    if (action.type === 'PREVIOUS_QUESTION') {
        const currentOrder = state.currentAssessment.order;
        const previousOrder = currentOrder > 0 ? currentOrder - 1 : currentOrder;
        const previousOrderAssessmentId = state.currentConcept.assessments.find((assessment) => assessment.order === previousOrder).id;

        //TODO figure out how to handle side effects elegantly
        setTimeout(() => {
            page(`/assessment/${previousOrderAssessmentId}/view`);
        });

        return {
            ...state,
            hideLoadIndicator: false
        };
    }

    return state;
};

export const Store = createStore((state, action) => {
    const newState = RootReducer(state, action);

    window.localStorage.setItem('state', JSON.stringify(newState));

    return newState;
});
