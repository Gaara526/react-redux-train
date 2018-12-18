/**
 * @since 2018-12-18 10:34
 * @author pengyumeng
 */

import actions from '../actions';

const initialState = {
    fetching: false,
    data: null,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case actions.async.REQUEST_DATA:
            return {
                ...state,
                fetching: true,
            };
        case actions.async.RECEIVE_DATA:
            return {
                ...state,
                fetching: false,
                data: action.payload,
            };
        default:
            return state;
    }
};
