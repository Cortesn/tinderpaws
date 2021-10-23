import React from 'react'
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Avatar, Link} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import UserSignupForm from '../forms/UserSignupForm';


const UserTab = () => {
    return (
        <>
            <Avatar sx={{margin:'auto'}}>
                <PersonIcon/>
            </Avatar>
            <Typography variant='subtitle1' sx={{textAlign: 'center'}}>Please complete this form to create a new user account!</Typography>
            <Grid item sx={{textAlign:'center'}}>
                <Link href='/login' underline='none' color='primary'>Already have an account?</Link>
            </Grid>
            <UserSignupForm/>
        </>
    )
}

export default UserTab