/**
 * @since 2018-12-14 10:42
 * @author pengyumeng
 */

import actions from '../actions';

const initialState = {
    number: 0,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case actions.number.INCREMENT:
            return {
                ...state,
                number: state.number + 1,
            };
        case actions.number.DECREMENT:
            return {
                ...state,
                number: state.number - 1,
            };
        case actions.number.CLEAR:
            return {
                ...state,
                number: 0,
            };
        default:
            return state;
    }
};
