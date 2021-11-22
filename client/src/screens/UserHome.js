import React, { useState, useEffect } from "react";
import {api, setToken} from '../helperFunctions/axiosInstace'
import { Grid, useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles';
import AnimalFilterSection from "../Components/userpage/AnimalFilterSection";
import AnimalCardSection from "../Components/userpage/AnimalCardSection";


const UserHome = (props) => {
	const [petState, setPetState] = useState([]);  // Array of pets displayed on cards
	const [shelters, setShelters] = useState(null);  // Shelters for the filter

	// reference to remove column spacing between cards
    const theme = useTheme();
    const desktop = useMediaQuery(theme.breakpoints.up('md')); 

	useEffect(() => {
		// Get all shelters from DB for Filter
		const url = "/filterSetting/shelters";
		api.get(url).then((response) => {
			setShelters(response.data);
		});
		// Get all pets from DB to show as initial page
		if (petState.length === 0){
			setToken(localStorage.token); // setting token to get user id
			api.get('/pets').then((response) => {
				const noMorePets = {
					images: ['/assets/images/nomorepets.png'],
					pet_id: null
				}
				// add the 'no more pets' placeholder to the front of the list
				response.data.unshift(noMorePets)
				// console.log(response.data)
				setPetState(response.data);
			});
		}
	}, []);


	return (
		<Grid 
            container
            direction="row"
            justifyContent="center"
            alignItems="stretch"
            sx={{margin:'auto !important', maxWidth: 1400}} 
            columnSpacing={{ md: desktop ? 1 : 0 }}
			>
			
			<AnimalFilterSection 
				shelters={shelters} 
				setPetState={setPetState}/>
			
			<AnimalCardSection 
				petState={petState} 
				setPetState={setPetState}/>

		</Grid>
	);
};

export default UserHome;
