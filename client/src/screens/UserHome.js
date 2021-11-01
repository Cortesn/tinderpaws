import React, { useState, useEffect, useMemo } from "react";
import {
	Grid,
} from "@mui/material";
import axios from "axios";
import { useParams } from "react-router";
import AnimalFilterSection from "../Components/userpage/AnimalFilterSection";
import AnimalCardSection from "../Components/userpage/AnimalCardSection";

// const alreadyRemoved = [];

const UserHome = () => {
	const { id } = useParams(); // User Id from URL
	const [petState, setPetState] = useState([]);  // Array of pets displayed on cards
	const [lastDirection, setLastDirection] = useState();
	const [shelters, setShelters] = useState(null);  // Shelters for the filter

	useEffect(() => {
		// Get all shelters from DB for Filter
		const url = "http://localhost:3001/filterSetting/shelters";
		axios.get(url).then((response) => {
			setShelters(response.data);
		});
		// Get all pets from DB to show as initial page
		const petUrl = `http://localhost:3001/user/${id}/pets`;
		axios.get(petUrl).then((response) => {
			response.data.forEach((pet) => {
				pet.images = pet.images.split(",");
				pet.type = pet.animalType;
				pet.id = pet.pet_id;
				return pet;
			});
			setPetState(response.data);
		});
	}, [id]);


	return (
		<Grid container sx={{ width: "80%", mx: "auto" }}>
			<AnimalFilterSection shelters={shelters} id={id} setPetState={setPetState}/>
			<AnimalCardSection petState={petState} setPetState={setPetState} id={id}/>
		</Grid>
	);
};

export default UserHome;
