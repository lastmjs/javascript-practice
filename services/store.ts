import {createStore} from 'redux';
// import {conceptItems} from './concept-items';
import {questions} from './questions';

// const persistedState = JSON.parse(window.localStorage.getItem('state'));
const persistedState = null;

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
                                userCompleted: persistedState.conceptItems[conceptItemKey].questions[questionKey].userCompleted
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
    questions,
    currentConcept: 'primitive-data-types',
    currentEntity: 'question',
    currentEntityId: '0',
    currentEntityBehavior: 'view'
};

const RootReducer = (state=InitialState, action) => {

    if (action.type === 'SET_ROUTE') {
        const currentEntity = action.entity;
        const currentEntityId = action.entityId;
        const currentEntityBehavior = action.entityBehavior;
        const currentQuestion = action.entity === 'question' ? state.questions[currentEntityId] : state.currentQuestion;
        const currentConcept = currentQuestion.concept;

        return {
            ...state,
            currentEntity,
            currentEntityId,
            currentEntityBehavior,
            currentQuestion
        };
    }
    
    if (action.type === 'SET_NEW_CURRENT_CONCEPT') {
        return {
            ...state,
            currentConcept: action.concept,
            // currentQuestion: state.questions['0'],
            // currentQuestionId: 0
        };
    }

    if (action.type === 'SET_USER_COMPLETED') {
        if (action.correct === true) {
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
        else {
            return state;
        }
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

    // window.localStorage.setItem('state', JSON.stringify(newState));

    return newState;
});
