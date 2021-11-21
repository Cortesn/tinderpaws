import React, { useState, useEffect } from "react";
import {api, setToken} from '../helperFunctions/axiosInstace'
import {
	Grid,
} from "@mui/material";
// import { useParams } from "react-router";
import AnimalFilterSection from "../Components/userpage/AnimalFilterSection";
import AnimalCardSection from "../Components/userpage/AnimalCardSection";

const UserHome = () => {
	const [petState, setPetState] = useState([]);  // Array of pets displayed on cards
	const [shelters, setShelters] = useState(null);  // Shelters for the filter
    // const id = useParams();
    //console.log(id)
	useEffect(() => {
		// Get all shelters from DB for Filter
		const url = "/filterSetting/shelters";
		api.get(url).then((response) => {
			setShelters(response.data);
		});
		// Get all pets from DB to show as initial page
		const petUrl = `/user/pets`;
        setToken(localStorage.token); // setting token to get user id
		api.get(petUrl).then((response) => {
			response.data.forEach((pet) => {
				pet.images = pet.images.split(",");
				pet.type = pet.animalType;
				pet.id = pet.pet_id;
				return pet;
			});
			setPetState(response.data);
		});
	}, []);


	return (
		<Grid container sx={{ width: "80%", mx: "auto" }}>
			<AnimalFilterSection shelters={shelters} setPetState={setPetState}/>
			<AnimalCardSection petState={petState} setPetState={setPetState}/>
		</Grid>
	);
};

export default UserHome;
