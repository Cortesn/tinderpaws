import React from 'react'
import { Box, Fab, Grid } from '@mui/material'
import ChatIcon from '@mui/icons-material/Chat';
import PetProfile from './PetProfile.js'


const PetView = (props) => {
    const {buttonClicked, handleButtonChange, pet, images, addImage, deleteImage} = props;
    return (
        <Grid 
            item 
            xs={12} sm={12} md={6} lg={4} 
            sx={{ 
                display: { xs: buttonClicked ? 'none':'block', md: 'block' },
                maxWidth: '650px'
                }}>

            {/* view matches in mobile */}
            {/* maybe put this in the nav bar and have it be fixed */}
            <Box sx={{ 
                    '& > :not(style)': { m: 1 } , 
                    display: {xs: 'block' , md: 'none'} 
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
                images={images}
                addImage={addImage}
                deleteImage={deleteImage}/>
        </Grid>
    )
}

export default PetView

