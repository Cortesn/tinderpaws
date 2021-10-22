import React from 'react'
import Grid from '@mui/material/Grid';
import { InputAdornment, IconButton, FilledInput, 
        InputLabel, FormControl, Button } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
// import googleBtn from '../../images/googleBtn.png'
import useSignupFormState from '../../hooks/useSignupFormState';

const ShelterSignupForm = () => {
    const [ pass1, 
        handleChange1,  
        handleClickShowPassword1, 
        handleMouseDownPassword1] 
        = useSignupFormState({
            password1: '',
            showPassword1: false,
        }
    );
    const [ pass2, 
        handleChange2,  
        handleClickShowPassword2, 
        handleMouseDownPassword2] 
        = useSignupFormState({
            password2: '',
            showPassword2: false,
        }
    );

    return (
        <form>
            <Grid container direction={"column"} spacing={1}>
                <Grid item>
                    <FormControl fullWidth variant="filled">
                        <InputLabel htmlFor="shelterName">Shelter Name</InputLabel>
                        <FilledInput
                            id='shelterName'
                            fullWidth />
                    </FormControl>
                </Grid>
                <Grid item>
                    <FormControl fullWidth variant="filled">
                        <InputLabel htmlFor="street">Street</InputLabel>
                        <FilledInput
                            id='street'
                            fullWidth />
                    </FormControl>
                </Grid>
                <Grid item>
                    <FormControl fullWidth variant="filled">
                        <InputLabel htmlFor="city">City</InputLabel>
                        <FilledInput
                            id='city'
                            fullWidth 
                            variant='filled'/>
                    </FormControl>
                </Grid>
                <Grid item>
                    <Grid container spacing={1}>
                        <Grid item xs={6}>
                            <FormControl fullWidth variant="filled">
                                <InputLabel htmlFor="state">State</InputLabel>
                                <FilledInput
                                    id='state'
                                    variant='filled'/>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth variant="filled">
                                <InputLabel htmlFor="zip">Zip Code</InputLabel>
                                <FilledInput
                                    id='zip'
                                    variant='filled'/>
                            </FormControl>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item>
                    <FormControl fullWidth variant="filled">
                        <InputLabel htmlFor="password1">Password</InputLabel>
                        <FilledInput
                            id="password1"
                            type={pass1.showPassword1 ? 'text' : 'password'}
                            value={pass1.password1}
                            onChange={handleChange1('password1')}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword1}
                                        onMouseDown={handleMouseDownPassword1}
                                        edge="end">
                                        {pass1.showPassword1 ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>}/>
                    </FormControl>
                </Grid>
                <Grid item>
                    <FormControl fullWidth variant="filled">
                        <InputLabel htmlFor="password2">Confirm Password</InputLabel>
                            <FilledInput
                                id="password2"
                                type={pass2.showPassword2 ? 'text' : 'password'}
                                value={pass2.password2}
                                onChange={handleChange2('password2')}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword2}
                                            onMouseDown={handleMouseDownPassword2}
                                            edge="end">
                                            {pass2.showPassword2 ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>}/>
                    </FormControl>
                </Grid>

                <Grid item>
                    <Button
                        fullWidth
                        type='submit' 
                        variant='contained' 
                        color='primary'>
                        Sign Up
                    </Button>
                </Grid>
                <Grid item>
                    <hr/>
                </Grid>

                <Grid item sx={{textAlign:'center',  margin:'auto'}}>
                    {/* temp button until we link backend */}
                    {/* <img src={googleBtn} alt='google oauth button'/> */}
                </Grid>
            </Grid>
        </form> 
    )
}

export default ShelterSignupForm
