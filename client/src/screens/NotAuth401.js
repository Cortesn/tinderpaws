import React from 'react'
import { Link } from 'react-router-dom'
import { Stack, Typography } from '@mui/material';


const NotAuth401 = () => {
    return (
        <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={2}>

            <Typography variant='h2'>401 Not Authorized</Typography>
            <Typography variant='h6'>Sorry, but you are not authorized to access this page.</Typography>
            <Typography align='center'>
                <Link to='/' 
                    style={{
                        textDecoration: 'none' ,
                        color: '#1976d2' 
                    }}>
                    Back to home page
                </Link>
            </Typography>
            <img src='/assets/images/beagle.png' alt='beagle'/>
            
        </Stack>
    )
}

export default NotAuth401
