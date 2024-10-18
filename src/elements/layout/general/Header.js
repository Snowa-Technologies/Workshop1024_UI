import React, { useState } from 'react';
import {IMAGES, SCHOOL_LOGOS} from '../../../constants/Theme';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';

function Header({orgDetails, userName}) {

    const logos = SCHOOL_LOGOS;
    const findLogo = (logos) => {
        if(orgDetails){
            for(const item of Object.keys(logos)){
                if(item === orgDetails.logo){
                    return logos[item];
                }
            }
        }
    }
    const [showLogo] = useState(true);

    return (
        <div id="main-screen-header">
            <div className={`logo header-left ${showLogo ? 'open' : 'close'}`}>
                <a>
                    <div main-title='SnowaBot'>
                        <img src={IMAGES.SnowaBotLogo} alt = "Logo"  title="SnowaBot Admin"></img>
                    </div>
                </a>
            </div>
            <div className='header-right'>
                
                <div className='search'>
                    <div className='menu'>
                        <IconButton size="large" edge="start" color="inherit" className='menu-icon'>
                            <MenuIcon style={{ fontSize:35}}/>
                        </IconButton>
                    </div>
                    <div className='school-logo'>
                        <img src={findLogo(logos)} alt = "logos"  title={orgDetails ? orgDetails.oname : ''}>
                        </img>
                        <label className='school-title'>{orgDetails ? orgDetails.oname : ''}</label>
                    </div>
                </div>

                <div className='controls'>
                    <IconButton size="large" aria-label="show 4 new mails" color="inherit" className='control-icon'>
                        <Badge badgeContent={4} color="error">
                            <MailIcon style={{ fontSize: 30 }} />
                        </Badge>
                    </IconButton>
                    <IconButton size="large" aria-label="show 17 new notifications" color="inherit" className='control-icon notifications'>
                        <Badge badgeContent={17} color="error">
                            <NotificationsIcon  style={{ fontSize: 30 }} />
                        </Badge>
                    </IconButton>
                </div>

                <div id="loggedInuser">
                    <div className="name">Hello <strong>{userName} !!</strong></div>
                    <div className="userpic" title="you">
                        <img src={IMAGES.PersonAvathar} alt = "valid person" className='userIcon' ></img>
                    </div>
                </div>
            </div>
        </div>
    );
    
}

export default Header;