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
const UserFormik = () => useFormik({
    initialValues: {
        fname: '',
        lname:'',
        email: '',
        password: '',
        passwordConfirm: ''
    },
    validationSchema: userValidation(),
    onSubmit: (values, {resetForm}) => {
        console.log(values)
        console.log('hello world')
        axios.post('http://localhost:3001/signup/user', values)
            .then(function(response){
                if (response.status === 201){
                    // window.location = '/'
                }
            })

        // alert(JSON.stringify(values));

        // reset form
        resetForm();
    },
});

export default UserFormik