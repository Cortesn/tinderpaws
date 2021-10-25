import * as Yup from "yup";
import { useFormik } from "formik";
import {api, setToken} from '../../helperFunctions/axiosInstace'

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
    enableReinitialize: true, // allows to reset the initial fields
    initialValues: {
        fname: '',
        lname:'',
        email: '',
        password: '',
        passwordConfirm: '',
    },
    validationSchema: userValidation(),
    onSubmit: (values, {resetForm, setFieldValue}) => {
        // make a copy and clean data
        var data = JSON.parse(JSON.stringify(values))
        delete data.passwordConfirm

        // make request
        api.post('/signup/user', data )
            .then( response => {
                // console.log(response)
                // console.log(response.data)
                
                const {token} = response.data
                setToken(token)

                // remove error if exists
                setFieldValue('error', '')
                setFieldValue('success', 'Success!')

                // redirects page
                window.location = '/'
            })
            .catch( error => {
                // set error msg with formik
                setFieldValue('error', error.response.data.msg)
            })
            // might not need this promise -> always executes
            // .then(function(){
            //     // resetForm()
            // })
    },
});

export default UserFormik