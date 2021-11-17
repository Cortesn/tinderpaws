import * as Yup from "yup";
import { useFormik } from "formik";
import {api} from '../../helperFunctions/axiosInstace'

// Formik Schema (users)
const passwordValidation = () => Yup.object({
    password: Yup
        .string('Enter password')
        .min(8, 'Minimum 8 characters')
        .required('Password is required'),
    passwordConfirm: Yup
        .string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
});

// formik state & login
const ResetPasswordFormik = (urlData, {...props}) => useFormik({
    initialValues: {
        password: '',
        passwordConfirm: ''
    },
    validationSchema: passwordValidation(),
    onSubmit: (values, {resetForm, setFieldValue}) => {
        // make a copy and clean data
        var data = JSON.parse(JSON.stringify(values))
        delete data.passwordConfirm
        data.email = urlData.email
        data.reset_key = urlData.reset_key

        // make request
        api.patch('/password/reset', data )
            .then(function(response){
                // remove error if exists
                setFieldValue('error', '')
                setFieldValue('success', response.data.msg)
                
                // redirects page
                props.history.push('/login')
            })
            .catch(function(error){
                console.log(error)
                // set error msg with formik
                setFieldValue('error', error.response.data.msg)
                // redirects page
                props.history.push('/login')
            })
            // might not need this promise -> always executes
            .then(function(){
                // resetForm()
            })
    },
});

export default ResetPasswordFormik