import React, {useState} from "react";
import { Avatar, Divider, Grid, Link, Paper, Stack, Typography } from '@mui/material';
import FormTemplate from '../Components/forms/FormTemplate';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import GoogleAuth from "../Components/GoogleAuth";

export const LoginScreen = () => {
	const [passwordReset, setPasswordReset] = useState(false)
	const handleChange = () => {
		setPasswordReset(!passwordReset);
	}
	const [gAlert, setGAlert] = useState({ error: null , success: null })

	return (
		//  main container for the signup forms set to max width of screen
        <Grid container >
            <Grid 
				xs={12} 
				sx={{margin: 'auto', maxWidth: '420px ! important'}} 
				item>
                <Paper elevation={10} >
					<Stack 
						direction="column"
						justifyContent="center"
						alignItems="center"
						spacing={2}>

						<Avatar sx={{margin:'auto', marginTop: '2rem'}}>
							<VpnKeyIcon />
						</Avatar>
						{/* normal login screen */}
						<div style={{ display: !passwordReset ? 'block' : 'none' }}>
							<Typography variant='h6' sx={{textAlign: 'center'}}>Sign in</Typography>
							{/* link to signup page  */}
							<Typography variant='subtitle1' sx={{textAlign: 'center', marginBottom: '1rem'}}>Don't have an account? Click  
								<Typography 
									component='a' 
									align='center'
									href='/signup' 
									sx={{
										'&:link': { textDecoration: 'none' },
										'&:visited': { color: '#1976d2' }
									}}> here
								</Typography>
							</Typography>
							
							<FormTemplate 
								gAlert={gAlert}
								type={'login'} 
								button={'Sign in'}/>

							{/* forgot password -> reset password page */}
							<Typography variant='subtitle1' sx={{textAlign: 'center'}}>
								<Link 
									component='button'
									onClick={handleChange}
									underline='none' 
									color='primary'
									sx={{marginTop: '1rem', fontSize: '1rem'}}>
										Forgot password?
									</Link>
							</Typography>

							<Divider variant="middle" style={{ marginTop:20, marginBottom:20}}/>
						
							{/* google button */}
							<GoogleAuth setGAlert={setGAlert}/>
						</div>
						
						{/* forgot password screen -> reset */}
						<div style={{ width: '100%', display: passwordReset ? 'block' : 'none' }}>
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
									sx={{marginTop: '1rem', fontSize: '1rem'}}> Back to sign in
								</Link>
							</Typography>
						</div>

					</Stack>
                </Paper>
            </Grid>
        </Grid>
	);
};
