import React from 'react'
import { 
    Button, 
    Divider, 
    Grid, 
    Typography,
    List, 
} from '@mui/material';
import useButtonState from '../hooks/useButtonState';
import useMatchState from '../hooks/useMatchsState';
import MatchItem from './MatchItem';


const MatchList = () => {
    const [editClicked, handleChange] = useButtonState(false);

    // temp list of matched users
    const tempMatchList = ['John Smith', 'Jane Doe', 'Test User 1', 'Test User 2'];
    const [matches, deleteMatch] = useMatchState(tempMatchList);

    return (
        <Grid sx={{paddingTop: '1rem'}}>
            {/* Heading */}
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
                <Divider variant='middle' sx={{paddingBottom: '.5rem'}}/>
            </Grid>

            {/* List of matched users */}
            <List> 
                {/* iterate through list of users */}
                {matches.map((name, index) => (
                    <MatchItem name={name} editClicked={editClicked} deleteMatch={deleteMatch}/>   
                ))}
            </List>
        </Grid>
    )
}

export default MatchList;
