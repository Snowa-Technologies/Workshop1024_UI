import React from 'react';
import Login from './Components/Login'
import { Box, Typography } from "@mui/material";
import { IMAGES } from "../../constants/Theme";

const LoginPage = () => {
  return (
    <Box className="login-panel">
        <Box className="logo-box">
           <img className="snowa-image" src={IMAGES.SnowaLogo} alt="Snowa Logo"/>
        </Box>
        <Box className="login-container">
            <Box className="streamline-box">
                <Typography className="title">Streamline your fee collection process and make data driven decisions with ease.</Typography>
                <img className="static-image" src={IMAGES.LoginBannerImage} alt="User Avatar"/>
            </Box>
            <Box className="login-box">
                <img className="snow-logo" src={IMAGES.SnowaBotLogo} alt="SnowaBot Logo"/>
                <Login/>
            </Box>
        </Box>
        <Box className="snowa-footer">
           <Typography className='title'>Privacy Policy</Typography>
            <Typography className='title'>@ Snowa Technologies Pvt Ltd. All rights reserved</Typography>
            <Typography className='title'>Terms & Conditions</Typography>
        </Box>
    </Box>
  )
}

export default LoginPage