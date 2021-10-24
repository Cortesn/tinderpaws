import * as Yup from "yup";
import { useFormik } from "formik";
import {api, setToken} from '../../helperFunctions/axiosInstace'

// Formik Schema (employee)
const employeeValidation = () => Yup.object({
    shelterOptions: Yup
        .string()
        .required('Required'),
    employeeId: Yup
        .string()
        .min(1, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    name: Yup
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

// formik state
const EmployeeFormik = () => useFormik({
    initialValues: {
        shelterOptions: '',
        employeeId: '',
        name: '',
        email: '',
        password: '',
        passwordConfirm: ''
    },
    validationSchema: employeeValidation(),
    onSubmit: (values, {resetForm, setFieldValue}) => {
        // make a copy and clean data
        var data = JSON.parse(JSON.stringify(values))
        delete data.passwordConfirm

        // make request
        api.post('/signup/employee', data )
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

export default EmployeeFormik