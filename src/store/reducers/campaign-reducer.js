import {  addNewCampaignActions, getCampaignsActions} from "../actions/actions";

const addNewCampaignState = {// State for addNewCampaign
    newCampaign : {},
    generalError: ""
};
const getCampaignsState = {// State for getCampaigns
    campaigns : [],
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

/***
 * Reducer to handle to getCampaigns
 */
export const getCampaignsReducer = (state = getCampaignsState, action) => {
    switch(action.type){
        case getCampaignsActions.GET_CAMPAIGNS_SUCCESS:
            return{
                ...state,
                campaigns: action.payload,
                generalError:""
            }
        case getCampaignsActions.GET_CAMPAIGNS_FAILURE:
            return{
                ...state,
                campaigns:[],
                generalError: action.payload
            }
        default:
            return state;
    }
};