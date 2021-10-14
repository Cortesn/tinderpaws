import React from 'react'
import Grid from '@mui/material/Grid';
import { InputAdornment, IconButton, FilledInput, 
        InputLabel, FormControl, Button, MenuItem, Select } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';


const EmployeeSignupForm = () => {
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
                        <InputLabel htmlFor="shelter">Shelter Name</InputLabel>
                        <Select id="shleter">
                            {/* make these options dynamic */}
                            <MenuItem value={1}>Shelter name</MenuItem>
                            <MenuItem value={2}>Shelter name</MenuItem>
                            <MenuItem value={3}>Shelter name</MenuItem>
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
            </Grid> 
        </form>
    )
}

export default EmployeeSignupForm
