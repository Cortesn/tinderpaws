import React from 'react'
import UserTab from '../Components/tabs/UserTab';
import ShelterTab from '../Components/tabs/ShelterTab';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import TabPanel from '../Components/tabs/TabPanel';
import useTabState from '../hooks/useTabState';


const SignupPage = () => {
    const theme = useTheme();

    const [value, handleChange, handleChangeIndex] = useTabState(0);

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
                    {/* use older version of react swipeable views(0.12.4) vs 0.14.0 has bugs that prevent first swipe */}
                    <SwipeableViews
                        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                        index={value}
                        onChangeIndex={handleChangeIndex}>
                        <TabPanel value={value} index={0} dir={theme.direction}>
                            {/* form for new user signup */}
                            <UserTab/>
                        </TabPanel>
                        <TabPanel value={value} index={1} dir={theme.direction}>
                            {/* form for new shelter/ employee signup */}
                            <ShelterTab/>
                        </TabPanel>
                    </SwipeableViews>
                </Paper>
            </Grid>
        </Grid>
    )
}

export default SignupPage;