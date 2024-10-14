import {  addNewCampaignActions} from "../actions/actions";
const addNewCampaignState = {// State for addNewCampaign
    newCampaign : {},
    generalError: ""
};

/***
 * Reducer to handle to addNewCampaign
 */
export const addNewCampaignReducer = (state = addNewCampaignState, action) => {
    switch(action.type){
        case addNewCampaignActions.ADD_NEW_CAMPAIGN_SUCCESS:
            return{
                ...state,
                newCampaign: action.payload,
                generalError:""
            }
        case addNewCampaignActions.ADD_NEW_CAMPAIGN_FAILURE:
            return{
                ...state,
                newCampaign:{},
                generalError: action.payload
            }
        case addNewCampaignActions.RESET_NEW_CAMPAIGN_STATE:
            return{
                ...state,
                newCampaign:{}
            }
        default:
            return state;
    }
};