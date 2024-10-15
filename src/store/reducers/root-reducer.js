import { combineReducers } from "redux"
import {authUserDataReducer} from './auth-reducer';
import {addNewCampaignReducer, getCampaignsReducer} from './campaign-reducer';

export const rootReducer = combineReducers({
    authUserDataReducer,
    addNewCampaignReducer,
    getCampaignsReducer
});