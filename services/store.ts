import {createStore} from 'redux';
import {questions} from './questions';

const InitialState = {
    currentQuestion: questions['primitive-data-types-concept-item']['1'];
};

const RootReducer = (state=InitialState, action) => {
    if (action.type === 'SET_NEW_CURRENT_QUESTION') {
        return {
            ...state,
            currentQuestion: questions[action.level1ID][action.level2ID]
        };
    }

    return state;
};

export const Store = createStore(RootReducer);
