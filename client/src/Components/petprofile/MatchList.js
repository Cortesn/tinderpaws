import React from 'react'
import { 
    Button, 
    Divider, 
    Grid, 
    Paper,
    Typography,
    List,
    Card, 
} from '@mui/material';
import useButtonState from '../../hooks/useButtonState';
import MatchItem from './MatchItem';


/* Returns a compiled list of user matches for a specific pet */
const MatchList = (props) => {
    const {matches, addMatch, deleteMatch, snackBar} = props;
    const [buttonClicked, handleButtonChange] = useButtonState(false);
    // add a listener to check for new matches + addMatch
    // or check for chats with match.user_id

    return (
        <Card sx={{height:'100%'}}>
            <Paper elevation={10} sx={{height: '100%', paddingTop: '1rem'}} >

                {/* Heading */}
                {/* onClick event to hide/show delete buttons */}
                <Button 
                    onClick={handleButtonChange}
                    sx={{textTransform: 'none', display:'inline'}}>
                    {buttonClicked ? 'done': 'edit'}
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
                    {matches.map((match) => (
                            <MatchItem 
                                key={match.match_id} 
                                match={match} 
                                deleteMatch={deleteMatch}
                                buttonClicked={buttonClicked} 
                                snackBar={snackBar}/>   
                            )
                        )
                    }
                </List>
                
            </Paper>
        </Card>
    )
}

export default MatchList;
