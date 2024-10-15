import React from "react";
import { Box } from "@mui/material";
import {useEffect,useRef} from "react";
import { useDispatch, useSelector } from "react-redux"
import CampaignIcon from '@mui/icons-material/Campaign';
import { FaUsersViewfinder } from "react-icons/fa6";
import StatisticsBox from "./Components/StatisticBox";
import {getStatisticsData} from "../../store/actions/dashboard-action";
import {formatAmount} from "../../global/utils";
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
 
function Dashboard() {
  const dispatch = useDispatch();
  const fetchOnce = useRef(false);

  const dashboardData = useSelector(state =>  state.getDashboardReducer.dashboardData);
  /**
   * Get revenue data to display in dashboard 
   */
  useEffect(() => {
    if (!fetchOnce.current) {
      dispatch(getStatisticsData());
      fetchOnce.current = true;  
    }
  },[dispatch]);

  return (
    <React.Fragment>
      <Box className="dashboard-container">
        <Box className = "dashboard-title">
          <Box className="title">Dashboard</Box>
          <Box className="date">( FY 2024 - 25 )</Box>
        </Box>
        <Box className="dashboard-main">
            <Box className="fee-container" >
              <Box className="fee-subcontainer">
              <React.Fragment>
                  <StatisticsBox mtitle={"Total Campaigns"} stitle={"Total Promotions"} mdata={formatAmount(dashboardData.totalCampaigns)} 
                      sdata={formatAmount(dashboardData.totalPromotions)} icon={<CampaignIcon/>} />
                  <StatisticsBox mtitle={"Total Impressions"} stitle={"Total Clicks"} mdata={formatAmount(dashboardData.totalImpressions)}
                     sdata={formatAmount(dashboardData.totalClicks)} icon={<FaUsersViewfinder/>} />
                </React.Fragment>
              </Box>
            </Box>
          </Box>
      </Box>
    </React.Fragment>
  );
}

export default Dashboard;
