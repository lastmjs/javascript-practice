import {createStore} from 'redux';
import page from 'page';

let persistedState = JSON.parse(window.localStorage.getItem('state'));

if (persistedState && !persistedState.userProgress) {
    window.localStorage.setItem('state', null);
    persistedState = null;
}

const InitialState = persistedState ?  {
    ...persistedState,
    hideGlobalLoadIndicator: false,
    lowerGlobalLoadIndicator: false
} : {
    currentConcept: null,
    currentEntity: 'assessment',
    currentEntityId: 'cjmjovn4p00hi0a58cfsjusdq',
    currentEntityBehavior: 'view',
    currentAssessment: null,
    concepts: [],
    showMainMenu: false,
    userProgress: {},
    hideGlobalLoadIndicator: false,
    lowerGlobalLoadIndicator: false,
    hideLoadIndicator: false,
    lowerLoadIndicator: false
};

const RootReducer = (state=InitialState, action) => {
    if (action.type === 'LOWER_LOAD_INDICATOR') {
        return {
            ...state,
            lowerLoadIndicator: true
        };
    }

    if (action.type === 'HIDE_LOAD_INDICATOR') {
        return {
            ...state,
            hideLoadIndicator: true
        };
    }

    if (action.type === 'LOWER_GLOBAL_LOAD_INDICATOR') {
        return {
            ...state,
            lowerGlobalLoadIndicator: true
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
            currentConcept
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
            hideLoadIndicator: false,
            lowerLoadIndicator: false
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
            hideLoadIndicator: false,
            lowerLoadIndicator: false
        };
    }

    return state;
};

export const Store = createStore((state, action) => {
    const newState = RootReducer(state, action);

    window.localStorage.setItem('state', JSON.stringify(newState));

    return newState;
});
