import React from 'react'
import MatchList from '../Components/MatchList.js'
import PetProfile from '../Components/PetProfile.js'
import { Grid, Paper } from '@mui/material'


const AdminEditPetPage = () => {
    return (

        <Grid xs={12} sm={10} md={8} lg={7} xl={5} sx={{margin: 'auto'}} >
            <Paper elevation={10} >
                <Grid container direction={'row'}>
                    <Grid item xs={6} sx={{ display: { xs: 'none', sm: 'block' } }}>
                        <MatchList/>              
                    </Grid>
                    <Grid item xs={6} sx={{marginInline:'auto'}}>
                        <PetProfile/>
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    )
}

export default AdminEditPetPage
