/**
 * @since 2018-12-18 10:34
 * @author pengyumeng
 */

import actions from '../actions';

const initialState = {
    data: null,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case actions.async.REQUEST_DATA:
            return {
                ...state,
            };
        case actions.async.RECEIVE_DATA:
            return {
                ...state,
                data: action.payload,
            };
        default:
            return state;
    }
};
