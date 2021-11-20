import React from "react";
import { Typography, Box, Button, Stack } from "@mui/material";
import createIntro from "../helperFunctions/HomePage/createIntroduction";

const MissionPage = () => {
    const text = "Our mission here at Tinder Paws is to find loving homes for members of the various shelters we partner with.\n We strive to make the matching process easy for you and want our users to focus on finding a mutual connection.\n We want to increase the visibility of highly adoptable pets and increase the overall effectiveness of pet adoption programs and applications."
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
                    Our Mission
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
                <Button id="signupLink" variant="contained" color="success" href="/signup">
                    Start your journey
                </Button>
            </Stack>
        </Box>
     );
}
 
export default MissionPage;