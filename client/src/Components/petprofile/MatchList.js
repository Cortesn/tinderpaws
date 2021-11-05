import React from 'react'
import { 
    Box,
    Fab,
    Button, 
    Divider, 
    Grid, 
    Paper,
    Typography,
    List,
    Card,
    Stack, 
    IconButton
} from '@mui/material';
import PetsIcon from '@mui/icons-material/Pets';
import CloseIcon from '@mui/icons-material/Close';
import useButtonState from '../../hooks/useButtonState';
import MatchItem from './MatchItem';


/* Returns a compiled list of user matches for a specific pet */
const MatchList = (props) => {
    const {buttonClicked, handleButtonChange, matches, addMatch, deleteMatch, snackBar} = props;
    const [editClicked, handleEditChange] = useButtonState(false);
    // add a listener to check for new matches + addMatch
    // or check for chats with match.user_id

    return (
        <Grid 
            item 
            xs={12} sm={12} md={6} lg={4}
            sx={{ 
                display: { xs: buttonClicked ? 'block':'none', md: 'block' },
                maxWidth: '650px'
                }}>
            <Card sx={{height:'100%', maxWidth: '600px', margin: 'auto !important'}}>
                <Paper elevation={10} sx={{height: '100%', paddingTop: '1rem'}} >

                    {/* Heading */}
                    {/* onClick event to hide/show delete buttons */}
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        spacing={2}>

                        <Button 
                            onClick={handleEditChange}
                            sx={{textTransform: 'none'}}>
                            {editClicked ? 'done': 'edit'}
                        </Button>

                        <Typography sx={{display:'inline'}}>
                            Matches
                        </Typography>

                        {/* placeholder div to even out the header */}
                        <Box sx={{ minWidth: 64 }}>
                            <IconButton sx={{ display: {xs: 'block' , md: 'none'} }}>
                                <PetsIcon color="secondary" onClick={handleButtonChange}/>
                            </IconButton>
                        </Box>

                    </Stack>

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
                                    buttonClicked={editClicked} 
                                    snackBar={snackBar}/>   
                                )
                            )
                        }
                    </List>
                    
                </Paper>
            </Card>
        </Grid>
    )
}

export default MatchList;
