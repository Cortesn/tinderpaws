import * as Yup from "yup";
import { useFormik } from "formik";
import {api} from '../../helperFunctions/axiosInstace'


// Formik Schema (shelters)
const petValidation = () => Yup.object({
    name: Yup
        .string()
        .min(1, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    type: Yup
        .number()
        .required('Required'),
    breed: Yup
        .string()
        .required('Required'),
    status: Yup
        .number()
        .required('Required'),
    dispositions: Yup 
        .array()
        .min(1, 'At least one disposition is required'),
    description: Yup
        .string()
});

// formik state
const PetInfoFormik =(data)=> useFormik({
    // validateOnChange: false,
    enableReinitialize: true, // allows to reset the initial fields (setting values from state)
    initialValues: {
        name: data.name,
        type: data.type,
        breed: data.breed,
        status: data.status,
        dispositions: data.dispositions,
        description: data.description
    },
    validationSchema: petValidation(),
    onSubmit: (values, {resetForm, setFieldValue}) => {
        // make request
        api.patch('/pets/' + data.pet_id, values )
            .then(function(response){
                // set the new pet data
                // console.log(response)
                data.setPet(values)
                data.snackBar({success: response.data.msg})
            })
            .catch(function(error){
                // set error msg with formik
                console.log(error)
                data.snackBar({error: error.response.data.msg})
            })
    },
    // validator: () => ({}) // used to chatch error while testing
});

export default PetInfoFormik
