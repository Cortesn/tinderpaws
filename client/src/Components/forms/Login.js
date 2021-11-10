import * as Yup from "yup";
import { useFormik } from "formik";
import {api, setToken} from '../../helperFunctions/axiosInstace'

// Formik Schema (users)
const loginValidation = () => Yup.object({
    email: Yup
        .string()
        .email('Please Enter a valid email')
        .required('Required'),
    password: Yup
        .string('Enter password')
        .required('Password is required'),
});

// formik state & login
const LoginFormik = ({...props}) => useFormik({
    initialValues: {
        email: '',
        password: '',
    },
    validationSchema: loginValidation(),
    onSubmit: (values, {resetForm, setFieldValue}) => {
        // make request
        api.post('/login', values )
            .then(function(response){
                // console.log(response)
                const {token} = response.data
                setToken(token)

                // remove error if exists
                setFieldValue('error', '')
                setFieldValue('success', 'Success!')
            
                props.handleAuthChange()
                // redirects page
                props.history.push('/')
            })
            .catch(function(error){
                console.log(error)
                // set error msg with formik
                setFieldValue('error', error.response.data.msg)
            })
            // might not need this promise -> always executes
            .then(function(){
                // resetForm()
            })
    },
});

export default LoginFormik