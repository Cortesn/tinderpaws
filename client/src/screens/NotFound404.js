import React from 'react'
import { Link } from 'react-router-dom'
import { Stack, Typography } from '@mui/material';


const NotFound404 = () => {
    return (
        <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={2}>

            <Typography variant='h2'>404 Not Found</Typography>
            <Typography variant='h6'>Sorry, we couldn't find that page.</Typography>
            <Typography align='center'>
                <Link to='/' 
                    style={{
                        textDecoration: 'none' ,
                        color: '#1976d2' 
                    }}>
                    Back to home page
                </Link>
            </Typography>
            <img src='/assets/images/blackcat.png' alt='black cat'/>

        </Stack>
    )
}

export default NotFound404
