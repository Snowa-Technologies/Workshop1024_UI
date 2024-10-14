import { combineReducers } from "redux"
import {authUserDataReducer} from './auth-reducer';

export const rootReducer = combineReducers({
    authUserDataReducer,
});