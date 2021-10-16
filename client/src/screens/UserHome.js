import React from "react";
import { Typography, Box, Stack } from "@mui/material";
const UserHome = () => {
    return ( 
        <Box>
            {/* Navbar goes here */}
            <Box sx={{
                border:1,
                borderColor: 'grey.500',
                width: '60%',
                margin: 'auto',
                padding: '1rem',
                borderRadius:"12px",
                marginBottom: "2rem"
            }}>
                <Typography 
                variant="h6"
                align="center"
                gutterBottom>
                    Welcome back, user. 
                </Typography>
            </Box>
            
            <Box sx={{
                border:1,
                borderColor: 'grey.500',
                width: '60%',
                margin: 'auto',
                padding: '1rem',
                borderRadius:"12px",
                marginBottom: "2rem"
            }}>
                <Typography
                component="span"
                ariant="body1"
                align="center">
                    hello
                </Typography>
                <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-evenly">
            </Stack>
            </Box>
        </Box>
     );
}
 
export default UserHome;