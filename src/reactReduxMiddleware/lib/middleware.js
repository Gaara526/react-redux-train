/**
 * @since 2018-12-17 16:58
 * @author pengyumeng
 */

// 只打印出 action
const loggerAction = (store) => (dispatch) => (action) => {
    console.log('action: ', action);
    dispatch(action);
};

// 只打印出更新前后的 state
const loggerState = (store) => (dispatch) => (action) => {
    console.log('current state: ', store.getState());
    dispatch(action);
    console.log('next state', store.getState());
};

export {
    loggerAction,
    loggerState,
};
