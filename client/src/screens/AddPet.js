import React from "react";
import PetProfile from "../Components/petprofile/PetProfile.js";
import { Grid, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useButtonState from "../hooks/useButtonState";

/* Page to add a Pet: information, images, and matches */
const AddPet = () => {
	const theme = useTheme();

	const [buttonClicked, handleButtonChange] = useButtonState(false);

	return (
		<Grid
			container
			justifyContent="center"
			alignItems="stretch"
			sx={{ margin: "auto" }}
		>
			<Grid
				item
				xs={12}
				sm={8}
				md={7}
				lg={6}
				xl={4}
				sx={{
					display: {
            xs: buttonClicked ? "none" : "block",
						sm: "block",
					},
				}}
			>
        <Typography variant="h3" align="center">
          Add A Pet
        </Typography>
				{/* view matches in mobile */}

				<PetProfile />
			</Grid>
		</Grid>
	);
};

export default AddPet;
