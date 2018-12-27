/**
 * @since 2018-12-17 14:46
 * @author pengyumeng
 */

const createStore = (reducer, enhancer) => {
    if (typeof enhancer !== 'undefined') {
        if (typeof enhancer !== 'function') {
            throw new Error('Expected the enhancer to be a function.');
        }
        // 将 enhancer 包装一次 createStore 方法，再调用无 enhancer 的 createStore 方法
        return enhancer(createStore)(reducer);
    }

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

const combineReducers = (reducers) => {
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

const applyMiddleware = (...middleware) => {
    return (innerCreateStore) => (reducer) => {
        const store = innerCreateStore(reducer);

        let dispatch = store.dispatch;
        middleware.forEach((middlewareItem) => {
            dispatch = middlewareItem(store)(dispatch);
        });

        return {
            ...store,
            dispatch,
        };
    };
};

const compose = (...functions) => {
    return functions.reduce((a, b) => (...args) => a(b(...args)));
};

export {
    applyMiddleware,
    combineReducers,
    compose,
    createStore,
};
