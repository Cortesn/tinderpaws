import React, { useState } from "react";
import {
	Container,
	Grid,
	Typography,
	InputLabel,
	FormControl,
	MenuItem,
	Select,
} from "@mui/material";
import { pets } from "../TempData/petsData";
import { PetCard } from "../Components/adminpage/PetCard";
import useInputState from "../hooks/useInputState";

export const AdminPage = () => {
	const [petState, setPetState] = useState(pets);
	const [filter, handleFilterChange] = useInputState("");

	const deletePet = (id) => {
		setPetState(petState.filter((pet) => pet.id !== id));
	};

  const filterPets = (e) => {
    handleFilterChange(e);
    const type = e.target.value;
    if (type === "all") {
      setPetState(pets)
    } else {
      setPetState(pets.filter((pet)=> pet.type ===type));
    }
  }

	return (
		<Container>
			<Grid container alignItems="center" sx={{ mt: "4rem", mb: "2rem" }}>
				<Grid container item xs={6}>
					<Typography variant="h3">Shelter Animals</Typography>
				</Grid>
				<Grid item xs={6}>
					<FormControl fullWidth size="small">
						<InputLabel id="search-label">Choose</InputLabel>
						<Select
							labelId="search-label"
							label="Choose"
							id="search"
							value={filter}
							onChange={filterPets}
						>
							<MenuItem value="all">All</MenuItem>
							<MenuItem value="dog">Dog</MenuItem>
							<MenuItem value="cat">Cat</MenuItem>
							<MenuItem value="fox">Fox</MenuItem>
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
