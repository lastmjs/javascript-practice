import {createStore} from 'redux';
import {conceptItems} from './concept-items';

const InitialState = {
    currentQuestion: conceptItems['primitive-data-types-concept-item'].questions['1'],
    conceptItems
};

const RootReducer = (state=InitialState, action) => {
    if (action.type === 'SET_NEW_CURRENT_QUESTION') {
        return {
            ...state,
            currentQuestion: state.conceptItems[action.level1ID].questions[action.level2ID]
        };
    }

    return state;
};

export const Store = createStore(RootReducer);
