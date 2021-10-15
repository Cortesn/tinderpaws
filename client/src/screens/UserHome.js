import React from "react";
import { Typography, Box, Button, Stack } from "@mui/material";
import {createTheme} from '@mui/material/styles';
import { ThemeProvider } from "@mui/system";
const UserHome = () => {
    const theme = createTheme({
            palette: {
              primary: 'yellow',
              secondary: 'pink',
            },
          })
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
            </Box>

            <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-evenly">
                <ThemeProvider theme={theme}>
                    <Button variant="contained" color="success" href="/addAnimalProfile">
                        Add new animal profile
                    </Button>
                    <Button variant="contained" color="primary" href="/editAnimalProfile">
                        Modify animal profile
                    </Button>
                    <Button variant="contained" color="error" href="/editAnimalProfile">
                        Delete animal profile
                    </Button>
                    <Button variant="contained" color="secondary" href="/editAnimalProfile">
                        Edit shelter info
                    </Button>
                </ThemeProvider>
            </Stack>
        </Box>
     );
}
 
export default UserHome;