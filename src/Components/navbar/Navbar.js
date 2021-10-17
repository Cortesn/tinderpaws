/*
A responsive Navbar with a slideout drawer menu
referenced MUI Appbar: https://mui.com/components/app-bar/#app-bar-with-a-primary-search-field
referenced MUI Drawer: https://mui.com/components/drawers/#temporary-drawer  
*/

import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import AccountCircle from '@mui/icons-material/AccountCircle';
import PetsIcon from '@mui/icons-material/Pets';
import MobileMenu from './MobileMenu.js'


export default function Navbar() {
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
                    {/* divider */}
                    <IconButton
                        size="small"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2, display: { xs: 'none', sm: 'block' } }}
                        href='/mission'>
                        <Typography component="div" sx={{ flexGrow: 1 }}>
                            Mission
                        </Typography>
                    </IconButton>
                    <IconButton
                        size="small"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2, display: { xs: 'none', sm: 'block' } }}
                        href='/about'>
                        <Typography component="div" sx={{ flexGrow: 1 }}>
                            About
                        </Typography>
                    </IconButton>
                    {/* divider */}
                    <Box sx={{ flexGrow: 1 }} />
                    {/* login/signup */}
                    <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
                        <IconButton
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            color="inherit"
                            href='/signup'>
                            <AccountCircle />
                        </IconButton>
                    </Box>
                    {/* render mobile menu */}
                    <Box sx={{ display: { xs: 'flex', sm: 'none' } }}>
                        <MobileMenu/>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
}