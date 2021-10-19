import React from 'react'
import MatchList from '../Components/petprofile/MatchList.js'
import PetProfile from '../Components/petprofile/PetProfile.js'
import { Fab, Grid } from '@mui/material'
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Box } from '@mui/system';
import ChatIcon from '@mui/icons-material/Chat';
import useButtonState from '../hooks/useButtonState';


/* Page to edit a Pet information, images, and matches */
const AdminEditPetPage = () => {
    const theme = useTheme();
    // matches = true when breakpoint is > xs
    // removes column spacing between cards
    const matches = useMediaQuery(theme.breakpoints.up('sm')); 

    const [buttonClicked, handleButtonChange] = useButtonState(false);

    // matches ? handleButtonChange: 'none'

    return (
        <Grid 
            container
            justifyContent="center"
            alignItems="stretch"
            sx={{margin:'auto'}} 
            spacing={ matches ? 1 : 0 }>
            
            {/* Left side Matches card */}
            <Grid item xs={12} sm={5} md={4} lg={3} xl={2} sx={{ display: { xs: buttonClicked ? 'block':'none', sm: 'block' } }}>
                <MatchList/>              
            </Grid>
            
            {/* Right side edit profile card */}
            <Grid item xs={12} sm={6} md={5} lg={4} xl={3} sx={{ display: { xs: matches ? handleButtonChange : 'block' } }}>
                {/* view matches in mobile */}
                <Box sx={{ '& > :not(style)': { m: 1 } , display: {xs: 'block' , sm: 'none'} }}>
                    <Fab size="small" color="secondary" aria-label="match">
                        <ChatIcon 
                            onClick={handleButtonChange}/>
                    </Fab>
                </Box>
                <PetProfile/>
            </Grid>
        </Grid>
    )
}

export default AdminEditPetPage
