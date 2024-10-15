import { getStatisticsActions} from "../actions/actions";

const statisticsState = {// State for addNewCampaign
    dashboardData : {},
    generalError: ""
};

/***
 * Reducer to handle to getCampaigns
 */
export const getDashboardReducer = (state = statisticsState, action) => {
    switch(action.type){
        case getStatisticsActions.GET_STATISTICS_SUCCESS:
            return{
                ...state,
                dashboardData: action.payload,
                generalError:""
            }
        case getStatisticsActions.GET_STATISTICS_FAILURE:
            return{
                ...state,
                dashboardData:{},
                generalError: action.payload
            }
        default:
            return state;
    }
};