import * as Yup from "yup";
import { useFormik } from "formik";
import { api } from "../../helperFunctions/axiosInstace";
import { Redirect } from "react-router";

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
			// make request
			api.post("/pets", data).then(function (response) {
				console.log(response);
				if (response.status === 201) {
					alert("Successfully Created Pet ");
				} else {
					console.error("Something went wrong");
				}

				// redirects page
				window.location = "/adminHome";
			});
		},
		// validator: () => ({}) // used to catch error while testing
	});

export default AddPetFormik;
