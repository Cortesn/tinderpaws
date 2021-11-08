import React, {useState, useEffect} from 'react'
import { 
    Typography, 
    Avatar, 
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
        <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={1}>

            <Avatar sx={{margin:'auto'}}>
                <PersonIcon/>
            </Avatar>

            <Typography variant='h6'>Sign up</Typography>
            <Typography 
                variant='subtitle1' 
                sx={{textAlign: 'center'}}>
                Complete this form to create a new shelter or employee account!
            </Typography>
            
            <Typography 
                id="signup-acct-exists"
                component='a' 
                align='center'
                href='/signin' 
                sx={{
                    '&:link': { textDecoration: 'none' },
                    '&:visited': { color: '#1976d2' }
                }}>
                Already have an account?
            </Typography>
            
            <FormGroup>
                <Stack direction="row" spacing={1} alignItems="center" justifyContent="center">
                    <Typography>Shelter</Typography>
                        <Switch id="shelter_emp_switch" onChange={toggleForms} />
                    <Typography>Employee</Typography>
                </Stack>
            </FormGroup>

            <div style={{width: '100%', paddingBottom: '24px'}}>
                { shelter ? 
                    <FormTemplate 
                        type={'shelter'} 
                        button={'Sign up'}/> 
                :   <FormTemplate 
                        type={'employee'} 
                        button={'Sign up'}
                        data={{options:options}}/> 
                }
            </div>
        </Stack>
    )
}

export default ShelterTab