import React, {useState, useEffect} from 'react'
import { 
    Grid, 
    Typography, 
    Avatar, 
    Link, 
    FormGroup, 
    Stack, 
    Switch } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import FormTemplate from '../forms/FormTemplate';
import { formik } from '../forms/FormInputs';
import { api } from "../../helperFunctions/axiosInstace";

const ShelterTab = () => {
    const [shelter, setShelter] = React.useState(true);
    const toggleForms = (event, value) => {
        setShelter(value ? false : true);
        formik.resetForm(); // reset formik data
        // need to also reset password data because its also store in a separate state
    };
    // set options for list of shelters
    const [options, setOptions] = useState([]);

    // get the list of shelters from the database
    useEffect( () => {
        if (shelter && options.length === 0){
            api.get('/forms/shelters')
                .then( response => {
                    // set state here
                    const data = response.data.map(shelter => ({ id: shelter.shelter_id , name: shelter.name }))
                    // console.log(data)
                    setOptions(data)
                })
                .catch( error => {
                    console.log(error)
                })
            }
    })

    return (
<<<<<<< Updated upstream
        <>
=======
        <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={1}
            sx={{maxWidth: '370px', margin: '0 auto'}}>

>>>>>>> Stashed changes
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
                        <Switch onChange={toggleForms} />
                    <Typography>Employee</Typography>
                </Stack>
            </FormGroup>

            { shelter ? <FormTemplate 
                            type={'shelter'} 
                            button={'Signup'}/> 
                        : <FormTemplate 
                            type={'employee'} 
                            button={'Signup'}
                            data={{options:options}}/> }
        </>
    )
}

export default ShelterTab