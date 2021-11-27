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
import signUpRequest from '../../helperFunctions/signUp.js/signUpRequest';
import UserUpdateFormik from './UserUpdate';
import PetInfoFormik from './PetInfoForm';
import AddPetFormik from './AddPetForm';
import { api } from '../../helperFunctions/axiosInstace';

var formik;
// all possible form inputs with validation
const FormInputs = (type, data, {...props}) =>{
    // get the validation schema
    if(type === "user"){
        formik = UserFormik(data, signUpRequest, {...props})
    }else if (type === 'shelter'){
        formik = ShelterFormik({...props})
    }else if (type === 'employee'){
        formik = EmployeeFormik({...props});
    }else if (type === 'login'){
        formik = LoginFormik({...props})
    }else if (type === 'userUpdate'){
        formik = UserUpdateFormik(data)
    }else if (type === 'shelterUpdate'){
        formik = ShelterUpdateFormik(data.data, data.data.shelter_id)
    }else if (type === 'forgotPassword'){
        formik = ForgotPasswordFormik({...props})
    }else if (type === 'resetPassword'){
        formik = ResetPasswordFormik(data, {...props})
    }else if (type === 'pet'){
        formik = PetInfoFormik(data)
    }else if (type === 'addPet'){
        formik = AddPetFormik(data)
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

    // inputs to build forms
    const inputFields = [
        {
            types: ['employee'],
            id: 'sname',
            label: 'Shelter Name',
            value: formik.values.shelterOptions,
            onChange: formik.handleChange('shelterOptions'),
            error: formik.touched.shelterOptions && Boolean(formik.errors.shelterOptions),
            helperText: formik.touched.shelterOptions && formik.errors.shelterOptions,
            options: data ? data.options : ''
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
            types: ['employee', 'pet', 'addPet'],
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
        },
        {
            types: ['pet', 'addPet'],
            id: 'type',
            label: 'Type',
            value: formik.values.type,
            onChange: (event)=> {
                formik.setFieldValue('type', event.target.value)
                formik.setFieldValue('breed', '')
                data.setPet({...data.pet, 'type': event.target.value, 'breed': '',})
                api.get('/breeds/', {params: {type: event.target.value}})
                    .then((response) => {
                        data.setPet({
                            ...data.pet, 
                            'type': event.target.value, 
                            'breed': '',
                            'options': response.data
                        })
                    })
            },
            error: formik.touched.type && Boolean(formik.errors.type),
            helperText: formik.touched.type && formik.errors.type,
            options: [{id: 1, name: 'Dog'}, {id: 2, name: 'Cat'}, {id: 3, name: 'Other'}]
        },
        {
            types: ['pet', 'addPet'],
            id: 'breed',
            label: 'Breed',
            value: formik.values.breed,
            onChange: formik.handleChange('breed'),
            error: formik.touched.breed && Boolean(formik.errors.breed),
            helperText: formik.touched.breed && formik.errors.breed,
            options: data && data.pet && type==='addPet'?  data.pet.options || [] : data && data.pet? data.pet.options || '' : ''
        },
        {
            types: ['pet', 'addPet'],
            id: 'status',
            label: 'Status',
            value: formik.values.status,
            onChange: formik.handleChange('status'),
            error: formik.touched.status && Boolean(formik.errors.status),
            helperText: formik.touched.status && formik.errors.status,
            options: [{id: 1, name: 'Not Available'}, {id: 2, name: 'Available'}, {id: 3, name: 'Pending'}, {id: 4 , name: 'Adopted'}]
        },
        {
            types: ['pet', 'addPet'],
            id: 'dispositions',
            label: 'Dispositions',
            value: formik.values.dispositions || [],
            formik: formik,
            onChange: formik.handleChange('dispositions'),
            error: formik.touched.dispositions && Boolean(formik.errors.dispositions),
            helperText: formik.touched.dispositions && formik.errors.dispositions,
            checkboxes: [{id: 1, name: 'Good with other animals'}, {id: 2, name: 'Good with children'}, {id: 3, name: 'Animal must be leashed at all times'}]
        },
        {
            types: ['pet', 'addPet'],
            id: 'description',
            label: 'Description',
            value: formik.values.description,
            onChange: formik.handleChange('description'),
            error: formik.touched.description && Boolean(formik.errors.description),
            helperText: formik.touched.description && formik.errors.description,
            textArea: { id: "textarea", rows: 5}
        },
    ]

    // grab the types you need
    const filteredInputs = inputFields.filter(input => input.types.includes(type))

    return {filteredInputs}
}

export {FormInputs, formik}
