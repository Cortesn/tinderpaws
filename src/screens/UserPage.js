import React, { useState } from "react";
import {
	Box,
	Typography,
	Card,
	CardContent,
	CardMedia,
	IconButton,
	CardActions,
	Grid,
	Paper,
} from "@mui/material";
import {
	NavigateBefore,
	NavigateNext,
	Clear,
	Favorite,
} from "@mui/icons-material";
import { pets, randomAnimal } from "../TempData/petsData";

export const UserPage = () => {
	const [pet, setPet] = useState(pets[0]);
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

	const nextAnimal = () => {
		setPet(randomAnimal());
		setImgIdx(0);
	};

	return (
		<Grid container>
			<Grid
				xs={12}
				sm={9}
				md={8}
				lg={7}
				xl={6}
				sx={{ margin: "auto" }}
				item
			>
				<Paper elevation={10}>
					<Card>
						<Box
							sx={{
								display: "flex",
								flexDirection: "row",
								justifyContent: "space-between",
								alignItems: "center",
								mx: 2,
							}}
						>
							<IconButton onClick={prevImg}>
								<NavigateBefore fontSize="large"/>
							</IconButton>
							<CardMedia
								component="img"
								image={pet.images[imgIdx]}
								alt={pet.name}
								sx={{
									maxWidth: "80%",
									height: 450,
									width: "auto",
									objectFit: "contain"
								}}
							/>
							<IconButton onClick={nextImg}>
								<NavigateNext fontSize="large"/>
							</IconButton>
						</Box>
						<Typography align="center" variant="h6">
							{`${imgIdx + 1}/${pet.images.length}`}
						</Typography>
						<CardContent sx={{mx:2}}>
							<Typography
								gutterBottom
								variant="h5"
								component="div"
							>
								{`${pet.type.toUpperCase()} - ${pet.breed}`}
							</Typography>
							<Typography
								gutterBottom
								variant="h5"
								component="div"
							>
								{pet.name}
							</Typography>
							<Typography variant="body2" color="text.secondary">
								{pet.description}
							</Typography>
						</CardContent>
						<CardActions sx={{ justifyContent: "space-around" }}>
							<IconButton onClick={nextAnimal} color="secondary">
								<Clear fontSize="large"/>
							</IconButton>
							<IconButton onClick={nextAnimal} color="error">
								<Favorite fontSize="large"/>
							</IconButton>
						</CardActions>
					</Card>
				</Paper>
			</Grid>
		</Grid>
	);
};
