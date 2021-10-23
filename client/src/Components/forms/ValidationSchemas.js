import * as Yup from "yup";
import { useFormik } from "formik";


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
        // validator={() => ({})}
        // alert(JSON.stringify(values));
        resetForm();
    },
});

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
    onSubmit: (values, {resetForm}) => {
        console.log(values)
        console.log('hello world')
        // validator={() => ({})}
        // alert(JSON.stringify(values));
        resetForm();
    },
});

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

// export { userValidation, shelterValidation, employeeValidation };
export { UserFormik, ShelterFormik, EmployeeFormik}