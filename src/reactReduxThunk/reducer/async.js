/**
 * @since 2018-12-18 10:34
 * @author pengyumeng
 */

const initialState = {
    fetching: false,
    data: null,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'REQUEST_DATA':
            return {
                ...state,
                fetching: true,
            };
        case 'RECEIVE_DATA':
            return {
                ...state,
                fetching: false,
                data: action.payload,
            };
        default:
            return state;
    }
};
