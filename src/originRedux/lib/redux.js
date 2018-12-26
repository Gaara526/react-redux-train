/**
 * @since 2018-12-13 17:34
 * @author pengyumeng
 */

const createStore = (reducer) => {
    let state;
    const getState = () => state;

    const listeners = [];
    const subscribe = (listener) => listeners.push(listener);

    const dispatch = (action) => {
        state = reducer(state, action);
        listeners.forEach((listener) => listener());
    };

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
