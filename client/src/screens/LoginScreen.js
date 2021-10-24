import React from "react";
import { Avatar, Grid, Link, Paper, Stack, Typography } from '@mui/material';
import FormTemplate from '../Components/forms/FormTemplate';
import { FormInputs } from '../Components/forms/FormInputs';
import VpnKeyIcon from '@mui/icons-material/VpnKey';

export const LoginScreen = () => {

	return (
		// main container for the signup forms set to max width of screen
        <Grid container>
            <Grid xs={12} sm={7} md={5} lg={4} xl={3} sx={{margin: 'auto'}} item>
                <Paper elevation={10} >
				<Stack spacing={1}>

					<Avatar sx={{margin:'auto', marginTop: '2rem'}}>
						<VpnKeyIcon />
					</Avatar>

					<Grid item sx={{marginTop: '2rem', textAlign:'center'}}>
						<Typography variant='h6' sx={{textAlign: 'center'}}>Sign in</Typography>
						{/* link to signup page */}
						<Typography variant='subtitle1' sx={{textAlign: 'center'}}>Don't have an account? Click 
							<Link href='/signup' underline='none' color='primary'> here</Link>
						</Typography>
					</Grid>

					<div style={{width: '90%', alignSelf:'center'}}>
						<FormTemplate 
							form={FormInputs} 
							type={'login'} 
							button={'Login'}/>
					</div>

					{/* forgot password -> reset password page */}
					<Typography variant='subtitle1' sx={{paddingBottom: '2rem', textAlign: 'center'}}>
						<Link href='/reset' underline='none' color='primary'>Forgot password?</Link>
					</Typography>
					

				</Stack>
                </Paper>
            </Grid>
        </Grid>
	);
};
