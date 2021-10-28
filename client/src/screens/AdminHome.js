import React from "react";
import {useParams} from "react-router";
import { Typography, Box, Button, Stack } from "@mui/material";
import {createTheme} from '@mui/material/styles';
import { ThemeProvider } from "@mui/system";
import { yellow } from '@mui/material/colors'
import getShelterInfo from "../helperFunctions/AdminHomePage/getShelterInfo";

const AdminHome = () => {
    const theme = createTheme({
            palette: {
              primary: {
                  main: yellow[500],
              }
            }
          })
    // useParams is to get the ID passed into the parent route
    const {id} = useParams()
    // query the shelter info with the admin id
    // not getting anything bc server is not sending data back yet
    const {data} = getShelterInfo(id);
    console.log("hello")
    console.log(data)
    
    return ( 
        <Box>
            <Box sx={{
                border:1,
                borderColor: 'grey.500',
                width: '60%',
                margin: 'auto',
                padding: '1rem',
                borderRadius:"12px",
                marginBottom: "2rem",
                marginTop:"1rem"
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
                variant="h3"
                align="left">
                    shelter title
                </Typography>
                <Typography
                variant="h6"
                align="left">
                    shelter address
                </Typography>

                <Typography
                variant="body1"
                align="center">
                    shelter info
                </Typography>
            </Box>

            <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            spacing={6}>
                <ThemeProvider theme={theme}>
                    <Button variant="contained" color="success" href="/addAnimalProfile">
                        Add new animal profile
                    </Button>
                    <Button variant="contained" color="error" href="/editAnimalProfile">
                        Edit animal profile
                    </Button>
                    <Button variant="contained" color="primary" href="/editShelter">
                        Edit shelter info
                    </Button>
                </ThemeProvider>
            </Stack>
        </Box>
     );
}
 
export default AdminHome;