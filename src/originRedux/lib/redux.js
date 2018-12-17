/**
 * @since 2018-12-13 17:34
 * @author pengyumeng
 */

const createStore = (reducer) => {
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

export {
    createStore,
};
