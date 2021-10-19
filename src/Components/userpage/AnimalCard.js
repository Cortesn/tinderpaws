import React, { useState } from "react";
import {
	Box,
	Container,
	Typography,
	Card,
	CardContent,
	CardMedia,
	IconButton,
	Paper,
} from "@mui/material";
import { NavigateBefore, NavigateNext } from "@mui/icons-material";
import TinderCard from "react-tinder-card";

export const AnimalCard = ({ pet, swiped, outOfFrame, index, childRefs }) => {
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
		<Container sx={{ position: "absolute", alignContent:"stretch" }}>
			<TinderCard
				key={pet.name}
				ref={childRefs[index]}
				onSwipe={(dir) => swiped(dir, pet.name)}
				onCardLeftScreen={() => outOfFrame(pet.name)}
			>
				<Paper
					elevation={10}
					sx={{ position: "relative", border: 1, borderRadius: 10 }}
				>
					<Card sx={{ borderRadius: 10 }}>
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
								variant="h4"
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
							<Typography
								variant="body2"
								color="text.secondary"
								sx={{ height: 125, overflowY: "auto" }}
							>
								{pet.description}
							</Typography>
						</CardContent>
					</Card>
				</Paper>
			</TinderCard>
		</Container>
	);
};
