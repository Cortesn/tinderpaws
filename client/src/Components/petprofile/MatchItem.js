import React from 'react'
import PersonIcon from '@mui/icons-material/Person';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { 
    Divider, 
    Grid, 
    IconButton, 
    ListItem, 
    ListItemText, 
    ListItemIcon, 
    Collapse 
} from '@mui/material';

/* Returns a single matched user for a pet */
const MatchItem = (props) => {
    const {buttonClicked, deleteItem, user} = props;
    return (
        <>
            <ListItem >

                {/* avatar */}
                <ListItemIcon>
                    <PersonIcon />
                </ListItemIcon>

                {/* user name */}
                <ListItemText primary={user.name} />

                {/* delete button */}
                <Collapse orientation="horizontal" in={buttonClicked}>
                    <IconButton 
                        color='error' 
                        aria-label="delete"
                        sx={{marginRight: '1rem'}}
                        onClick={() => deleteItem(user.id, 'match')}>
                        <RemoveCircleOutlineIcon />
                    </IconButton>
                </Collapse>  
                
            </ListItem>

            {/* separator */}
            <Grid xs={10} item>
                <Divider variant="inset" component="li" />
            </Grid>
        </>
    )
}

export default MatchItem
