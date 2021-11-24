import * as Yup from "yup";
import { useFormik } from "formik";
import { api, setToken } from "../../helperFunctions/axiosInstace";

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
const UserUpdateFormik = (initialValues) => useFormik({
    initialValues: initialValues,
    validationSchema: userValidation(),
    onSubmit: (values, {setFieldValue}) => {
        let url = `/userProfileUpdate/update`;
        setToken(localStorage.token)
        api.patch(url, values).then((response)=>{
            if(response.status === 200){
                setFieldValue('error', '')
                setFieldValue('success', 'Success!')
                //alert("Successfully updated profile! :) ")
            }else{
                console.error("Something went wrong");
            }
        })
    },
});

export default UserUpdateFormik