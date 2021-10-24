import React from 'react';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import MenuDrawerItems from './MenuDrawerItems.js'
import useNavbarState from '../../hooks/useNavbarState.js'


export default function MobileMenu(props){
    const {user} = props
    // drawer state and toggle
    const [state, toggleDrawer] = useNavbarState({'right':false});
    const anchor = 'right';
    return(
        <React.Fragment key={anchor}>
            <Button onClick={toggleDrawer(anchor, true)}>
                <MenuIcon sx={{color:'white'}}/>
            </Button>
            <Drawer
                anchor={anchor}
                open={state[anchor]}
                onClose={toggleDrawer(anchor, false)}>
                {MenuDrawerItems(anchor, toggleDrawer, user)}
            </Drawer>
        </React.Fragment>
    )
}
