
import axios from "axios";
import {  addPromotionActions } from "./actions";
import { GLOBALS } from "../../global";
/***
 * Action creators for handling success & failure to addNewPromotion
 */
export const addPromotionSuccess = (response) => {
    return { type:addPromotionActions.ADD_PROMOTION_SUCCESS, payload:response};
};
export const addPromotionFailure = (error) => {
    let errorMessage = '';
    if(error.response && error.response.data){
        errorMessage = error.response.data.message || error.response.data.error || "Unknown error occurred";
    }else{
        errorMessage = error.message;
    }
    return { type:addPromotionActions.ADD_PROMOTION_FAILURE, payload:errorMessage};
};
export const resetPromotion = () => {
    return { type:addPromotionActions.RESET_PROMOTION_STATE, payload:""};
};
/***
 * This function is send a post request to addNewPromotion
 */
export const addPromotion = (newPromotion) => {
    return function(dispatch) {
        axios.post(GLOBALS.api_addPromotion, newPromotion).then(response => {
            dispatch(addPromotionSuccess(response.data));
        })
        .catch(error => {
            dispatch(addPromotionFailure(error));
        })
    }
};