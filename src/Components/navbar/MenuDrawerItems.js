import React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';


// mobile slideout drawer menu
export default function MenuDrawerItems(anchor, toggleDrawer){
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
                <ListItem button component='a' href='/signup' key='Signup'>
                    <ListItemText primary='Signup' />
                </ListItem>
            </List>
        </Box>
    )
}