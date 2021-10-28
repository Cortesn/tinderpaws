import React from 'react'
import { Tab, Tabs, Grid, Paper } from '@mui/material';
import UserTab from '../Components/tabs/UserTab';
import ShelterTab from '../Components/tabs/ShelterTab';
import TabPanel from '../Components/tabs/TabPanel';
import useTabState from '../hooks/useTabState';


const SignupPage = () => {
    const [value, handleChange] = useTabState(0);

    return (
        // main container for the signup forms set to max width of screen
        <Grid container>
            <Grid xs={12} sm={7} md={5} lg={4} xl={3} sx={{margin: 'auto'}} item>
                <Paper elevation={10} >
                        <Tabs 
                            sx={{
                                // controlls the selected tab display by using mui classes
                                '.Mui-selected':{
                                    bgcolor: 'primary.main',
                                    borderRadius: '5px 5px 0px 0px',
                                    color: 'white'
                                }
                            }}
                            value={value} 
                            onChange={handleChange}
                            TabIndicatorProps={{style: {background: 'none'}}}
                            indicatorColor="primary"
                            textColor="inherit" 
                            variant="fullWidth">
                            <Tab label="User Sign Up" />
                            <Tab label="Shelter Sign Up"/>
                        </Tabs>
                    
                    <TabPanel value={value} index={0} >
                        {/* form for new user signup */}
                        <UserTab/>
                    </TabPanel>
                    <TabPanel value={value} index={1} >
                        {/* form for new shelter/ employee signup */}
                        <ShelterTab />
                    </TabPanel>
                   
                </Paper>
            </Grid>
        </Grid>
    )
}

export default SignupPage;