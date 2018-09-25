import {createStore} from 'redux';
import {conceptItems} from './concept-items';

const persistedState = JSON.parse(window.localStorage.getItem('state'));

const InitialState = persistedState ? {
    ...persistedState,
    conceptItems: Object.entries(conceptItems).reduce((result, conceptItemEntry) => {
        const conceptItemKey = conceptItemEntry[0];
        const conceptItemValue = conceptItemEntry[1];

        return {
            ...result,
            [conceptItemKey]: {
                ...conceptItemValue,
                questions: Object.entries(conceptItemValue.questions).reduce((result, questionEntry) => {
                    const questionKey = questionEntry[0];
                    const questionValue = questionEntry[1];

                    if (
                        persistedState.conceptItems[conceptItemKey] &&
                        persistedState.conceptItems[conceptItemKey].questions[questionKey]
                    ) {
                        return {
                            ...result,
                            [questionKey]: {
                                ...questionValue,
                                userCompleted: persistedState.conceptItems[conceptItemKey].questions[questionKey].persistedState
                            }
                        };
                    }
                    else {
                        return result;
                    }
                }, conceptItemValue.questions)
            }
        };
    }, conceptItems)
} : {
    currentConceptItem: 'primitive-data-types-concept-item',
    currentQuestionId: 1,
    conceptItems
};

const RootReducer = (state=InitialState, action) => {
    if (action.type === 'SET_INITIAL_CURRENT_QUESTION') {
        return {
            ...state,
            currentQuestion: state.conceptItems[state.currentConceptItem].questions[state.currentQuestionId]
        };
    }

    if (action.type === 'SET_NEW_CURRENT_QUESTION') {
        return {
            ...state,
            currentConceptItem: action.level1ID,
            currentQuestion: state.conceptItems[action.level1ID].questions[action.level2ID]
        };
    }

    if (action.type === 'SET_USER_COMPLETED') {
        return {
            ...state,
            conceptItems: {
                ...state.conceptItems,
                [state.currentConceptItem]: {
                    ...state.conceptItems[state.currentConceptItem],
                    questions: {
                        ...state.conceptItems[state.currentConceptItem].questions,
                        [state.currentQuestionId]: {
                            ...state.conceptItems[state.currentConceptItem].questions[state.currentQuestionId],
                            userCompleted: action.correct
                        }
                    }
                }
            }
        };
    }

    if (action.type === 'NEXT_QUESTION') {
        const newCurrentQuestionId = state.currentQuestionId < Object.values(state.conceptItems[state.currentConceptItem].questions).length ? state.currentQuestionId + 1 : state.currentQuestionId;

        return {
            ...state,
            currentQuestion: state.conceptItems[state.currentConceptItem].questions[newCurrentQuestionId],
            currentQuestionId: newCurrentQuestionId
        };
    }

    if (action.type === 'PREVIOUS_QUESTION') {
        const newCurrentQuestionId = state.currentQuestionId > 1 ? state.currentQuestionId - 1 : state.currentQuestionId;

        return {
            ...state,
            currentQuestion: state.conceptItems[state.currentConceptItem].questions[newCurrentQuestionId],
            currentQuestionId: newCurrentQuestionId
        };
    }

    return state;
};

export const Store = createStore((state, action) => {
    const newState = RootReducer(state, action);

    window.localStorage.setItem('state', JSON.stringify(newState));

    return newState;
});
