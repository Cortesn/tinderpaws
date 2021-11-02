import React, {useState} from 'react'
import { useParams } from "react-router";
import { Box, Fab, Grid, Snackbar, useMediaQuery  } from '@mui/material'
import MuiAlert from '@mui/material/Alert';
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';
import { useTheme } from '@mui/material/styles';
import MatchList from '../Components/petprofile/MatchList.js'
import PetProfile from '../Components/petprofile/PetProfile.js'
import useButtonState from '../hooks/useButtonState';

// from mui custom styling
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
  
/* Page to edit a Pet information, images, and matches */
const AdminEditPetPage = () => {
    const {id} = useParams()
    const theme = useTheme();

    // reference to remove column spacing between cards
    const matches = useMediaQuery(theme.breakpoints.up('sm')); 

    const [buttonClicked, handleButtonChange] = useButtonState(false);
    const [open, setOpen] = useState(false);
    const [snackMsg, setSnackMsg] = useState({})

    // displaying snackbar
    const handleOpen = (msg) => {
        setSnackMsg(msg)
        setOpen(true)
    }
    // closing snackbar
    const handleClose = (event) => {
        setOpen(false)
    };

    return (
        <Grid 
            container
            justifyContent="center"
            alignItems="stretch"
            sx={{margin:'auto'}} 
            columnSpacing={{ sm: matches ? 1 : 0 }}>
            
            {/* Left side Matches card */}
            <Grid 
                item 
                xs={12} sm={6} md={5} lg={4} xl={3} 
                sx={{ 
                    display: 
                        { xs: buttonClicked ? 'block':'none', sm: 'block' } 
                    }}>
                <Box sx={{ 
                        '& > :not(style)': { m: 1 } , 
                        display: {xs: 'block' , sm: 'none'} 
                        }}>
                    <Fab 
                        size="small" 
                        color="secondary" 
                        aria-label="match">
                        <CloseIcon onClick={handleButtonChange}/>
                    </Fab>
                </Box>

                <MatchList/>              
            </Grid>
            
            {/* Right side edit profile card */}
            <Grid 
                item 
                xs={12} sm={6} md={5} lg={4} xl={3} 
                sx={{ 
                    display: 
                        { xs: buttonClicked ? 'none':'block', sm: 'block' }
                    }}>

                {/* view matches in mobile */}
                <Box sx={{ 
                        '& > :not(style)': { m: 1 } , 
                        display: {xs: 'block' , sm: 'none'} 
                        }}>
                    <Fab 
                        size="small" 
                        color="secondary" 
                        aria-label="match">
                        <ChatIcon onClick={handleButtonChange}/>
                    </Fab>
                </Box>

                <PetProfile id={id} snackBar={handleOpen}/>
            </Grid>

            {/* snackbar alerts */}
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                {snackMsg.success ? 
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    {snackMsg.success}
                </Alert>
                :
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    {snackMsg.error}
                </Alert>
                }
            </Snackbar>
           
            
        </Grid>
    )
}

export default AdminEditPetPage
