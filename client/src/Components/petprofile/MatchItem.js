import React from 'react'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { 
    Divider, 
    Grid, 
    IconButton, 
    ListItem, 
    ListItemText, 
    ListItemIcon, 
    Collapse,
    Avatar 
} from '@mui/material';


// from https://mui.com/components/avatars/
function stringToColor(string) {
    let hash = 0;
    let i;
  
    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
  
    let color = '#';
  
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.substr(-2);
    }
    /* eslint-enable no-bitwise */
    return color;
}
  
function stringAvatar(name) {
    return {
        sx: {
            bgcolor: stringToColor(name),
        },
        children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
}

/* Returns a single matched user for a pet */
const MatchItem = (props) => {
    const {match, deleteMatch, buttonClicked, snackBar} = props;
    return (
        <>
            <ListItem >

                {/* avatar */}
                <ListItemIcon>
                    <Avatar {...stringAvatar(match.f_name +' '+ match.l_name)} />
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
