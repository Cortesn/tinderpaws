import React, {useState} from "react";
import {
	Button,
	Card,
	CardActions,
	CardContent,
	CardMedia,
	Grid,
	Typography,
	IconButton,
} from "@mui/material";
import { NavigateBefore, NavigateNext } from "@mui/icons-material";

export const PetCard = ({ pet, deletePet }) => {
  const [imgIdx, setImgIdx] = useState(0);

	const prevImg = () => {
		if (imgIdx > 0) {
			setImgIdx(imgIdx - 1);
		}
	};

	const nextImg = () => {
		if (imgIdx < pet.images.length - 1) {
			setImgIdx(imgIdx + 1);
		}
	};

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
				<Grid container sx={{position:"relative"}}>
					<IconButton onClick={prevImg}
						sx={{
							position: "absolute",
							color: "white",
							top: "40%",
              display: imgIdx===0 ? "none" : "block"
						}}
            >
						<NavigateBefore fontSize="large" />
					</IconButton>
					<CardMedia
						component="img"
						alt={pet.name}
						image={pet.images[imgIdx]}
						height="300"
						sx={{ objectFit: "cover" }}
            />
					<IconButton onClick={nextImg}
						sx={{
							position: "absolute",
							color: "white",
							top: "40%",
              right: "0",
              display: imgIdx===pet.images.length - 1 ? "none" : "block"
						}}
					>
						<NavigateNext fontSize="large" />
					</IconButton>
				</Grid>
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
