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
} from "@mui/material";
import { NavigateBefore, NavigateNext, Clear, StarRate, Favorite } from "@mui/icons-material";
import { Navbar } from "../Components/Navbar";

const pets = [
	{
		name: "Skippy",
		type: "dog",
		breed: "Russell Terrier",
		description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eget condimentum lorem. Etiam et scelerisque urna, id auctor dolor. Sed feugiat ex ut nibh maximus, eget dapibus libero pellentesque. In in sapien venenatis, vulputate libero in, egestas ante. Donec tellus nisl, vehicula sit amet elit sit amet, aliquet aliquet odio. Aenean pharetra dictum enim in hendrerit. Praesent blandit fringilla porta. Aliquam erat volutpat. Nullam eget arcu ex. Aenean laoreet consequat ex, posuere porttitor dolor ultricies at. Nullam id mattis tellus, viverra sodales lectus. Sed lacinia velit id maximus pharetra. Phasellus volutpat justo arcu, nec tempus metus euismod quis.",
		shelter: "Happy Shelter",
		images: [
			"https://images.dog.ceo/breeds/terrier-russell/iguet1.jpeg",
			"https://images.dog.ceo/breeds/terrier-russell/iguet2.jpeg",
			"https://images.dog.ceo/breeds/terrier-russell/iguet3.jpeg",
			"https://images.dog.ceo/breeds/terrier-russell/iguet4.jpeg",
		],
	},
	{
		name: "Toto",
		type: "dog",
		breed: "Cairn Terrier",
		description: "I am a hap, hap, happe dog. I am a very, very happe dog",
		shelter: "Happy Shelter",
		images: [
			"https://images.dog.ceo/breeds/terrier-cairn/n02096177_1518.jpg",
			"https://images.dog.ceo/breeds/terrier-cairn/n02096177_2703.jpg",
			"https://images.dog.ceo/breeds/terrier-cairn/n02096177_342.jpg",
			"https://images.dog.ceo/breeds/terrier-cairn/n02096177_6700.jpg",
		],
	},
];

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

	return (
		<Box height="100vh" sx={{ backgroundColor: "#cadee3" }}>
			<Navbar />
			<Container>
				<Box
					sx={{
						display: "flex",
						flexFlow: "column",
						marginTop: "1rem",
						backgroundColor: "white",
					}}
				>
					<Card sx={{}}>
						<Box
							sx={{
								display: "flex",
								flexDirection: "row",
								justifyContent: "center",
								alignItems: "center",
							}}
						>
							<IconButton onClick={prevImg}>
								<NavigateBefore />
							</IconButton>
							<CardMedia
								component="img"
								image={pet.images[imgIdx]}
								alt="dog"
								sx={{ width: 300, height: 300 }}
							/>
							<IconButton onClick={nextImg}>
								<NavigateNext />
							</IconButton>
						</Box>
						<Typography align="center" variant="h6">
              {`${imgIdx + 1}/${pet.images.length}`}
            </Typography>
						<CardContent>
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
            <CardActions sx={{justifyContent: "space-around"}}>
              <IconButton onClick={prevImg} color="secondary">
								<Clear />
							</IconButton>
              <IconButton onClick={prevImg} color="warning">
								<StarRate />
							</IconButton>
              <IconButton onClick={prevImg} color="error">
								<Favorite />
							</IconButton>
            </CardActions>
					</Card>
				</Box>
			</Container>
		</Box>
	);
};
