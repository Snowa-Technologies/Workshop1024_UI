import axios from 'axios';
import { GLOBALS } from "../../global";
import {getStatisticsActions} from './actions';

// Dashboard statistics success response
export const statisticsDataSuccess = (response) => {
    return { type: getStatisticsActions.GET_STATISTICS_SUCCESS, payload: response };
}

// Dashboard statistics success response
export const statisticsDataFailure = (error) => {
    return { type: getStatisticsActions.GET_STATISTICS_FAILURE, payload: error };
}

//Authenticate user login
export const getStatisticsData = () => {
    return function(dispatch) {
        axios.get(GLOBALS.api_statistics).then(response => {
            dispatch(statisticsDataSuccess(response.data));
        })
        .catch(error => {
            dispatch(statisticsDataFailure(error));   
        });;
    }
}