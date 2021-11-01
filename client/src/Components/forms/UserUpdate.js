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
});

// formik state & create new user
const UserUpdateFormik = (initialValues, onSubmitFunction) => useFormik({
    initialValues: initialValues,
    validationSchema: userValidation(),
    onSubmit: (values) => {
        onSubmitFunction(values)
    },
});

export default UserUpdateFormik