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


// from mui custom styling
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
  
/* Page to edit a Pet information, images, and matches */
const AdminEditPetPage = () => {
    const {id} = useParams()
    const theme = useTheme();

    // reference to remove column spacing between cards
    const mobile = useMediaQuery(theme.breakpoints.up('sm')); 

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

    const [pet, setPet] = useState({
        breed: null,
        date_created: null,
        description: null,
        disposition_id: null,
        dispositions: [],
        last_updated: null,
        name: null,
        pet_id: null,
        shelter_id: null,
        status: null,
        type: null
    })
    const [matches, setMatches] = useState([])
    // console.log(pet)
    
    useEffect(() => {
        if (!pet.pet_id){
            api.get('/pet/' + id)
            .then( response => {
                console.log("response data:", response.data)
                const petData = response.data.pet
                for (const prop in petData){
                    setPet(pet => ({ ...pet, [prop]:petData[prop] }))
                }
                

                
                
                // setMatches(response.data.matches)
                // clean data 
                // const images = response.data.results.map(image => ({id: image.image_id, url: image.url}))
                // console.log(images)
            })
            .catch( error => {
                console.log("error: ", error)
            })
        } 
    }, [])

    return (
        <Grid 
            container
            justifyContent="center"
            alignItems="stretch"
            sx={{margin:'auto'}} 
            columnSpacing={{ sm: mobile ? 1 : 0 }}>
            
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

                <MatchList 
                    matches={matches} 
                    setMatches={setMatches} 
                    snackBar={handleOpen}/>              
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

                <PetProfile 
                    pet={pet} 
                    setPet={setPet} 
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
    )
}

export default AdminEditPetPage
