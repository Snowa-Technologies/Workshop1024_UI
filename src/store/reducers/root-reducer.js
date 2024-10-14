import { combineReducers } from "redux"
import {authUserDataReducer} from './auth-reducer';
import {addNewCampaignReducer} from './campaign-reducer';
import {addPromotionReducer} from './promotion-reducer';

export const rootReducer = combineReducers({
    authUserDataReducer,
    addNewCampaignReducer,
    addPromotionReducer
});