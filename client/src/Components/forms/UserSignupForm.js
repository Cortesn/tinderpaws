import React from 'react'
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { InputAdornment, IconButton, FilledInput, InputLabel, FormControl } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import googleBtn from '../../images/googleBtn.png'
import useSignupFormState from '../../hooks/useSignupFormState';

const UserSignupForm = () => {
    // state for changing password visability
    const [ pass1, 
        handleChange1,  
        handleClickShowPassword1, 
        handleMouseDownPassword1] 
        = useSignupFormState({
            password: '',
            showPassword: false,
        }
    );
    const [ pass2, 
        handleChange2,  
        handleClickShowPassword2, 
        handleMouseDownPassword2] 
        = useSignupFormState({
            password: '',
            showPassword: false,
        }
    );

    return (
        <form>
            <Grid container direction={"column"} spacing={1}>
                <Grid item>
                    <FormControl fullWidth variant="filled">
                        <InputLabel htmlFor="fName">First Name</InputLabel>
                        <FilledInput
                            id='fName'
                            fullWidth />
                    </FormControl>
                </Grid>
                <Grid item>
                    <FormControl fullWidth variant="filled">
                        <InputLabel htmlFor="lName">Last Name</InputLabel>
                        <FilledInput
                            id='lName'
                            fullWidth />
                    </FormControl>
                </Grid>
                <Grid item>
                    <FormControl fullWidth variant="filled">
                        <InputLabel htmlFor="email">Email</InputLabel>
                        <FilledInput
                            id='email'
                            fullWidth 
                            variant='filled'/>
                    </FormControl>
                </Grid>
                <Grid item>
                    <FormControl fullWidth variant="filled">
                        <InputLabel htmlFor="password1">Password</InputLabel>
                        <FilledInput
                            id="password1"
                            type={pass1.showPassword ? 'text' : 'password'}
                            value={pass1.password}
                            onChange={handleChange1('password')}
                            endAdornment={
                                <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword1}
                                    onMouseDown={handleMouseDownPassword1}
                                    edge="end">
                                    {pass1.showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                                </InputAdornment>}/>
                    </FormControl>
                </Grid>
                <Grid item>
                    <FormControl fullWidth variant="filled">
                        <InputLabel htmlFor="password2">Confirm Password</InputLabel>
                            <FilledInput
                                id="password2"
                                type={pass2.showPassword ? 'text' : 'password'}
                                value={pass2.password}
                                onChange={handleChange2('password')}
                                endAdornment={
                                    <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword2}
                                        onMouseDown={handleMouseDownPassword2}
                                        edge="end">
                                        {pass2.showPassword ? <VisibilityOff /> : <Visibility />}
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
                <Grid item sx={{textAlign:'center', margin:'auto'}}>
                    {/* temp button until we link backend */}
                    <img src={googleBtn} alt='google oauth button'/>
                </Grid>
            </Grid> 
        </form>
    )
}

export default UserSignupForm