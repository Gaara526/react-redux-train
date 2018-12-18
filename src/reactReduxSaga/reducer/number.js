/**
 * @since 2018-12-14 10:42
 * @author pengyumeng
 */

const initialState = {
    number: 0,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return {
                ...state,
                number: state.number + 1,
            };
        case 'DECREMENT':
            return {
                ...state,
                number: state.number - 1,
            };
        case 'CLEAR_NUM':
            return {
                ...state,
                number: 0,
            };
        default:
            return state;
    }
};
