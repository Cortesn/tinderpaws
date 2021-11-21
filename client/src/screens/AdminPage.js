import React, { useState, useEffect } from "react";
// import { useParams } from "react-router";
import {
	Container,
	Grid,
	Typography,
	InputLabel,
	FormControl,
	MenuItem,
	Select,
} from "@mui/material";
import { PetCard } from "../Components/adminpage/PetCard";
import useInputState from "../hooks/useInputState";
import { api, setToken } from "../helperFunctions/axiosInstace";

export const AdminPage = () => {
	// const { id } = useParams(); // User Id from URL
	const [petState, setPetState] = useState([]);
	const [filter, handleFilterChange] = useInputState("");

	useEffect(() => {
		// Get all shelter pets from DB to show as initial page
		const petUrl = `/adminHome/pets`;
		setToken(localStorage.token)
		api.get(petUrl).then((response) => {
			response.data.forEach((pet) => {
				pet.images = pet.images.split(",");
				pet.type = pet.animalType;
				pet.id = pet.pet_id;
				pet.display = true;
				return pet;
			});
			console.log(response.data);
			setPetState(response.data);
		});
	}, []);

	const deletePet = (id) => {
		setPetState(petState.filter((pet) => pet.id !== id));

		// Delete from DB
		const deleteUrl = `/adminHome/pet/${id}`;
		api.delete(deleteUrl).then((response) => {
			console.log(response.data);
		});
	};

	const filterPets = (e) => {
		handleFilterChange(e);
		const type = e.target.value;
		const filtered = petState.map((pet) => {
			if (type === "all") {
				pet.display = true;
			} else {
				console.log(pet, type)
				pet.display = pet.type.toLowerCase() === type.toLowerCase();
			}
			return pet;
		});

		setPetState(filtered);
	};

	const animalTypes = ["all", "dog", "cat", "other"];

	return (
		<Container sx={{pb:5}}>
			<Grid container alignItems="center" sx={{ mt: "4rem", mb: "2rem" }}>
				<Grid container item xs={6}>
					<Typography variant="h3">Shelter Animals</Typography>
				</Grid>
				<Grid item xs={6}>
					<FormControl fullWidth size="small">
						<InputLabel id="search-label">Choose Animal</InputLabel>
						<Select
							labelId="search-label"
							label="Choose Animal"
							id="search"
							value={filter}
							onChange={filterPets}
						>
							{/* <Grid container alignItems='stretch'> */}
								{animalTypes.map((animal) => {
									const formattedAnimal =
										animal[0].toUpperCase() + animal.slice(1);
									return (
										<MenuItem key={animal} value={animal}>
											{formattedAnimal}
										</MenuItem>
									);
								})}
							{/* </Grid> */}
						</Select>
					</FormControl>
				</Grid>
			</Grid>
			<Grid container alignContent="center" spacing={10}>
				{petState.map((pet) => (
					<PetCard key={pet.id} pet={pet} deletePet={deletePet} />
				))}
			</Grid>
		</Container>
	);
};
