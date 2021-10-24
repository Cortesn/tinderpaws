import React from 'react';
import { 
    Box, 
    ListItemIcon, 
    ListItemText, 
    ListItem, 
    Divider, 
    List } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircle from '@mui/icons-material/AccountCircle';


// mobile slideout drawer menu
export default function MenuDrawerItems(anchor, toggleDrawer, account){
    return(
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}>
            <List>
                <ListItem button component='a' href='/mission' key='Mission'>
                    <ListItemText primary='Mission' />
                </ListItem>
                <ListItem button component='a' href='/about' key='About'>
                    <ListItemText primary='About' />
                </ListItem>
            </List>
            <Divider />
            <List>
                {account.auth ? 
                    <ListItem button component='a' href='/logout' key='Logout'>
                        <ListItemText primary='Log Out' />
                        <ListItemIcon>
                            <LogoutIcon/>
                        </ListItemIcon>
                    </ListItem>
                :
                    <ListItem button component='a' href='/login' key='Login'>
                        <ListItemText primary='Login' />
                        <ListItemIcon>
                            <AccountCircle/>
                        </ListItemIcon>
                    </ListItem>
                }   
            </List>
        </Box>
    )
}