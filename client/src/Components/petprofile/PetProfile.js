import React from 'react'
import { Card, Paper, Stack, Typography, Grid } from '@mui/material';
import PetProfileImages from './PetProfileImages'
import FormTemplate from '../forms/FormTemplate'

/* Returns the 'right side' card for the Pet Images and update form */
const PetProfile = (props) => {
    const {buttonClicked, handleButtonChange, pet, images, addImage, deleteImage} = props;

    return (
        <Grid 
            item 
            xs={12} sm={12} md={6} lg={4} 
            sx={{ 
                display: { xs: buttonClicked ? 'none':'block', md: 'block' },
                maxWidth: '650px'
                }}>

            <Card sx={{maxWidth: '600px', margin: 'auto !important'}}>
                <Paper elevation={10}  >
                    <Stack
                        direction="column"
                        justifyContent="flex-start"
                        alignItems="center"
                        spacing={2}>
                        {/* all images of a pet */}
                        <PetProfileImages 
                            handleButtonChange={handleButtonChange}
                            pet={pet} 
                            images={images}
                            addImage={addImage}
                            deleteImage={deleteImage}/>
                    
                        {/* dates */}
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                            sx={{width: '90%'}}>
                            <Typography varriant='subtitle1'>created: {pet.date_created}</Typography>
                            <Typography varriant='subtitle1'>updated: {pet.last_updated}</Typography>
                        </Stack>
                    
                        {/* details about a pet */}
                        <div style={{width: '90%', marginBottom: 20}}>
                            <FormTemplate 
                                type={'pet'} 
                                button={'Save Changes'}
                                data={pet}/>
                        </div>
                    </Stack>
                </Paper>
            </Card>
        </Grid>
    )
}

export default PetProfile
