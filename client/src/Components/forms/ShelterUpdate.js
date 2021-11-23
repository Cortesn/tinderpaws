import * as Yup from "yup";
import { useFormik } from "formik";
import { api } from "../../helperFunctions/axiosInstace";


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
        .required('Required')
});

// formik state
const ShelterUpdateFormik =(data, shelter_id)=> useFormik({
    initialValues: {
        sname: data.name,
        street: data.street,
        city: data.city,
        state: data.state,
        zip: data.zip
    },
    validationSchema: shelterValidation,
    onSubmit: (values) => {
        api.patch(`/shelters/${shelter_id}`, values).then((response)=>{
            if(response.status === 200){
                alert("Successfully updated profile! :) ")
            }else{
                console.error("Something went wrong");
            }
        })
    },
});

export default ShelterUpdateFormik