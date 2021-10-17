import React from 'react'
import PersonIcon from '@mui/icons-material/Person';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { 
    Button, 
    Divider, 
    Grid, 
    IconButton, 
    ListItem, 
    Typography,
    ListItemText, 
    ListItemIcon, 
    List, 
    Collapse 
} from '@mui/material';


const MatchList = () => {
    const [editClicked, setEditClicked] = React.useState(false);

    const handleChange = () => {
        setEditClicked((prev) => !prev);
    };

    // temp list of matched users
    const [matches, setMatches] = React.useState(
        ['John Smith', 'Jane Doe', 'Test User 1', 'Test User 2']);
    
    // deletes a user from the matched list
    const deleteMatch = (name) => {
        setMatches(matches.filter((user) => user != name));
    }

    return (
        <List>
            {/* Heading */}
            <Grid sx={{paddingTop: '1rem'}}>
                {/* onClick event to hide/show delete buttons */}
                <Button 
                    onClick={handleChange}
                    sx={{textTransform: 'none', display:'inline'}}>
                    {editClicked ? 'done': 'edit'}
                </Button>
                <Typography 
                    sx={{textAlign:'center', 
                        display:'inline', 
                        paddingLeft:'4rem'}}>
                    Matches
                </Typography>
                <Grid xs={11} >
                    <Divider variant='middle' sx={{paddingBottom: '1rem'}}/>
                </Grid>
            </Grid>
            
            {/* iterate through list of users */}
            {matches.map((name) => (
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
            ))}
        </List>
    )
}

export default MatchList;
