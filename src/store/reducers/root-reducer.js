import { combineReducers } from "redux"
import {authUserDataReducer} from './auth-reducer';
import {addNewCampaignReducer, getCampaignsReducer} from './campaign-reducer';
import { getDashboardReducer } from "./dashboard-reducer";
import {addPromotionReducer, campaignNamesReducer, getPromotionsReducer} from './promotion-reducer';

export const rootReducer = combineReducers({
    authUserDataReducer,
    addNewCampaignReducer,
    getCampaignsReducer,
    getDashboardReducer,
    addPromotionReducer,
    campaignNamesReducer,
    getPromotionsReducer
});