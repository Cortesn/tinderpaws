import React from 'react';
import { Drawer, IconButton, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import MenuDrawerItems from './MenuDrawerItems.js'


const MobileMenu = (props) => {
    const {account, anchor, state, toggleDrawer} = props
    
    const theme = useTheme();
    const sm = useMediaQuery(theme.breakpoints.up('sm')); 

    return(
        <React.Fragment key={anchor}>
            <IconButton onClick={toggleDrawer(anchor, true)}>
                <MenuIcon sx={{color:'white'}}/>
            </IconButton>
            <Drawer
                sx={{'.MuiDrawer-paper': {
                        width: sm ? 250: '100% ! important'
                    },
                    display: { sm: 'flex', md: 'none' }
                }}
                anchor={anchor}
                open={state[anchor]}
                onClose={toggleDrawer(anchor, false)}>
                {MenuDrawerItems(anchor, toggleDrawer, account)}
            </Drawer>
        </React.Fragment>
    )
}

export default MobileMenu;