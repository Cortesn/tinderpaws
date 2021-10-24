import * as Yup from "yup";
import { useFormik } from "formik";
import {api, setToken} from '../../helperFunctions/axiosInstace'


// Formik Schema (shelters)
const shelterValidation = () => Yup.object({
    sname: Yup
        .string()
        .min(1, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    street: Yup
        .string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    city: Yup
        .string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    state: Yup
        .string()
        .min(2, 'Too Short!')
        .max(2, '2 letter max')
        .required('Required'),
    zip: Yup
        .string()
        .min(4, 'Too Short!')
        .max(10, 'Too Long!')
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

// formik state
const ShelterFormik =()=> useFormik({
    initialValues: {
        sname: '',
        street: '',
        city: '',
        state: '',
        zip: '',
        email: '',
        password: '',
        passwordConfirm: ''
    },
    validationSchema: shelterValidation,
    onSubmit: (values, {resetForm, setFieldValue}) => {
        // make a copy and clean data
        var data = JSON.parse(JSON.stringify(values))
        delete data.passwordConfirm

        // make request
        api.post('/signup/shelter', data )
            .then(function(response){
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
            .catch(function(error){
                // set error msg with formik
                setFieldValue('error', error.response.data.msg)
            })
            // might not need this promise -> always executes
            .then(function(){
                // resetForm()
            })
    },
});

export default ShelterFormik