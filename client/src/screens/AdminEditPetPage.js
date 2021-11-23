import React, {useState, useEffect} from 'react'
import { useParams } from "react-router";
import { Box, Grid, Snackbar, useMediaQuery, Slide } from '@mui/material'
import MuiAlert from '@mui/material/Alert';
import { useTheme } from '@mui/material/styles';
import useButtonState from '../hooks/useButtonState';
import {api, setToken} from '../helperFunctions/axiosInstace'
import useDeleteItemState from '../hooks/useDeleteItemState.js';
import PetProfile from '../Components/petprofile/PetProfile';
import MatchList from '../Components/petprofile/MatchList';


// from mui custom styling
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
  
/* Page to edit a Pet information, images, and matches */
const AdminEditPetPage = () => {
    const {pet_id} = useParams()
    // reference to remove column spacing between cards
    const theme = useTheme();
    const desktop = useMediaQuery(theme.breakpoints.up('md')); 
    // toggle views in mobile
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
            setToken(localStorage.token)
            api.get('/pets/' + pet_id)
            .then( response => {
                setPet(response.data.pet)
                if (response.data.images) handleImageChange(response.data.images)
                if (response.data.matches) handleMatchChange(response.data.matches)
            })
            .catch( error => {
                console.log("error: ", error)
                // redirect to a 404 page
            })
        } 

        // get the pet breed options
        if (pet.type && !pet.options){
            setToken(localStorage.token)
            api.get('/breeds/', {params: {type: pet.type}})
                .then((response) => {
                    setPet({...pet, 'options': response.data})
                })
        }
    }, [pet.type, handleImageChange, handleMatchChange, pet, pet_id])

    const containerRef = React.useRef(null);

    const matchList = (
        <MatchList
            buttonClicked={buttonClicked}
            handleButtonChange={handleButtonChange}
            matches={matches} 
            addMatch={addMatch} 
            deleteMatch={deleteMatch}
            snackBar={handleOpen}/>
    )

    const petProfile = (
        <PetProfile
            buttonClicked={buttonClicked}
            handleButtonChange={handleButtonChange}
            pet={{
                pet: pet,
                setPet: setPet,
                snackBar: handleOpen
            }} 
            images={images}
            addImage={addImage}
            deleteImage={deleteImage}/>
    )

    return (
        <Grid 
            container
            direction="row"
            justifyContent="center"
            alignItems="stretch"
            sx={{margin:'auto !important', maxWidth: 1400}} 
            columnSpacing={{ md: desktop ? 1 : 0 }}
            ref={containerRef}>
            
            {/* large screen rendering */}
            {desktop ?
                <>
                    {matchList}
                    {petProfile}
                </>
                : null
            }

            {/* transitions */}
            
            {/* Left side Matches card */}
            <Slide direction='right' in={buttonClicked} container={containerRef.current}>
                <Box sx={{ 
                    width: '100%',
                    display: { xs: 'block', md: 'none'}
                }}>
                    {matchList}
                </Box>
            </Slide>
            
            {/* Right side edit profile card */}
            <Slide direction='left' in={!buttonClicked} container={containerRef.current}>
                <Box sx={{ 
                    width: '100%',
                    display: { xs: 'block', md: 'none'}
                }}> 
                    {petProfile}
                </Box>
            </Slide>

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
