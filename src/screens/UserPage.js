import React, { useState } from "react";
import { Grid } from "@mui/material";
import { pets } from "../TempData/petsData";
import { AnimalCard } from "../Components/userpage/AnimalCard";

export const UserPage = () => {
	const [petState, setPetState] = useState(pets);

	return (
		<Grid container>
			<Grid
				xs={12}
				sm={9}
				md={8}
				lg={7}
				xl={6}
				sx={{
					display: "flex",
					margin: "auto",
					justifyContent: "center",
					position: "relative",
				}}
				item
			>
				{petState.map((pet) => (
					<AnimalCard pet={pet} />
				))}
			</Grid>
		</Grid>
	);
};
