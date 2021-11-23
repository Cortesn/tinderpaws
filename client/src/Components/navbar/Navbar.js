/*
A responsive Navbar with a slideout drawer menu
referenced MUI Appbar: https://mui.com/components/app-bar/#app-bar-with-a-primary-search-field
referenced MUI Drawer: https://mui.com/components/drawers/#temporary-drawer  
*/

import React from 'react';
import { Link } from 'react-router-dom'
import { 
    AppBar, 
    Box, 
    Toolbar, 
    IconButton, 
    Typography, 
    MenuItem, 
    Menu} from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import PetsIcon from '@mui/icons-material/Pets';
import LogoutIcon from '@mui/icons-material/Logout';
import MobileMenu from './MobileMenu.js'
import NavLink from './NavLink.js';
import useNavbarState from '../../hooks/useNavbarState.js'

export default function Navbar(props) {
    const {account} = props
    // drawer state and toggle
    const anchor = 'right';
    const [state, toggleDrawer] = useNavbarState({[anchor]:false});

    // ==== for the account menu popper ====
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        // Main navbar items
        <Box sx={{ flexGrow: 2 , paddingBottom:'20px'}}>
            <AppBar style={{backgroundColor: '#467eac'}} position="static" >
                <Toolbar >
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{ mr: 2 }}
                        id="nav_home"
                        component={Link}
                        to="/">
                        <PetsIcon sx={{ fontSize: "2rem" }}/>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ display: { md: 'block' } }}>
                            Tinder Paws
                        </Typography>
                    </IconButton>

                    <Box sx={{ display: { xs: 'none', sm: 'none', md: 'flex' } }}>
                        <NavLink name={'Mission'} id="nav_mission" link={'/mission'} />
                        
                        {/* displays the "News feed" */}
                        { account.shelter_id || account.employee_id || account.user_id ?
                            <NavLink name={'News'} id="nav_news" link={'/news'} />
                        : null }

                        {/* displays the "Pets button to view available pets" */}
                        { account.user_id ?
                            <NavLink name={'Pets'} id="nav_pet" link={'/userHome'}/>
                        : null }

                        {/* displays the "page to manage shelter pets */}
                        { account.employee_id || account.shelter_id ?
                            <NavLink name={'Manage'} id="nav_admin" link={'/adminHome'} />
                        : null }

                        {/* displays the "page to manage shelter employees" */}
                        {/* { account.shelter_id ?
                            <NavLink name={'Admin'} link={'/'} />
                        : null } */}
                    </Box>

                    {/* divider */}
                    <Box sx={{ flexGrow: 1 }} />
                    {/* login/signup */}
                    {account.isAuth ?
                        <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                            <Typography component="div" sx={{display: 'inline-block'}}>
                            {account.email}
                            </Typography>
                            
                            <IconButton
                                component={Link}
                                size="large"
                                edge="end"
                                aria-label="logout current user"
                                color="inherit"
                                id="signout"
                                to='/signout'>  
                                <LogoutIcon />
                            </IconButton>
                        </Box>
                    :
                        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                            <IconButton
                                size="large"
                                edge="end"
                                color="inherit"
                                id="navbar-menu-popper"
                                aria-expanded={open ? 'true' : undefined}
                                aria-haspopup="true"
                                onClick={handleClick}>
                                <AccountCircle />
                            </IconButton>

                            <Menu
                                id="account-menu"
                                aria-labelledby="account-menu-options"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose} >
                                <MenuItem 
                                    id="signup"
                                    component={Link}
                                    to='/signup'
                                    onClick={handleClose}>
                                    Create an Account
                                </MenuItem>
                                <MenuItem 
                                    component={Link}
                                    id="signin"
                                    to='/signin'
                                    onClick={handleClose}>
                                    Sign in
                                </MenuItem>
                            </Menu>
                        </Box>
                    }        
                    
                    {/* render mobile menu */}
                    <Box sx={{ display: { sm: 'flex', md: 'none' } }}>
                        <MobileMenu 
                            account={account}
                            anchor={anchor}
                            state={state}
                            toggleDrawer={toggleDrawer}/>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
