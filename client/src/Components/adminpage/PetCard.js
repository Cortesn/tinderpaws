import React from "react";
import {
	Button,
	Card,
	CardActions,
	CardContent,
	CardMedia,
	Grid,
	Typography,
} from "@mui/material";

export const PetCard = ({ pet, deletePet }) => {
	return (
		<Grid
			item
			xs={12}
			md={6}
			lg={4}
			container
			justifyContent="center"
			sx={{ px: 0 }}
		>
			<Card sx={{ width: 345 }}>
				<CardMedia
					component="img"
					alt={pet.name}
					image={pet.images[0]}
					height="300"
					sx={{ objectFit: "cover" }}
				/>
				<CardContent sx={{ textAlign: "center" }}>
					<Typography variant="h5">{pet.name}</Typography>
				</CardContent>
				<CardActions
					sx={{
						display: "flex",
						justifyContent: "center",
						pt: 0,
					}}
				>
					<Button
						size="large"
						variant="contained"
						color="error"
						onClick={() => deletePet(pet.id)}
					>
						Delete Profile
					</Button>
				</CardActions>
			</Card>
		</Grid>
	);
};
