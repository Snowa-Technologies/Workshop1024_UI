
import axios from "axios";
import {  addPromotionActions, getCampaignNamesActions } from "./actions";
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

/***
 * Action creators for handling success & failure to addNewPromotion
 */
export const getCampaignNamesSuccess = (response) => {
    return { type:getCampaignNamesActions.GET_CAMPAIGN_NAMES_SUCCESS, payload:response};
};
export const getCampaignNamesFailure = (error) => {
    return { type:getCampaignNamesActions.GET_CAMPAIGN_NAMES_FAILURE, payload:error};
};

/***
 * This function is to get campaign names
 */
export const getCampaignNames = () => {
    return function(dispatch) {
        axios.get(GLOBALS.api_getcampaignNames).then(response => {
            dispatch(getCampaignNamesSuccess(response.data));
        })
        .catch(error => {
            dispatch(getCampaignNamesFailure(error));
        })
    }
};