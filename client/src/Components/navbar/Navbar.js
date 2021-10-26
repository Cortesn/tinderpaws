/*
A responsive Navbar with a slideout drawer menu
referenced MUI Appbar: https://mui.com/components/app-bar/#app-bar-with-a-primary-search-field
referenced MUI Drawer: https://mui.com/components/drawers/#temporary-drawer  
*/

import React from 'react';
import {AppBar, Box, Toolbar, IconButton, Typography } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import PetsIcon from '@mui/icons-material/Pets';
import LogoutIcon from '@mui/icons-material/Logout';
import MobileMenu from './MobileMenu.js'
import NavLink from './NavLink.js';

export default function Navbar(props) {
    const {account} = props

    return (
        // Main navbar items
        <Box sx={{ flexGrow: 1 , paddingBottom:'20px'}}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{ mr: 2 }}
                        href="/">
                        <PetsIcon sx={{ fontSize: "2rem" }}/>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ display: { xs: 'block' } }}>
                            Tinder Paws
                        </Typography>
                    </IconButton>
                    
                    <NavLink name={'Mission'} link={'/mission'} />
                    <NavLink name={'About'} link={'/about'} />
                    
                    {/* displays the "News feed" */}
                    { account.shelter_id || account.employee_id || account.user_id ?
                        <NavLink name={'News'} link={'/news'} />
                    : null }

                    {/* displays the "Pets button to view available pets" */}
                    { account.employee_id || account.user_id ?
                        <NavLink name={'Pets'} link={'/user'} />
                    : null }

                    {/* displays the "page to manage shelter pets */}
                    { account.employee_id || account.shelter_id ?
                        <NavLink name={'Manage'} link={'/'} />
                    : null }

                    {/* displays the "page to manage shelter employees" */}
                    { account.shelter_id ?
                        <NavLink name={'Admin'} link={'/'} />
                    : null }
                    
                    {/* divider */}
                    <Box sx={{ flexGrow: 1 }} />
                    {/* login/signup */}
                    <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
                        {account.auth ?
                            <div style={{height: '100%'}}>
                                <Typography component="div" sx={{display: 'inline-block'}}>
                                {account.email}
                                </Typography>
                                
                                <IconButton
                                    size="large"
                                    edge="end"
                                    aria-label="logout current user"
                                    color="inherit"
                                    href='/logout'>
                                        
                                    <LogoutIcon />
                                </IconButton>
                            </div>
                        :
                            <IconButton
                                size="large"
                                edge="end"
                                aria-label="account of current user"
                                color="inherit"
                                href='/login'>
                                <AccountCircle />
                            </IconButton>
                        }        
                    </Box>
                    {/* render mobile menu */}
                    <Box sx={{ display: { xs: 'flex', sm: 'none' } }}>
                        <MobileMenu account={account}/>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
}