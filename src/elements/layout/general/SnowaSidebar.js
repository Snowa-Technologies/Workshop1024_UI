import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, Drawer } from '@mui/material';
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import { TbLogout } from "react-icons/tb";

import LoginPage from "../../Login/LoginPage";

const Dashboard = React.lazy(() => import('../../Dashboard/Dashboard.js')); 
const Campaign = React.lazy(() => import('../../Campaigns/Campaign.js') );
const Promotion = React.lazy(() => import('../../Promotions/Promotion.js') );

function SnowaSidebar({}) {

    return (

        <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%'}}>
            <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row' }} className="box-fixed">
                <Router>
                    <Box id="main-sidebar" sx={{ display: "flex", width:'100%'}}>
                        <Drawer variant="persistent" anchor="left" className="drawer" open={true} sx={{ flexShrink: 0, '& .MuiDrawer-paper': { position: 'relative' }, }} >
                            <Sidebar className="menu">
                                <Menu>
                                    <MenuItem icon={<GridViewRoundedIcon />}>
                                        <Link to="/">DATAPULSE</Link>  
                                    </MenuItem>
                                    <MenuItem icon={<GridViewRoundedIcon />}>
                                        <Link to="/campaigns">Campaigns</Link>  
                                    </MenuItem>
                                    <MenuItem icon={<GridViewRoundedIcon />}>
                                        <Link to="/">Promotions</Link>  
                                    </MenuItem>
                                    <MenuItem icon={<TbLogout style={{fontSize:'25px'}} />}> Logout </MenuItem>
                                </Menu>
                            </Sidebar>
                        </Drawer>

                        <Box className="drawer-back"></Box>
                        <Box className='main-content' component="main" sx={{width:'100%', flexGrow: 1}}> 
                        <Suspense>
                            <Routes>
                                <Route path="/" element={<Dashboard/>}/> : 
                                <Route path="/campaigns" element={<Campaign />} />
                                <Route path="/promotions" element={<Promotion />} />
                                <Route path="/log" element={<LoginPage/>}/>
                            </Routes>
                            </Suspense>
                        </Box>
                    </Box>
                </Router>
            </Box>
        </Box>
    );

}

export default SnowaSidebar;