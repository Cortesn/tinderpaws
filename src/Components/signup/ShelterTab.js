import React from 'react'
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Avatar, Link, FormGroup, Stack, Switch } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import ShelterSignupForm from '../forms/ShelterSignupForm';
import EmployeeSignupForm from '../forms/EmployeeSignupForm';


const ShelterTab = () => {
    const [shelter, setShelter] = React.useState(true);
    const toggleForms = (event, value) => {
        if (value){
            setShelter(false);
        }else {
            setShelter(true);
        }
    };
    return (
        <>
            <Avatar sx={{margin:'auto'}}>
                <PersonIcon/>
            </Avatar>
            <Typography variant='subtitle1' sx={{textAlign: 'center'}}>Please complete this form to create a new shelter or employee account!</Typography>
            <Grid item sx={{textAlign:'center'}}>
                <Link href='/login' underline='none' color='primary' sx={{textAlign:'center'}}>Already have an account?</Link>
            </Grid>
            
            <FormGroup>
                <Stack direction="row" spacing={1} alignItems="center" justifyContent="center">
                    <Typography>Shelter</Typography>
                        <Switch onChange={toggleForms}/>
                    <Typography>Employee</Typography>
                </Stack>
            </FormGroup>

            { shelter ? <ShelterSignupForm/> : <EmployeeSignupForm/>}
        </>
    )
}

export default ShelterTab
