/*
A responsive Navbar with a slideout drawer menu
referenced MUI Appbar: https://mui.com/components/app-bar/#app-bar-with-a-primary-search-field
referenced MUI Drawer: https://mui.com/components/drawers/#temporary-drawer  
*/

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import PetsIcon from '@mui/icons-material/Pets';


export default function Navbar() {
    // drawer state and toggle
    const [state, setState] = React.useState({'right':false});

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
        }

        setState({ ...state, [anchor]: open });
    };

    // mobile slideout drawer menu
    const renderMobileMenu = (anchor) =>(
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}>
            <List>
                <ListItem button component='a' href='/mission' key='Mission'>
                    <ListItemText primary='Mission' />
                </ListItem>
                <ListItem button button component='a' href='/about' key='About'>
                    <ListItemText primary='About' />
                </ListItem>
            </List>
            <Divider />
            <List>
                <ListItem button button component='a' href='/signup' key='Signup'>
                    <ListItemText primary='Signup' />
                </ListItem>
            </List>
        </Box>
    );

    const anchor ='right';

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
                        <React.Fragment key={anchor}>
                            <Button onClick={toggleDrawer(anchor, true)}>
                                <MenuIcon sx={{color:'white'}}/>
                            </Button>
                            <Drawer
                                anchor={anchor}
                                open={state[anchor]}
                                onClose={toggleDrawer(anchor, false)}>
                                {renderMobileMenu(anchor)}
                            </Drawer>
                        </React.Fragment>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
