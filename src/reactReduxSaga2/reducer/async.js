/**
 * @since 2018-12-18 10:34
 * @author pengyumeng
 */

import actions from '../actions';

const initialState = {
    data: null,
    data2: null,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case actions.async.RECEIVE_DATA:
            return {
                ...state,
                data: action.payload,
            };
        case actions.async.RECEIVE_DATA2:
            return {
                ...state,
                data2: action.payload,
            };
        default:
            return state;
    }
};
