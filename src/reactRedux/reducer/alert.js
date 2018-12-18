/**
 * @since 2018-12-14 10:42
 * @author pengyumeng
 */

import actions from '../actions';

const initialState = {
    showAlert: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case actions.alert.TOGGLE_ALERT:
            return {
                ...state,
                showAlert: !state.showAlert,
            };
        default:
            return state;
    }
};
