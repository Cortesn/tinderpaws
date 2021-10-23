import React from 'react'
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
import { FormInputs, formik } from '../forms/FormInputs';


const ShelterTab = (props) => {
    const {options} = props;
    const [shelter, setShelter] = React.useState(true);
    const toggleForms = (event, value) => {
        setShelter(value ? false : true);
        formik.resetForm(); // reset formik data
        // need to also reset password data because its also store in a separate state
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
                        <Switch onChange={toggleForms} />
                    <Typography>Employee</Typography>
                </Stack>
            </FormGroup>

            { shelter ? <FormTemplate 
                            form={FormInputs} 
                            type={'shelter'} 
                            button={'Signup'}/> 
                        : <FormTemplate 
                            form={FormInputs} 
                            type={'employee'} 
                            options={options}
                            button={'Signup'}/> }
        </>
    )
}

export default ShelterTab