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
    dispositions: Yup // mot sure about this checkbox
        .string()
        .required('Required'),
    description: Yup
        .string()
        .required('Required')
});

// formik state
const PetInfoFormik =(data)=> useFormik({
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
        // api.post('/', values )
        //     .then(function(response){
        //         // console.log(response)
            
        //         // redirects page
        //         window.location = '/'
        //     })
        //     .catch(function(error){
        //         console.log(error)
        //         // set error msg with formik
        //     })
        //     // might not need this promise -> always executes
        //     .then(function(){
        //         // resetForm()
        //     })
    },
});

export default PetInfoFormik
