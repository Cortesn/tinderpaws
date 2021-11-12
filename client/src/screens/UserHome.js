import React, { useState, useEffect } from "react";
import {api, setToken} from '../helperFunctions/axiosInstace'
import { Grid, useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles';
// import { useParams } from "react-router";
import AnimalFilterSection from "../Components/userpage/AnimalFilterSection2";
import AnimalCardSection from "../Components/userpage/AnimalCardSection";
import useButtonState from "../hooks/useButtonState";

const UserHome = (props) => {
	const [petState, setPetState] = useState([]);  // Array of pets displayed on cards
	const [shelters, setShelters] = useState(null);  // Shelters for the filter
    // const id = useParams();
    // console.log(petState)

	// reference to remove column spacing between cards
    const theme = useTheme();
    const desktop = useMediaQuery(theme.breakpoints.up('md')); 
	// toggle views in mobile
	const [buttonClicked, handleButtonChange] = useButtonState(false);


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
			// console.log(response)
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
		<Grid 
            container
            direction="row"
            justifyContent="center"
            alignItems="stretch"
            sx={{margin:'auto !important', maxWidth: 1400}} 
            columnSpacing={{ md: desktop ? 1 : 0 }}
            // ref={containerRef}
			>
			<AnimalFilterSection 
				buttonClicked={buttonClicked}
				handleButtonChange={handleButtonChange}
				shelters={shelters} 
				setPetState={setPetState}/>

			<AnimalCardSection 
				buttonClicked={buttonClicked}
				handleButtonChange={handleButtonChange}
				petState={petState} 
				setPetState={setPetState} 
				user_id={props.auth.user_id}/>
		</Grid>
	);
};

export default UserHome;
