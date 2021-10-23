import * as Yup from "yup";
import { useFormik } from "formik";
import axios from 'axios'

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
    onSubmit: (values, {resetForm}) => {
        console.log(values)
        console.log('hello world')
        // validator={() => ({})}
        // alert(JSON.stringify(values));
        resetForm();
    },
});

export default EmployeeFormik