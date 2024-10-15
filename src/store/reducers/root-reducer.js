import { combineReducers } from "redux"
import {authUserDataReducer} from './auth-reducer';
import {addNewCampaignReducer, getCampaignsReducer} from './campaign-reducer';
import {addPromotionReducer} from './promotion-reducer';

export const rootReducer = combineReducers({
    authUserDataReducer,
    addNewCampaignReducer,
    addPromotionReducer,
    getCampaignsReducer
});