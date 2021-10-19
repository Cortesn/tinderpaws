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
import useDeleteItemState from '../../hooks/useDeleteItemState';
import MatchItem from './MatchItem';

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

const rename = tempMatchList.map(user => ({id: user.userId, name: user.name}) )

/* Returns a compiled list of user matches for a specific pet */
const MatchList = () => {

    const [buttonClicked, handleButtonChange] = useButtonState(false);
    const [items, deleteItem] = useDeleteItemState(rename);
    
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
                    {items.map((user) => (
                        <MatchItem 
                            key={user.id} 
                            user={user} 
                            buttonClicked={buttonClicked} 
                            deleteItem={deleteItem}/>   
                    ))}
                </List>
            </Paper>
        </Card>
    )
}

export default MatchList;
