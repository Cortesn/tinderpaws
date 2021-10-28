import React, { useEffect } from "react";
import { Avatar, Grid, Link, Paper, Stack, Typography } from '@mui/material';
import FormTemplate from '../Components/forms/FormTemplate';
import VpnKeyIcon from '@mui/icons-material/VpnKey';


const ResetPassword = (props) => {

	useEffect(() => {
		
		console.log(window.location.search)
		const url = window.location.serach.toString()
		console.log(url.substring(1))
		const params = new URLSearchParams(url)
		console.log(params)
	}, [])
	

	return (
		// main container for the signup forms set to max width of screen
        <Grid container>
            <Grid xs={12} sm={7} md={5} lg={4} xl={3} sx={{margin: 'auto'}} item>
                <Paper elevation={10} >
					<Stack spacing={2}>

						<Avatar sx={{margin:'auto', marginTop: '2rem'}}>
							<VpnKeyIcon />
						</Avatar>
						{/* normal login screen */}
						<Typography variant='h6' sx={{textAlign: 'center', marginBottom: '1rem'}}>Reset Password</Typography>

						<div style={{width: '90%', margin: 'auto'}}>
							{/* <FormTemplate 
								type={'resetPassword'} 
								button={'Submit'}/> */}
						</div>

					</Stack>
                </Paper>
            </Grid>
        </Grid>
	);
};

export default ResetPassword