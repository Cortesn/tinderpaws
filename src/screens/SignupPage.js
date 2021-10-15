import React from 'react'
import UserTab from '../Components/signup/UserTab';
import ShelterTab from '../Components/signup/ShelterTab';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

// create main tab panel
function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}>
            {value === index && (
            <Paper sx={{ p: 3 }}>
                <Typography component={'span'}>{children}</Typography>
            </Paper>
            )}
        </div>
    );
}

const SignupPage = () => {
    const theme = useTheme();
    
    // handles changing different tabs
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };

    return (
        // main container for the signup forms set to max width of screen
        <Grid container>
            {/* lifted paper has max width of 400 px -> should probaby change this with grid sizing */}
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
                            {/* form specific for new user signup */}
                            <UserTab/>
                        </TabPanel>
                        <TabPanel value={value} index={1} dir={theme.direction}>
                            {/* form specific for new shelter/ employee signup */}
                            <ShelterTab/>
                        </TabPanel>
                    </SwipeableViews>
                </Paper>
            </Grid>
        </Grid>
    )
}

export default SignupPage;
