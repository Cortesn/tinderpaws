import * as Yup from "yup";
import { useFormik } from "formik";
import {api} from '../../helperFunctions/axiosInstace'

// Formik Schema (users)
const passwordValidation = () => Yup.object({
    email: Yup
        .string()
        .email('Please Enter a valid email')
        .required('Required')
});

// formik state & login
const ForgotPasswordFormik = ({...props}) => useFormik({
    initialValues: {
        email: ''
    },
    validationSchema: passwordValidation(),
    onSubmit: (values, {resetForm, setFieldValue}) => {
   
        // make request
        api.post('/password/forgot', values )
            .then(function(response){
                // only alert that request was sent
                // remove error if exists
                setFieldValue('error', '')
                setFieldValue('success', response.data.msg)
                // redirects back to login page
                props.history.push('/login')
            })
            .catch(function(error){
                console.log(error)
                // set error msg with formik
                // only send error if there was a server error not for invalid emails
                setFieldValue('error', error.response.data.msg)
                // redirects back to login page
                props.history.push('/login')
            })
            // might not need this promise -> always executes
            .then(function(){
                // resetForm()
            })
    },
});

export default ForgotPasswordFormik