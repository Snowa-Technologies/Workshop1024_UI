import React from "react";
import { Box, Tooltip, Typography, Button } from "@mui/material";
import { BsInfoCircle } from "react-icons/bs";


const StatisticsBox = ({ mtitle, icon }) => {

  return (
    <Box className = "credit-statbox-main">
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
                    <Box className = 'whatsapp-value-main'>
                        <Typography className = "box-value">1,00,000</Typography>
                        <Typography className = "msg-name-style">Messages</Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
        <Button className = 'button-style'>Purchase</Button>
    </Box>
  );
};

export default StatisticsBox;
