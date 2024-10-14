import {autActions } from '../actions/actions';

const authState = {
    authUser : {},
    generalError : '',
    isAuthenticated : false
}

export const authUserDataReducer = (state = authState, action) => {
    switch(action.type) {
        case autActions.GET_AUTH_DATA_SUCCESS:
            return {
                ...state,
                generalError: "success",
                isAuthenticated : true,
                authUser: action.payload
            };
        case autActions.GET_AUTH_DATA_FAILURE:
            return {
                ...state,
                generalError: action.payload,
                authUser: {},
            };
        case autActions.RESET_AUTH_DATA_ERROR:
            return {
                ...state,
                generalError: ''
            }
        default:
            return state;
    }
}