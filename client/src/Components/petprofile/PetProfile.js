import React from 'react'
import { Box, Card, Paper, Stack, Typography, Toolbar, Grid } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import PetProfileImages from './PetProfileImages'
import FormTemplate from '../forms/FormTemplate'

/* Returns the 'right side' card for the Pet Images and update form */
const PetProfile = (props) => {
    const {pet, images, addImage, deleteImage} = props;
    return (
        <Card sx={{maxWidth: '600px', margin: 'auto !important'}}>
            <Paper elevation={10}  >
                <Stack
                    direction="column"
                    justifyContent="flex-start"
                    alignItems="center"
                    spacing={2}>
                    {/* all images of a pet */}
                    <PetProfileImages 
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
    )
}

export default PetProfile
