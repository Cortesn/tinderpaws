import * as Yup from "yup";
import { useFormik } from "formik";
import { api, setToken } from "../../helperFunctions/axiosInstace";

// Formik Schema (shelters)
const petValidation = () =>
	Yup.object({
		name: Yup.string()
			.min(1, "Too Short!")
			.max(50, "Too Long!")
			.required("Required"),
		type: Yup.number().required("Required"),
		breed: Yup.string().required("Required"),
		status: Yup.number().required("Required"),
		dispositions: Yup.array().min(
			1,
			"At least one disposition is required"
		),
		description: Yup.string(),
	});

// formik state
const AddPetFormik = (data) =>
	useFormik({
		// validateOnChange: false,
		enableReinitialize: true, // allows to reset the initial fields (setting values from state)
		initialValues: {
			name: "",
			type: "",
			breed: "",
			status: "",
			dispositions: "",
			description: "",
		},
		validationSchema: petValidation(),
		onSubmit: (values, { resetForm, setFieldValue }) => {
			data = { ...data, ...values };
			console.log(data);
			setToken(localStorage.token)
			// make request
			api.post("/pets/", data).then(function (response) {
				console.log(response);
				if (response.status === 201) {
					console.log("Successfully Created Pet ");
				} else {
					console.error("Something went wrong");
				}
				data.setPet({...data.pet,
					pet_id:response.data.pet_id,
					name: data.name,
					type: data.type,
					breed: data.breed,
					status: data.status,
					description: data.description
				})
				// data.snackBar({success: "response.data.msg"})
				// redirects page to add images
				data.nextStep();
			});
		},
	});

export default AddPetFormik;
