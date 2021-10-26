import * as Yup from "yup";
import { useFormik } from "formik";
import axios from 'axios'

// Formik Schema (users)
const userValidation = () => Yup.object({
    fname: Yup
        .string()
        .min(1, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    lname: Yup
        .string()
        .min(1, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    email: Yup
        .string()
        .email('Please Enter a valid email')
        .required('Required'),
    password: Yup
        .string('Enter password')
        .min(8, 'Minimum 8 characters')
        .required('Password is required'),
    passwordConfirm: Yup
        .string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
});

// formik state & create new user
const UserFormik = (initialValues, onSubmitFunction,functionName, user_id) => useFormik({
    initialValues: initialValues,
    validationSchema: userValidation(),
    onSubmit: (values, {resetForm}) => {
        if(functionName === "UpdateProfileRequest"){
            onSubmitFunction(values, user_id)
        }else{
            onSubmitFunction(values, resetForm)
        }
    },
});

export default UserFormik