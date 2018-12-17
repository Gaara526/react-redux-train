/**
 * @since 2018-12-14 10:35
 * @author pengyumeng
 */

export const createStore = (reducer) => {
    let state;
    const listeners = [];
    const getState = () => state;
    const dispatch = (action) => {
        state = reducer(state, action);
        listeners.forEach((listener) => listener());
    };
    const subscribe = (listener) => listeners.push(listener);
    dispatch({});

    return {
        getState,
        dispatch,
        subscribe,
    };
};

export const combineReducers = (reducers) => {
    const reducerKeys = Object.keys(reducers);
    return (state = {}, action) => {
        const nextState = {};
        for (let i = 0; i < reducerKeys.length; i++) {
            const key = reducerKeys[i];
            const reducer = reducers[key];
            nextState[key] = reducer(state[key], action);
        }
        return {
            ...state,
            ...nextState,
        };
    };
};
