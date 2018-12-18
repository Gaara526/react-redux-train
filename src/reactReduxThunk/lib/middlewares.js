/**
 * @since 2018-12-17 16:58
 * @author pengyumeng
 */

const thunk = (store) => (dispatch) => (action) => {
    if (typeof action === 'function') {
        return action(store.dispatch, store.getState);
    }
    return dispatch(action);
};

export {
    thunk,
};
