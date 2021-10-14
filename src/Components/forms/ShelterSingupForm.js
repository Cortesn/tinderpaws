import React from 'react'
import Grid from '@mui/material/Grid';
import { InputAdornment, IconButton, FilledInput, 
        InputLabel, FormControl, Button } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import googleBtn from '../../images/googleBtn.png'


const ShelterSignupForm = () => {
    const [values, setValues] = React.useState({
        password1: '',
        password2: '',
        showPassword1: false,
        showPassword2: false,
      });
    
    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword1 = () => {
        setValues({
            ...values,
            showPassword1: !values.showPassword1,
        });
    };

    const handleClickShowPassword2 = () => {
        setValues({
            ...values,
            showPassword2: !values.showPassword2,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

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
                            type={values.showPassword1 ? 'text' : 'password'}
                            value={values.password1}
                            onChange={handleChange('password1')}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword1}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end">
                                        {values.showPassword1 ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>}/>
                    </FormControl>
                </Grid>
                <Grid item>
                    <FormControl fullWidth variant="filled">
                        <InputLabel htmlFor="password2">Confirm Password</InputLabel>
                            <FilledInput
                                id="password2"
                                type={values.showPassword2 ? 'text' : 'password'}
                                value={values.password2}
                                onChange={handleChange('password2')}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword2}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end">
                                            {values.showPassword2 ? <VisibilityOff /> : <Visibility />}
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
                    <img src={googleBtn} alt='google oauth button'/>
                </Grid>
            </Grid>
        </form> 
    )
}

export default ShelterSignupForm
