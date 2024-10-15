import React from "react";
import { Box } from "@mui/material";
import {useEffect,useRef} from "react";
import { useDispatch, useSelector } from "react-redux"
import CampaignIcon from '@mui/icons-material/Campaign';
import { FaUsersViewfinder } from "react-icons/fa6";
import StatisticsBox from "./Components/StatisticBox";

function Dashboard() {
  const dispatch = useDispatch();
  const fetchOnce = useRef(false);
  /**
   * Get revenue data to display in dashboard 
   */
  useEffect(() => {
    if (!fetchOnce.current) {
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
                <StatisticsBox mtitle={"Total Campaigns"} stitle={"Total Promotions"} mdata={"5"} sdata={"10"} icon={<CampaignIcon/>} />
                <StatisticsBox mtitle={"Total Impressions"} stitle={"Total Clicks"} mdata={"10,000"} sdata={"1,500"} icon={<FaUsersViewfinder/>} />
              </Box>
            </Box>
          </Box>
      </Box>
    </React.Fragment>
  );
}

export default Dashboard;
