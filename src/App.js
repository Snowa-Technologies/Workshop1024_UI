import './sass/App.scss';
import "./css/main.css";
import React, { Suspense, useEffect, useState } from 'react';
import { AppBar, Box, CssBaseline, Toolbar } from '@mui/material';
import { useSelector } from 'react-redux';
import data from '../src/data/orgdata.json';

// Lazy load components
const Header = React.lazy(() => import('./elements/layout/general/Header'));
const SnowaSidebar = React.lazy(() => import('./elements/layout/general/SnowaSidebar'));
const LoginPage = React.lazy(() => import('../src/elements/Login/LoginPage'));


function App() {
  const [orgDetails, setOrgDetails] = useState(null);

  const isAuthenticated = useSelector(state => state.authUserDataReducer.isAuthenticated);
  //const isAuthenticated = false;
  const userData = useSelector(state => state.authUserDataReducer.authUser);
 
  useEffect(() => {
    console.log("App page called");
    if(Object.keys(userData).length > 0){
      const matchedRecord = data.subdomains.find(
        (record) => record.sdname === userData.session.orgId
      );
      setOrgDetails(matchedRecord);
    }
  },[userData])

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }} className="app-main-header">
       <Suspense fallback={<div>Loading...</div>}>
      {isAuthenticated ? (
        <>
          <CssBaseline />
          <AppBar position="fixed" className='app-bar' sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} >
            <Toolbar className='tool-bar'>
              <Header position="fixed" orgDetails={orgDetails} userName ={userData.session.uname}></Header>
            </Toolbar>
          </AppBar>
          <Toolbar /> 
          <Box className="main-content-box">
          <SnowaSidebar/>
        </Box>
        </>
      ) : (<LoginPage/>)}
      </Suspense>
    </Box>
  );
}

export default App;