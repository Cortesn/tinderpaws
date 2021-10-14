import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { Pets as PetsIcon } from "@mui/icons-material";
import { Navbar } from "../Components/Navbar";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import useInputState from "../hooks/useInputState";

export const LoginScreen = () => {
	const [user, handleChangeUser, resetUser] = useInputState("");
	const [password, handleChangePassword, resetPassword] = useInputState("");

	const handleSubmit = () => {
		resetUser();
		resetPassword();
	};

	return (
		<Box height="100vh" sx={{backgroundColor: "#cadee3"}}>
			<Navbar />
			<Box
				sx={{
					textAlign: "center",
				}}
			>
				<Box
					sx={{
						border: 1,
            borderRadius: "5px",
						display: "flex",
						flexFlow: "column",
						maxWidth: "40%",
            margin: "auto",
            padding: "2rem",
            marginTop: "10rem",
            backgroundColor: "white"
					}}
				>
					<Typography variant="h2">
						Tinder Paws <PetsIcon sx={{ fontSize: "4rem" }} />
					</Typography>
					<Typography variant="h5" sx={{ marginBottom: "1rem" }}>Log in to account</Typography>
					<ValidatorForm
						onSubmit={handleSubmit}
						instantValidate={false}
					>
						<TextValidator
							value={user}
							placeholder="Username"
							name="username"
							margin="normal"
							onChange={handleChangeUser}
							validators={["required"]}
							errorMessages={["Enter a username"]}
              sx={{width:"50%"}}
						/>
						<TextValidator
							value={password}
              type="password"
							placeholder="Password"
							name="password"
							margin="normal"
							onChange={handleChangePassword}
							validators={["required"]}
							errorMessages={["Enter a password"]}
              sx={{width:"50%"}}
						/>
						<Button
							variant="contained"
							type="submit"
							color="primary"
              size="large"
              sx={{ marginTop: "2rem" }}
						>
							Submit
						</Button>
					</ValidatorForm>
				</Box>
			</Box>
		</Box>
	);
};
