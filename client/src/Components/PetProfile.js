import React from 'react'
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


const PetProfile = () => {

    return (
        
        <Grid>
            {/* onClick event to hide/show delete buttons */}
            <Typography 
                sx={{textAlign:'center', padding: '20px 0px 20px'}}>
                (Name of Pet)
            </Typography>
        </Grid>
    )
}

export default PetProfile
