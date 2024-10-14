import { addPromotionActions} from "../actions/actions";
const addPromotionState = {// State for addNewCampaign
    newPromotion : {},
    generalError: ""
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