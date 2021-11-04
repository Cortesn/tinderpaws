import React, {useState, useEffect} from 'react'
import { useParams } from "react-router";
import { Box, Fab, Grid, Snackbar, useMediaQuery  } from '@mui/material'
import MuiAlert from '@mui/material/Alert';
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';
import { useTheme } from '@mui/material/styles';
import MatchList from '../Components/petprofile/MatchList.js'
import PetProfile from '../Components/petprofile/PetProfile.js'
import useButtonState from '../hooks/useButtonState';
import {api} from '../helperFunctions/axiosInstace'
import useDeleteItemState from '../hooks/useDeleteItemState.js';


// from mui custom styling
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
  
/* Page to edit a Pet information, images, and matches */
const AdminEditPetPage = () => {
    const {pet_id} = useParams()
    // reference to remove column spacing between cards
    const theme = useTheme();
    const mobile = useMediaQuery(theme.breakpoints.up('sm')); 
    // FAB in mobile
    const [buttonClicked, handleButtonChange] = useButtonState(false);
    // snackbar alerts
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
    // pet state
    const [pet, setPet] = useState({})
    // console.log(pet)
    // image state
    const [images, handleImageChange, addImage, deleteImage] = useDeleteItemState([]);
    // matches state
    const [matches, handleMatchChange, addMatch, deleteMatch] = useDeleteItemState([]);
    // get the pet data
    useEffect(() => {
        // only make the request if there is not pet data
        if (!pet.pet_id){
            api.get('/pet/' + pet_id)
            .then( response => {
                // console.log("response data:", response.data)
                setPet(JSON.parse(JSON.stringify(response.data.pet)))
                if (response.data.images) handleImageChange(response.data.images)
                if (response.data.matches) handleMatchChange(response.data.matches)
            })
            .catch( error => {
                console.log("error: ", error)
                // redirect to a 404 page
            })
        } 
    })

    return (
        <div style={{width: '100%'}}>
        <Grid 
            container
            direction="row"
            justifyContent="center"
            alignItems="stretch"
            sx={{margin:'auto', maxWidth: 1400}} 
            columnSpacing={{ sm: mobile ? 0.5 : 0 }}>
            
            {/* Left side Matches card */}
            <Grid 
                item 
                xs={12} sm={6} md={5} lg={4}
                sx={{ 
                    display: { xs: buttonClicked ? 'block':'none', sm: 'block' },
                    maxWidth: '650px'
                    }}>
                <Box sx={{ 
                        '& > :not(style)': { m: 1 } , 
                        display: {xs: 'block' , sm: 'none'} 
                        }}>
                    <Fab 
                        sx={{right: 20, position: 'fixed'}}
                        size="small" 
                        color="secondary" 
                        aria-label="match">
                        <CloseIcon onClick={handleButtonChange}/>
                    </Fab>
                </Box>

                <MatchList 
                    // style={{}}
                    matches={matches} 
                    addMatch={addMatch} 
                    deleteMatch={deleteMatch}
                    snackBar={handleOpen}/>              
            </Grid>
            
            {/* Right side edit profile card */}
            <Grid 
                item 
                xs={12} sm={6} md={5} lg={4} 
                sx={{ 
                    display: { xs: buttonClicked ? 'none':'block', sm: 'block' },
                    maxWidth: '650px'
                    }}>

                {/* view matches in mobile */}
                {/* maybe put this in the nav bar and have it be fixed */}
                <Box sx={{ 
                        '& > :not(style)': { m: 1 } , 
                        display: {xs: 'block' , sm: 'none'} 
                        }}>
                    <Fab 
                        sx={{left: 10, top: 50, position: 'fixed', zIndex: 1}}
                        size="small" 
                        color="secondary" 
                        aria-label="match">
                        <ChatIcon onClick={handleButtonChange}/>
                    </Fab>
                </Box>

                <PetProfile 
                    pet={pet} 
                    setPet={setPet}
                    images={images}
                    addImage={addImage}
                    deleteImage={deleteImage}
                    snackBar={handleOpen}/>
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
        </div>
    )
}

export default AdminEditPetPage
