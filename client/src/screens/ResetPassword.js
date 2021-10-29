import React from "react";
import { useParams } from "react-router";
import { Avatar, Grid, Link, Paper, Stack, Typography } from '@mui/material';
import FormTemplate from '../Components/forms/FormTemplate';
import VpnKeyIcon from '@mui/icons-material/VpnKey';


const ResetPassword = (props) => {
	const {email, reset_key} = useParams()
	// add state check to check if email exists
	
	return (
		// main container for the signup forms set to max width of screen
        <Grid container>
            <Grid xs={12} sm={7} md={5} lg={4} xl={3} sx={{margin: 'auto'}} item>
                <Paper elevation={10} >
					<Stack spacing={2}>
						<Avatar sx={{margin:'auto', marginTop: '2rem'}}>
							<VpnKeyIcon />
						</Avatar>
						<div>
							<Typography variant='h6' sx={{textAlign: 'center'}}>Reset Password</Typography>
							<Typography variant='subtitle1' sx={{ textAlign: 'center', marginBottom: '1.5rem'}}>
								Account: {email}
							</Typography>
						</div>
						<div style={{width: '90%', margin: 'auto', marginBottom: '2rem'}}>
							<FormTemplate 
								data={{email: email, reset_key:reset_key}}
								type={'resetPassword'} 
								button={'Submit'}/>
						</div>
					</Stack>
                </Paper>
            </Grid>
        </Grid>
	);
};

export default ResetPassword