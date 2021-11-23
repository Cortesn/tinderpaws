import React, { useState } from "react";
import {
	Card,
	CardActions,
	CardActionArea,
	CardContent,
	CardMedia,
	Grid,
	Typography,
	IconButton,
} from "@mui/material";
import { Link } from "react-router-dom";
import { NavigateBefore, NavigateNext } from "@mui/icons-material";
import { createTheme, ThemeProvider } from "@mui/material";
import { DeletePetButton } from "./DeletePetButton";

const theme = createTheme({
	typography: {
		fontFamily: 'Kavoon'
	}
})

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

	const status = ['🕙 Not Available', '🤩 Available', '🔔 Pending', '💖 Adopted'];
	const types = {
		'Dog': '🐶',
		'Cat': '😻',
		'Other': '🐾'
	}

	return (
		<Grid
			item
			xs={12}
			md={6}
			lg={4}
			container
			justifyContent="center"
			sx={{ px: 0, display: pet.display ? "block" : "none" }}
		>
			<Card sx={{ width: 345 , display:"stretch"}}>
				<Grid container sx={{ position: "relative" }}>
					<IconButton
						onClick={prevImg}
						sx={{
							position: "absolute",
							color: "white",
							top: "40%",
							display: imgIdx === 0 ? "none" : "block",
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
					<IconButton
						onClick={nextImg}
						sx={{
							position: "absolute",
							color: "white",
							top: "40%",
							right: "0",
							display:
								imgIdx === pet.images.length - 1
									? "none"
									: "block",
						}}
					>
						<NavigateNext fontSize="large" />
					</IconButton>
				</Grid>
				<Link to={`/admin/edit/${pet.pet_id}`} id={`${pet.name}`} style={{textDecoration:"none", color:"black"}}>
					<CardActionArea>
						<CardContent sx={{ textAlign: "center" }}>
							<ThemeProvider theme={theme}>
								<Typography variant="h3">{pet.name}</Typography>
							</ThemeProvider>
							<Typography variant="h6">{types[pet.type]} {pet.breed}</Typography>
							<Typography variant="h6">{status[pet.status-1]}</Typography>
						</CardContent>
					</CardActionArea>
				</Link>
				<CardActions
					sx={{
						display: "flex",
						justifyContent: "center",
						pt: 0,
					}}
				>
					<DeletePetButton deletePet={deletePet} pet={pet}/>
				</CardActions>
			</Card>
		</Grid>
	);
};