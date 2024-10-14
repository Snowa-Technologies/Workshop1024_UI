import axios from "axios";
import {  addNewCampaignActions } from "./actions";
import { GLOBALS } from "../../global";
/***
 * Action creators for handling success & failure to addNewCampaign
 */
export const addNewCampaignSuccess = (response) => {
    return { type:addNewCampaignActions.ADD_NEW_CAMPAIGN_SUCCESS, payload:response}
};
export const addNewCampaignFailure = (error) => {
    let errorMessage = '';
    if(error.response && error.response.data){
        errorMessage = error.response.data.message || error.response.data.error || "Unknown error occurred";
    }else{
        errorMessage = error.message
    }
    return { type:addNewCampaignActions.ADD_NEW_CAMPAIGN_FAILURE, payload:errorMessage}
};
export const resetNewCampaign = () => {
    return { type:addNewCampaignActions.RESET_NEW_CAMPAIGN_STATE, payload:""}
};
/***
 * This function is send a post request to addNewCampaign
 */
export const addNewCampaign = (newCampaign) => {
    return function(dispatch) {
        axios.post(GLOBALS.api_addcampaign, newCampaign).then(response => {
            dispatch(addNewCampaignSuccess(response.data))
        })
        .catch(error => {
            dispatch(addNewCampaignFailure(error))
        })
    }
};