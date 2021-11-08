import React from 'react';
import { 
    Box, 
    ListItemIcon, 
    ListItemText, 
    ListItem, 
    Divider, 
    List,
    IconButton } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircle from '@mui/icons-material/AccountCircle';
import CloseIcon from '@mui/icons-material/Close';
import VpnKeyIcon from '@mui/icons-material/VpnKey';

// mobile slideout drawer menu
export default function MenuDrawerItems(anchor, toggleDrawer, account){

    return(
        <Box
            sx={{ width: '100%' }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}>
            <List >
                <ListItem  
                    component='h5' 
                    key='Close' 
                    sx={{'.MuiListItemText-primary':{
                            fontWeight: '900 ! important',
                            fontSize: '1.5rem'
                        }
                    }}>
                    <ListItemText primary='Menu' />
                    <IconButton 
                        component='span' 
                        onClick={toggleDrawer(anchor, false)}
                        color='inherit'>
                        <CloseIcon />
                    </IconButton>
                </ListItem>

                <Divider />

                <ListItem button component='a' href='/' key='Home'>
                    <ListItemText primary='Home' />
                </ListItem>

                <ListItem button component='a' href='/mission' key='Mission'>
                    <ListItemText primary='Mission' />
                </ListItem>

                { account.shelter_id || account.employee_id || account.user_id ?
                <ListItem button component='a' href='/news' key='News'>
                    <ListItemText primary='News' />
                </ListItem>
                : null}

                { account.employee_id || account.user_id ?
                <ListItem button component='a' href='/user' key='Pets'>
                    <ListItemText primary='Pets' />
                </ListItem>
                : null }

                { account.employee_id || account.shelter_id ?
                <ListItem button component='a' href='/adminHome' key='Admin'>
                    <ListItemText primary='Admin' />
                </ListItem>
                : null }

                {/* { account.shelter_id ?
                <ListItem button component='a' href='/' key='Admin'>
                    <ListItemText primary='Admin' />
                </ListItem>
                : null } */}
            </List>

            <Divider />

            <List>
                {account.auth ? 
                    <ListItem button component='a' href='/signout' key='Signout'>
                        <ListItemText primary='Sign out' />
                        <LogoutIcon sx={{paddingRight: '8px'}}/>
                    </ListItem>
                :
                    <>
                        <ListItem button component='a' href='/signup' key='Signup'>
                            <ListItemIcon>
                                <AccountCircle/>
                            </ListItemIcon>
                            <ListItemText primary='Create an Account' />
                        </ListItem>

                        <ListItem button component='a' href='/signin' key='Signin'>
                            
                            <ListItemIcon>
                                <VpnKeyIcon/>
                            </ListItemIcon>
                            <ListItemText primary='Sign in' />
                        </ListItem>
                    </>
                }   
            </List>
        </Box>
    )
}