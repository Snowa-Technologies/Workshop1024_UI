import { addPromotionActions, getCampaignNamesActions} from "../actions/actions";
const addPromotionState = {// State for addNewCampaign
    newPromotion : {},
    generalError: ""
};
const campaignNamesState = {
    campaignNames : [],
    generalError : ""
};
 
/***
 * Reducer to handle to addNewCampaign
 */
export const addPromotionReducer = (state = addPromotionState, action) => {
    switch(action.type){
        case addPromotionActions.ADD_PROMOTION_SUCCESS:
            return{
                ...state,
                newPromotion: action.payload,
                generalError:""
            }
        case addPromotionActions.ADD_PROMOTION_FAILURE:
            return{
                ...state,
                newPromotion : {},
                generalError : action.payload
            }
        case addPromotionActions.RESET_PROMOTION_STATE:
            return{
                ...state,
                newPromotion : {}
            }
        default:
            return state;
    }
};
/***
 * Reducer to get campaign names
 */
export const campaignNamesReducer = (state = campaignNamesState, action) => {
    switch(action.type){
        case getCampaignNamesActions.GET_CAMPAIGN_NAMES_SUCCESS:
            return{
                ...state,
                campaignNames: action.payload,
                generalError:""
            }
        case getCampaignNamesActions.GET_CAMPAIGN_NAMES_FAILURE:
            return{
                ...state,
                campaignNames : [],
                generalError : action.payload
            }
        default:
            return state;
    }
};
