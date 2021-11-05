import React, {useState, useEffect} from 'react'
import { useParams } from "react-router";
import { Grid, Snackbar, useMediaQuery  } from '@mui/material'
import MuiAlert from '@mui/material/Alert';
import { useTheme } from '@mui/material/styles';
import useButtonState from '../hooks/useButtonState';
import {api} from '../helperFunctions/axiosInstace'
import useDeleteItemState from '../hooks/useDeleteItemState.js';
import MatchView from '../Components/petprofile/MatchView.js';
import PetView from '../Components/petprofile/PetView.js';


// from mui custom styling
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
  
/* Page to edit a Pet information, images, and matches */
const AdminEditPetPage = () => {
    const {pet_id} = useParams()
    // reference to remove column spacing between cards
    const theme = useTheme();
    const mobile = useMediaQuery(theme.breakpoints.up('md')); 
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
    // image state
    const [images, handleImageChange, addImage, deleteImage] = useDeleteItemState([]);
    // matches state
    const [matches, handleMatchChange, addMatch, deleteMatch] = useDeleteItemState([]);
    // get the pet data
    useEffect(() => {
        // only make the request if there is not pet data
        if (!pet.pet_id){
            api.get('/pets/' + pet_id)
            .then( response => {
                // console.log("response data:", response.data)
                var petData = response.data.pet
                petData.setPet = setPet
                petData.snackBar = handleOpen
                setPet(petData)
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
        <Grid 
            container
            direction="row"
            justifyContent="center"
            alignItems="stretch"
            sx={{margin:'auto !important', maxWidth: 1400}} 
            columnSpacing={{ md: mobile ? 1 : 0 }}>
            
            {/* Left side Matches card */}
            <MatchView
                buttonClicked={buttonClicked}
                handleButtonChange={handleButtonChange}
                matches={matches} 
                addMatch={addMatch} 
                deleteMatch={deleteMatch}
                snackBar={handleOpen}/>
          
            {/* Right side edit profile card */}
            <PetView 
                buttonClicked={buttonClicked}
                handleButtonChange={handleButtonChange}
                pet={pet} 
                images={images}
                addImage={addImage}
                deleteImage={deleteImage}/>

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
