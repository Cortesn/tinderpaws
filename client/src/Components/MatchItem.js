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

const MatchItem = (props) => {
    const {editClicked, deleteMatch, name} = props;
    return (
        <>
            <ListItem >
                <ListItemIcon>
                    <PersonIcon />
                </ListItemIcon>
                <ListItemText primary={name} />
                <Collapse orientation="horizontal" in={editClicked}>
                    <IconButton 
                        color='error' 
                        aria-label="delete"
                        sx={{marginRight: '1rem'}}
                        onClick={() => deleteMatch(name)}>
                        <RemoveCircleOutlineIcon />
                    </IconButton>
                </Collapse>  
            </ListItem>
            <Grid xs={10}>
                <Divider variant="inset" component="li" />
            </Grid>
        </>
    )
}

export default MatchItem
