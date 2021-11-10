import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import { Avatar, Typography, Stack, Divider} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import FormTemplate from '../forms/FormTemplate';
import GoogleAuth from '../GoogleAuth';


const UserTab = (props) => {
    const initData = {
        fname: '',
        lname:'',
        email: '',
        password: '',
        passwordConfirm: ''
    }
    const [gAlert, setGAlert] = useState({ error: null , success: null })

    return (
        <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={1}>
            <Avatar sx={{margin:'auto'}}>
                <PersonIcon/>
            </Avatar>

            <Stack
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={0}>

                <Typography variant='h6'>Sign up</Typography>
                <Typography align='center' variant='subtitle1'>
                    Complete this form to create a new user account!
                </Typography>
                {/* <Typography 
                    component='a' 
                    align='center'
                    href='/signin' 
                    sx={{
                        '&:link': { textDecoration: 'none' },
                        '&:visited': { color: '#1976d2' }
                    }}>
                    Already have an account?
                </Typography> */}
                <Typography 
                    component={Link} 
                    align='center'
                    to='/signin' 
                    sx={{
                        '&:link': { textDecoration: 'none' },
                        '&:visited': { color: '#1976d2' }
                    }}>Already have an account?
                </Typography>
                
            </Stack>
            
            <FormTemplate 
                {...props}
                gAlert={gAlert}
                type={'user'} 
                button={'Sign up'}
                data= {initData}/>

            <Divider variant="middle" style={{width:'100%', marginTop:20, marginBottom:20}}/>
            {/* google button */}
            <div style={{ marginTop: 0}}>
                <GoogleAuth setGAlert={setGAlert} type={'signup'}/>
            </div>
        </Stack>
    )
}

export default UserTab