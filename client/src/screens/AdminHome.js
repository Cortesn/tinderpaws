import React from "react";
import {useParams} from "react-router";
import { Typography, Box, Button, Stack } from "@mui/material";
import {createTheme} from '@mui/material/styles';
import { ThemeProvider } from "@mui/system";
const AdminHome = () => {
    const theme = createTheme({
            palette: {
              primary: 'yellow',
              secondary: 'pink',
            },
          })
    const {id} = useParams()
    // query the shelter info with the admin id

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
                    shelter info
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
 
export default AdminHome;