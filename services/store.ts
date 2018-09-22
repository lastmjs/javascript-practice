import {createStore} from 'redux';
import {conceptItems} from './concept-items';

const InitialState = {
    currentConceptItem: 'primitive-data-types-concept-item',
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

    if (action.type === 'UPDATE_NUM_USER_COMPLETED_QUESTIONS') {
        const numTotalQuestions = Object.values(state.conceptItems[state.currentConceptItem].questions).length;
        const numUserCompletedQuestions = state.conceptItems[state.currentConceptItem].numUserCompletedQuestions;

        return {
            ...state,
            conceptItems: {
                ...state.conceptItems,
                [state.currentConceptItem]: {
                    ...state.conceptItems[state.currentConceptItem],
                    numUserCompletedQuestions: numUserCompletedQuestions + (action.correct && numUserCompletedQuestions < numTotalQuestions ? 1 : 0)
                }
            }
        };
    }

    return state;
};

export const Store = createStore(RootReducer);
