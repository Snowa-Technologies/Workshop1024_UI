import React from "react";
import { Box, Tooltip, Typography } from "@mui/material";
import { BsInfoCircle } from "react-icons/bs";

const StatisticsBox = ({ mtitle, stitle, mdata, sdata, icon }) => {

  return (
    <Box className = "statbox-main">
      <Box className = "statbox-alignment">
        <Box className = "icon-container">{ icon }</Box>
          <Box className="header-container">
            <Box className="title-container">
              <Typography className = "title-header-main">
                <Typography className="box-title" component = "span">{mtitle} </Typography>
                <Tooltip title={mtitle} arrow placement="top">
                  <span className = "icon-main">
                    <BsInfoCircle className = "icon-size" />
                  </span>
                </Tooltip>
              </Typography>
              <Typography className = "box-value total">{mdata}</Typography>
            </Box>
          </Box>
      </Box>
      <Box className="total-value-container">
        <label className="title">{stitle}</label>
        <label className="value">{sdata}</label>
      </Box>
    </Box>
  );
};

export default StatisticsBox;
