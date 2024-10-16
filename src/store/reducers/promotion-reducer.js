import { addPromotionActions, getCampaignNamesActions, getPromotionsActions} from "../actions/actions";
const addPromotionState = {// State for addNewCampaign
    newPromotion : {},
    generalError: ""
};
const campaignNamesState = {
    campaignNames : [],
    generalError : ""
};
const getPromotionsState = { // state for fetching allPromotions
    promotions : [],
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
/***
 * Reducer to fetch allPromotions
 */
export const getPromotionsReducer = (state = getPromotionsState, action) => {
    switch(action.type){
        case getPromotionsActions.GET_PROMOTIONS_SUCCESS:
            return{
                ...state,
                promotions: action.payload,
                generalError:""
            }
        case getPromotionsActions.GET_PROMOTIONS_FAILURE:
            return{
                ...state,
                promotions : [],
                generalError : action.payload
            }
        default:
            return state;
    }
};