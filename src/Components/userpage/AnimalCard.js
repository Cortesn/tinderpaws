import React, { useState } from "react";
import {
	Box,
	Container,
	Typography,
	Card,
	CardContent,
	CardMedia,
	IconButton,
	CardActions,
	Paper,
} from "@mui/material";
import {
	NavigateBefore,
	NavigateNext,
	Clear,
	Favorite,
} from "@mui/icons-material";
import TinderCard from "react-tinder-card";

export const AnimalCard = ({ pet }) => {
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
		<Container sx={{ display: "block", position: "absolute" }}>
			<TinderCard key={pet.name} preventSwipe={["up", "down"]}>
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
								<NavigateBefore fontSize="large" />
							</IconButton>
							<CardMedia
								component="img"
								image={pet.images[imgIdx]}
								alt={pet.name}
								sx={{
									maxWidth: "80%",
									height: 450,
									width: "auto",
									objectFit: "contain",
								}}
							/>
							<IconButton onClick={nextImg}>
								<NavigateNext fontSize="large" />
							</IconButton>
						</Box>
						<Typography align="center" variant="h6">
							{`${imgIdx + 1}/${pet.images.length}`}
						</Typography>
						<CardContent sx={{ mx: 2 }}>
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
							<IconButton
								// onClick={}
								color="secondary"
							>
								<Clear fontSize="large" />
							</IconButton>
							<IconButton
								// onClick={}
								color="error"
							>
								<Favorite fontSize="large" />
							</IconButton>
						</CardActions>
					</Card>
				</Paper>
			</TinderCard>
		</Container>
	);
};
