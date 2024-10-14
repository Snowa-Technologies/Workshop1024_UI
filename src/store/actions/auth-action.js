import axios from 'axios';
import { GLOBALS } from '../../global';
import {autActions} from './actions';

//User authentication data success
export const authDataSuccess = (response) => {
    return { type: autActions.GET_AUTH_DATA_SUCCESS, payload: response };
}
//User authentication data failure
export const authDataFailure = (error) => {
    let errorMessage = '';
    if (error.response && error.response.data) {
        errorMessage = error.response.data || error.response.data.error || "Unknown error occurred"; 
    } else {
        errorMessage = error.message; 
    }
    return { type: autActions.GET_AUTH_DATA_FAILURE, payload: errorMessage };
}
//Reset error occured after trying to authenticate login user
export const resetAuthData = () => {
    return { type: autActions.RESET_AUTH_DATA_ERROR};
}
//Authenticate user login
export const getUserAuthentication = (reqBody) => {
    return function(dispatch) {
        axios.post(GLOBALS.api_login, reqBody, { withCredentials: true }).then(response => {
            dispatch(authDataSuccess(response.data));
        })
        .catch(error => {
            dispatch(authDataFailure(error));   
        });;
    }
}
