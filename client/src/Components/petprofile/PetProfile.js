import React from 'react'
import PetProfileImages from './PetProfileImages'
import PetInfoForm from '../forms/PetInfoForm';
import { Card, Grid, Paper } from '@mui/material';

/* Returns the 'right side' card for the Pet Images and update form */
const PetProfile = () => {
    return (
        <Card>
            <Paper elevation={10} sx={{}} >
                <Grid xs={12} item>
                    <PetProfileImages />
                </Grid>
                
                <Grid xs={12} item>
                    <PetInfoForm />
                </Grid>
            </Paper>
        </Card>
    )
}

export default PetProfile
