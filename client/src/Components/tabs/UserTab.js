import React from 'react'
import { Avatar, Link, Grid, Typography} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import FormTemplate from '../forms/FormTemplate';
import { FormInputs } from '../forms/FormInputs';

const UserTab = () => {
    const initData = {
        fname: '',
        lname:'',
        email: '',
        password: '',
        passwordConfirm: ''
    }
    return (
        <>
            <Avatar sx={{margin:'auto'}}>
                <PersonIcon/>
            </Avatar>
            <Typography variant='subtitle1' sx={{textAlign: 'center'}}>Please complete this form to create a new user account!</Typography>
            <Grid item sx={{textAlign:'center'}}>
                <Link href='/login' underline='none' color='primary'>Already have an account?</Link>
            </Grid>
            <FormTemplate 
                form={FormInputs} 
                type={'user'} 
                button={'Signup'}
                data= {initData}/>
        </>
    )
}

export default UserTab