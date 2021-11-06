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
    const {match, deleteMatch, buttonClicked, snackBar} = props;
    return (
        <>
            <ListItem >

                {/* avatar */}
                <ListItemIcon>
                    <PersonIcon />
                </ListItemIcon>

                {/* user name */}
                <ListItemText primary={match.f_name +' '+ match.l_name} />

                {/* delete button */}
                <Collapse orientation="horizontal" in={buttonClicked}>
                    <IconButton 
                        color='error' 
                        aria-label="delete"
                        sx={{marginRight: '1rem'}}
                        onClick={() => deleteMatch(match.match_id, 'match', snackBar)}>
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
