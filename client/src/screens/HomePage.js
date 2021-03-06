import React from "react";
import { Link } from 'react-router-dom'
import { Typography, Box, Button, Stack } from "@mui/material";
import createIntro from "../helperFunctions/HomePage/createIntroduction";
import createFlowchartItems from "../helperFunctions/HomePage/createFlowchartItems"

const HomePage = () => {
    const text = "We are as excited as you to being your companion finding journey!\n Here you will able to look through all animals at different shelters and match with the ones you like.\n Our team will then contact you to start an application process and for you to meet your match.\n After the screening, you will be able to take your companion home!"
    const sequence = "Create an account\n Look through available animals\n Match with one of the animals\n Start application and visit your match\n Adopt and Pick Up\nEnjoy life with your companion"
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
                variant="h4"
                align="center"
                gutterBottom>
                    Welcome to Tinder Paws!
                </Typography>

                <Typography
                component="span"
                ariant="body1"
                align="center">
                    {createIntro(text)}
                </Typography>
            </Box>
            <Stack
            alignItems="center"
            justifyContent="space-evenly">
                {createFlowchartItems(sequence)}
                <Button id="signupLink" component={Link} variant="contained" color="success" to="/signup">
                    Get Started!
                </Button>
            </Stack>
        </Box>
     );
}
 
export default HomePage;