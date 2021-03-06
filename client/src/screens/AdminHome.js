import React, {useState,useEffect} from "react";
import { Link } from 'react-router-dom';
import { Typography, Button, Stack, Grid, Card, CardContent} from "@mui/material";
import {createTheme} from '@mui/material/styles';
import { ThemeProvider } from "@mui/system";
import FormTemplate from '../Components/forms/FormTemplate';
import { FormInputs } from '../Components/forms/FormInputs';
import CancelIcon from '@mui/icons-material/Cancel';
import { api, setToken } from "../helperFunctions/axiosInstace";

const AdminHome = (props) => {
    const theme = createTheme({
            palette: {
              primary: {
                  main: '#1976d2',
              }
            }
          })


    // get shelter info
    const [shelterInfoState, setShelterInfoState] = useState(null);
    useEffect(() => {
        setToken(localStorage.token)
        api.get(`/shelters/shelter`).then((response)=>{
            const data = {data: response.data[0]}
            setShelterInfoState(data);
            });
        },[]);

    // get employee name
    const [employeeNameState, setEmployeeNameState] = useState(null);
    useEffect(()=>{
        const url = `/shelters/employee`;
        setToken(localStorage.token)
        api.get(url).then((response)=>{
            setEmployeeNameState(response.data[0]["name"])
        })
    }, [])

    // toggle form for shelter update request
    const [updateFormState, setUpdateFormState] = useState(false)
    const toggleShelterForm = ()=>{
        setUpdateFormState(!updateFormState)
    }
    return ( 
        <Grid container>
            <Grid xs={12} sm={7} md={6} lg={7} xl={7} sx={{margin: 'auto', marginTop: '1%'}} item>
                <Card variant="outlined" sx={{marginBottom: "2%"}}>
                    <CardContent>
                    {employeeNameState && <Typography 
                        variant="h6"
                        align="center"
                        gutterBottom>
                            Welcome back, {employeeNameState}. 
                        </Typography>}
                        {shelterInfoState && 
                        <Typography
                        variant="subtitle1"
                        align="center">
                            {shelterInfoState.data.name}
                        </Typography>}
                        { shelterInfoState && <Typography
                        variant="subtitle2"
                        align="center">
                            {shelterInfoState.data.street}
                        </Typography>}
                        { shelterInfoState && <Typography
                        variant="subtitle2"
                        align="center">
                            {shelterInfoState.data.city}, {shelterInfoState.data.state} {shelterInfoState.data.zip}
                        </Typography>}
                        { shelterInfoState && 
                        <Typography
                        variant="body2"
                        align="center">
                            {shelterInfoState.data.info}
                        </Typography>
                        }
                    </CardContent>
                    {updateFormState && 
                        <CardContent>
                        <Typography
                        variant="subtitle2"
                        align="right">
                            <CancelIcon id="hide_shelter_update" sx={{color: "#1976d2"}} onClick={toggleShelterForm}/>
                        </Typography>
                        { shelterInfoState &&  <FormTemplate 
                                form={FormInputs} 
                                type={'shelterUpdate'} 
                                button={'Update Shelter Info'}
                                data= {shelterInfoState}
                                />}
                        </CardContent>
                    }
                </Card>

                <Stack
                direction="row"
                alignItems="center"
                justifyContent="center"
                spacing={6}>
                    <ThemeProvider theme={theme}>
                        <Button id="addpet" component={Link} variant="contained" to="/adminHome/add" auth={props.auth}>
                            Add new animal profile
                        </Button>
                        <Button id="editpet" component={Link} variant="contained" to="/adminHome/pets" auth={props.auth}>
                            Edit animal profile
                        </Button>
                        <Button id="editshelter" variant="contained" onClick={toggleShelterForm}>
                            {updateFormState? 'Close shelter info' : 'Edit shelter info'}
                        </Button>
                    </ThemeProvider>
                </Stack>
            </Grid>
        </Grid>
     );
}
 
export default AdminHome;