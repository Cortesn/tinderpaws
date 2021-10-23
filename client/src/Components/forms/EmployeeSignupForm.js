import React from 'react'
import Grid from '@mui/material/Grid';
import { InputAdornment, IconButton, FilledInput, 
        InputLabel, FormControl, Button, MenuItem, Select } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import useSignupFormState from '../../hooks/useSignupFormState';


const EmployeeSignupForm = () => {
    // states
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
                        <InputLabel htmlFor="shelter">Shelter Name</InputLabel>
                        <Select
                            labelId="shelter"
                            id="shelter"
                            value=''
                        >
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item>
                    <FormControl fullWidth variant="filled">
                        <InputLabel htmlFor="employeeId">Employee ID</InputLabel>
                        <FilledInput
                            id='employeeId'
                            fullWidth />
                    </FormControl>
                </Grid>
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
            </Grid> 
        </form>
    )
}

export default EmployeeSignupForm