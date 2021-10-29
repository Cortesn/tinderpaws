import React from 'react'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import ShelterUpdateFormik from './ShelterUpdate'
import ShelterFormik from './ShelterSignup';
import UserFormik from './UserSignup';
import EmployeeFormik from './EmployeeSignup';
import LoginFormik from './Login';
import ForgotPasswordFormik from './ForgotPassword';
import ResetPasswordFormik from './ResetPassword';
import useFormPasswordState from '../../hooks/useFormPasswordState';
import UpdateProfileRequest from '../../helperFunctions/UserHome/updateProfileRequest';
import signUpRequest from '../../helperFunctions/signUp.js/signUpRequest';
import UserUpdateFormik from './UserUpdate';

var formik;
// all possible form inputs with validation
const FormInputs = (type, options, data, user_id) =>{
    // get the validation schema
    if(type === "user"){
        formik = UserFormik(data, signUpRequest)
    }else if (type === 'shelter'){
        formik = ShelterFormik()
    }else if (type === 'employee'){
        formik = EmployeeFormik();
    }else if (type === 'login'){
        formik = LoginFormik()
    }
    else if (type === 'userUpdate'){
        formik = UserUpdateFormik(data, UpdateProfileRequest, user_id)
    } 
    else if (type === 'shelterUpdate'){
        formik = ShelterUpdateFormik(data.data, data.data.shelter_id)
    }else if (type === 'forgotPassword'){
        formik = ForgotPasswordFormik()
    }else if (type === 'resetPassword'){
        formik = ResetPasswordFormik(data)
    }
    // state for changing password visability
    const [ 
        pass1, 
        handleClickShowPassword1, 
        handleMouseDownPassword1
    ] = useFormPasswordState({
            password: '',
            showPassword: false,
        }
    );
    const [ 
        pass2, 
        handleClickShowPassword2, 
        handleMouseDownPassword2
    ] = useFormPasswordState({
            password: '',
            showPassword: false,
        }
    );

    // inputs to build the signup forms
    // use the password prop for passwords and the options prop for select/options(dropdown)
    // all others that do not have these will be normal input fields
    // ** add a checkbox and radio option
    const inputFields = [
        {
            types: ['employee'],
            id: 'sname',
            label: 'Shelter Name',
            value: formik.values.shelterOptions,
            onChange: formik.handleChange('shelterOptions'),
            error: formik.touched.shelterOptions && Boolean(formik.errors.shelterOptions),
            helperText: formik.touched.shelterOptions && formik.errors.shelterOptions,
            options: options
        },
        {
            types: ['employee'],
            id: 'employeeId',
            label: 'Employee ID',
            value: formik.values.employeeId,
            onChange: formik.handleChange,
            error: formik.touched.employeeId && Boolean(formik.errors.employeeId),
            helperText: formik.touched.employeeId && formik.errors.employeeId
        },
        {
            types: ['employee'],
            id: 'name',
            label: 'Name',
            value: formik.values.name,
            onChange: formik.handleChange,
            error: formik.touched.name && Boolean(formik.errors.name),
            helperText: formik.touched.name && formik.errors.name
        },
        {
            types: ['user', 'userUpdate'],
            id: 'fname',
            label: 'First Name',
            value: formik.values.fname,
            onChange: formik.handleChange,
            error: formik.touched.fname && Boolean(formik.errors.fname),
            helperText: formik.touched.fname && formik.errors.fname
        },
        {
            types: ['user', 'userUpdate'],
            id: 'lname',
            label: 'Last Name',
            value: formik.values.lname,
            onChange: formik.handleChange,
            error: formik.touched.lname && Boolean(formik.errors.lname),
            helperText: formik.touched.lname && formik.errors.lname
        },
        
        {
            types: ['shelter', 'shelterUpdate'],
            id: 'sname',
            label: 'Shelter Name',
            value: formik.values.sname,
            onChange: formik.handleChange,
            error: formik.touched.sname && Boolean(formik.errors.sname),
            helperText: formik.touched.sname && formik.errors.sname
        },
        {
            types: ['shelter', 'shelterUpdate'],
            id: 'street',
            label: 'Street',
            value: formik.values.street,
            onChange: formik.handleChange,
            error: formik.touched.street && Boolean(formik.errors.street),
            helperText: formik.touched.street && formik.errors.street
        },
        {
            types: ['shelter', 'shelterUpdate'],
            id: 'city',
            label: 'City',
            value: formik.values.city,
            onChange: formik.handleChange,
            error: formik.touched.city && Boolean(formik.errors.city),
            helperText: formik.touched.city && formik.errors.city
        },
        {
            types: ['shelter', 'shelterUpdate'],
            id: 'state',
            label: 'State',
            value: formik.values.state,
            onChange: formik.handleChange,
            error: formik.touched.state && Boolean(formik.errors.state),
            helperText: formik.touched.state && formik.errors.state
        },
        {
            types: ['shelter', 'shelterUpdate'],
            id: 'zip',
            label: 'Zip',
            value: formik.values.zip,
            onChange: formik.handleChange,
            error: formik.touched.zip && Boolean(formik.errors.zip),
            helperText: formik.touched.zip && formik.errors.zip
        },
        {
            types: ['user', 'shelter', 'employee', 'userUpdate', 'login', 'forgotPassword'],
            id: 'email',
            label: 'Email',
            value: formik.values.email,
            onChange: formik.handleChange,
            error: formik.touched.email && Boolean(formik.errors.email),
            helperText: formik.touched.email && formik.errors.email
        },
        {
            types: ['user', 'shelter', 'employee', 'login', 'resetPassword'],
            id: 'password',
            label: 'Password',
            password: {
                type: pass1.showPassword ? 'text' : 'password',
                value: pass1.password = formik.values.password,
                onChange: formik.handleChange('password'),
                error: formik.touched.password && Boolean(formik.errors.password),
                helperText: formik.touched.password && formik.errors.password,
                endAdornment: {
                    onClick: handleClickShowPassword1,
                    onMouseDown: handleMouseDownPassword1,
                    visibility: pass1.showPassword ? <VisibilityOff /> : <Visibility />
                }
            }
        },
        {
            types: ['user', 'shelter', 'employee', 'resetPassword'],
            id: 'password2',
            label: 'Confirm Password',
            password: {
                type: pass2.showPassword ? 'text' : 'password',
                value: pass2.password = formik.values.passwordConfirm,
                onChange: formik.handleChange('passwordConfirm'),
                error: formik.touched.passwordConfirm && Boolean(formik.errors.passwordConfirm),
                helperText: formik.touched.passwordConfirm && formik.errors.passwordConfirm,
                endAdornment: {
                    onClick: handleClickShowPassword2,
                    onMouseDown: handleMouseDownPassword2,
                    visibility: pass2.showPassword ? <VisibilityOff /> : <Visibility />
                }
            }
        }
    ]

    // grab the types you need
    const filteredInputs = inputFields.filter(input => input.types.includes(type))

    return {filteredInputs}
}

export {FormInputs, formik}
