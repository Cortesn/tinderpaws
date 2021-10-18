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
    const tempMatchList = [
        {
            userId: 1,
            name:'John Smith'
        }, 
        {
            userId: 2,
            name: 'Jane Doe'
        }, 
        {
            userId: 3,
            name:'Test User 1'
        }, 
        {
            userId: 4,
            name: 'Test User 2'
        }
    ];
    const [matches, deleteMatch] = useMatchState(tempMatchList);

    return (
        <Grid sx={{paddingTop: '1rem'}} item>
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
            <Grid xs={11} item>
                <Divider variant='middle' sx={{paddingBottom: '.5rem'}}/>
            </Grid>

            {/* List of matched users */}
            <List> 
                {/* iterate through list of users */}
                {matches.map((user) => (
                    <MatchItem 
                        key={user.userId} 
                        user={user} 
                        editClicked={editClicked} 
                        deleteMatch={deleteMatch}/>   
                ))}
            </List>
        </Grid>
    )
}

export default MatchList;
