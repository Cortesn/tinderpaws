import React, { useState } from "react";
import {
	Card,
	Snackbar,
	Paper,
	Stack,
	Grid,
	Typography,
	Stepper,
	Step,
	StepLabel,
} from "@mui/material";
import FormTemplate from "../Components/forms/FormTemplate.js";
import Alert from '@mui/material/Alert';
import { AddPetImages } from "../Components/addpetpage/AddPetImages.js";
import { Redirect } from "react-router";

const steps = ["Create Pet", "Add Images"];

/* Page to add a Pet*/
const AddPet = (props) => {
	// Employee id from authstate
	const { employee_id } = props.auth;
	// Pet will be returned after created
	const [pet, setPet] = useState({});
	// Handles change in stepper
	const [activeStep, setActiveStep] = useState(0);
	// Moves to next step in stepper
	const nextStep = () => {
		setActiveStep(activeStep + 1);
	};
	// snackbar alerts
	const [open, setOpen] = useState(false);
	const [snackMsg, setSnackMsg] = useState({});
	// displaying snackbar
	const handleOpen = (msg) => {
		setSnackMsg(msg);
		setOpen(true);
	};
	// closing snackbar
	const handleClose = (event) => {
		setOpen(false);
	};

	// handles logic for which step to display
	const currentPage = () => {
		if (activeStep === 0) {
			return (
				<Stack
					direction="column"
					justifyContent="flex-start"
					alignItems="center"
					spacing={2}
				>
					{/* Form to create pet */}
					<div style={{ width: "90%", marginBottom: 20 }}>
						<FormTemplate
							type={"addPet"}
							button={"Create Pet"}
							data={{
								employee_id: employee_id,
								setPet: setPet,
								nextStep: nextStep,
								pet:pet,
								snackBar: handleOpen
							}}
						/>
					</div>
				</Stack>
			);
		} else if (activeStep === 1) {
			return (
				<AddPetImages
					pet={{...pet, snackBar:handleOpen}}
					nextStep={nextStep}
				/>
			);
		} else if (activeStep === 2) {
			return <Redirect to="/adminHome" />;
		}
	};

	return (
		<Grid
			container
			item
			justifyContent="center"
			alignItems="stretch"
			direction="column"
			sx={{ margin: "auto" }}
			xs={12}
			sm={8}
			md={7}
			lg={6}
			xl={4}
		>
			<Grid item>
				<Typography variant="h3" align="center">
					Add A Pet
				</Typography>
			</Grid>
			<Grid item>
				<Card sx={{ maxWidth: "600px", margin: "auto !important" }}>
					<Paper elevation={10}>
						<Stepper activeStep={activeStep} sx={{ p: 5 }}>
							{steps.map((label, index) => {
								return (
									<Step key={label}>
										<StepLabel>{label}</StepLabel>
									</Step>
								);
							})}
						</Stepper>

						{currentPage()}
					</Paper>
				</Card>
			</Grid>
			{/* snackbar alerts */}
			<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
				{snackMsg.success ? (
					<Alert
						onClose={handleClose}
						severity="success"
						sx={{ width: "100%" }}
					>
						{snackMsg.success}
					</Alert>
				) : (
					<Alert
						onClose={handleClose}
						severity="error"
						sx={{ width: "100%" }}
					>
						{snackMsg.error}
					</Alert>
				)}
			</Snackbar>
		</Grid>
	);
};

export default AddPet;
