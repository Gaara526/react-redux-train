/**
 * @since 2018-12-17 16:58
 * @author pengyumeng
 */

const thunk = (store) => (dispatch) => {
    return (action) => {
        if (typeof action === 'function') {
            action(store.dispatch, store.getState);
        }
        dispatch(action);
    };
};

export {
    thunk,
};
