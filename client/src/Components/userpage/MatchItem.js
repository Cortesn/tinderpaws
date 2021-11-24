import React from 'react'
import { 
    Divider, 
    Grid, 
    ListItem, 
    ListItemText, 
    ListItemIcon, 
    Chip,
    Avatar,
    Collapse,
    IconButton,
} from '@mui/material';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { FaDog, FaCat, FaOctopusDeploy} from "react-icons/fa"
import { indigo, teal, blue } from '@mui/material/colors';


function typeColor(type){
    const dog_color = teal[200];
    const cat_color = indigo[200]
    const other_color = blue[200];
    const arr = [dog_color, cat_color, other_color]
    return arr[type-1]
}

function animalIcon(type){
    const animals = [<FaDog/>, <FaCat/>, <FaOctopusDeploy/>]
    return animals[type-1]
}
function animalType(type){
    const animals = ["Dog", "Cat", "Other"]
    return animals[type-1]
}

function animalStatus(status){
    const statuses = ["Not Available", "Available", "Pending", "Adopted"]
    return statuses[status-1]
}

/* Returns a single matched user for a pet */
const MatchItem = (props) => {
    const {match, unmatch, deleteMatch} = props;
    const matchColor = typeColor(match.type)
    const matchType = animalType(match.type)
    const matchStatus = animalStatus(match.status)
    const matchIcon = animalIcon(match.type)
    return (
        <>
            <ListItem>
                <ListItemIcon
                    sx={{marginRight: '3rem'}}>
                    <Chip avatar={<Avatar>{matchIcon}</Avatar>} label={matchType} variant="outlined"/>
                </ListItemIcon>

                {/* user name */}
                <ListItemText 
                    primary={match.name}
                    sx={{marginLeft: '.75rem', textAlign:"center"}} />

                <ListItemIcon
                    sx={{marginLeft: '3rem'}}>
                    {/* <Button>{matchStatus}</Button> */}
                    <Chip label={matchStatus} color="primary" style={{backgroundColor: matchColor }}/>
                </ListItemIcon>

                {/* delete button */}
                <Collapse orientation="horizontal" in={unmatch}>
                    <IconButton 
                        // id={delete_id}
                        color='error' 
                        aria-label="delete"
                        // sx={{marginRight: '1rem'}}
                        onClick={() => deleteMatch(match.match_id, 'match')}
                        >
                        <RemoveCircleOutlineIcon />
                    </IconButton>
                </Collapse> 
            </ListItem>

            {/* separator */}
            <Grid xs={10} item>
                <Divider variant="inset" component="li" textAlign="center"/>
            </Grid>
        </>
    )
}

export default MatchItem
