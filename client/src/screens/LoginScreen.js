import React, {useState} from "react";
import { Avatar, Grid, Link, Paper, Stack, Typography } from '@mui/material';
import FormTemplate from '../Components/forms/FormTemplate';
import VpnKeyIcon from '@mui/icons-material/VpnKey';


export const LoginScreen = (props) => {
	const [passwordReset, setPasswordReset] = useState(false)
	const handleChange = () => {
		setPasswordReset(!passwordReset);
	}

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
						<div style={{ display: !passwordReset ? 'block' : 'none' }}>
							<Typography variant='h6' sx={{textAlign: 'center'}}>Sign in</Typography>
							{/* link to signup page  */}
							<Typography variant='subtitle1' sx={{textAlign: 'center', marginBottom: '1rem'}}>Don't have an account? Click  
								<Link 
									id="signupLink"
									href='/signup' 
									underline='none' 
									color='primary'
									sx={{fontSize: '1rem'}}> here
								</Link>
							</Typography>


							<div style={{width: '90%', margin: 'auto'}}>
								<FormTemplate 
									type={'login'} 
									button={'Login'}/>
							</div>

							{/* forgot password -> reset password page */}
							<Typography variant='subtitle1' sx={{paddingBottom: '2rem', textAlign: 'center'}}>
								<Link 
									component='button'
									onClick={handleChange}
									underline='none' 
									color='primary'
									sx={{marginTop: '1rem', fontSize: '1rem'}}>
										Forgot password?
									</Link>
							</Typography>
						</div>
						
						{/* forgot password screen -> reset */}
						<div style={{display: passwordReset ? 'block' : 'none' }}>
							<Typography variant='h6' sx={{textAlign: 'center'}}>Forgot password?</Typography>
							{/* link to signup page  */}
							<Typography variant='subtitle1' sx={{textAlign: 'center'}}>
								Enter an email associated with your account.
							</Typography>
							<Typography variant='subtitle1' sx={{textAlign: 'center', marginBottom: '1rem'}}>
								You will receive further instruction via email.
							</Typography>

							<div style={{width: '90%', margin: 'auto'}}>
								<FormTemplate 
									// handleAuthChange={handleAuthChange}
									type={'forgotPassword'} 
									button={'Submit'}/>
							</div>

							{/* forgot password -> reset password page */}
							<Typography variant='subtitle1' sx={{paddingBottom: '2rem', textAlign: 'center'}}>
								<Link 
									component='button'
									onClick={handleChange}
									underline='none' 
									color='primary'
									sx={{marginTop: '1rem', fontSize: '1rem'}}> Back to login
								</Link>
							</Typography>
						</div>
					
						
						
						
					</Stack>
                </Paper>
            </Grid>
        </Grid>
	);
};
