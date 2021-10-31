import React, { useState, useEffect, useMemo } from "react";
import {
	Typography,
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Grid,
	Button,
	IconButton,
	Container,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import UserProfileUpdateForm from "../Components/forms/UserProfileUpdateForm";
import AnimalFilterForm from "../Components/forms/AnimalFilterForm";
import MatchesGrid from "../Components/grids/MatchesGrid";
import UserAccordionState from "../hooks/useAccordionState";
import axios from "axios";
import { useParams } from "react-router";
import { Clear, Favorite } from "@mui/icons-material";
import { AnimalCard } from "../Components/userpage/AnimalCard";

const alreadyRemoved = [];

const UserHome = () => {
	//LEFT SIDE STATE
	const { id } = useParams();
	const [expanded, handleChangeAccordion] = UserAccordionState(false);
	// create hook for shelters
	// const [shelters, handleGetShelter] = UseSettingsShelterState();
	const [shelters, setShelters] = useState(null);
	useEffect(() => {
		console.log("inside useEffect");
		const url = "http://localhost:3001/filterSetting/shelters";
		axios.get(url).then((response) => {
			setShelters(response.data);
		});
        
        //Initial Screen will show all pets in DB
		const petUrl = "http://localhost:3001/user/pets";
		axios.get(petUrl).then((response) => {
			response.data.forEach((pet) => {
				pet.images = pet.images.split(",");
				pet.type = pet.animalType;
				pet.id = pet.pet_id;
				return pet;
			});
			setPetState(response.data);
		});
	}, []);

	// RIGHT SIDE STATE
	const [petState, setPetState] = useState([]);
	const [lastDirection, setLastDirection] = useState();

	const childRefs = useMemo(() => {
		console.log("from cR", petState);
		return Array(petState.length)
			.fill(0)
			.map((i) => React.createRef());
	}, [petState]);

	const swiped = (direction, idToDelete) => {
		console.log("removing: " + idToDelete + " " + direction);
		setLastDirection(direction);
		alreadyRemoved.push(idToDelete);
        console.log("alreadyRemoved",alreadyRemoved)
	};
    
	const outOfFrame = (id) => {
        console.log(id + " left the screen!");
        const charactersState = petState.filter(
            (character) => character.id !== id
        );
        setPetState(charactersState);
	};

	const swipe = (dir) => {
		const cardsLeft = petState.filter(
			(person) => !alreadyRemoved.includes(person.id)
		);
        console.log("cardsLeft",cardsLeft)
		if (cardsLeft.length) {
			const toBeRemoved = cardsLeft[cardsLeft.length - 1].id; // Find the card object to be removed
			console.log("tobeRemoved ", toBeRemoved);
            const index = petState
				.map((person) => person.id)
				.indexOf(toBeRemoved); // Find the index of which to make the reference to
			alreadyRemoved.push(toBeRemoved); // Make sure the next card gets removed next time if this card do not have time to exit the screen
            console.log("found index", index);
            console.log("childRefs", childRefs);
			childRefs[index].current.swipe(dir); // Swipe the card!
		}
	};

	return (
		<Grid container sx={{ width: "80%", mx: "auto" }}>
			<Grid
				xs={12}
				sm={7}
				md={5}
				lg={4}
				xl={3}
				sx={{ mx: "auto", mt: 3 }}
				item
			>
				<Accordion
					sx={{ width: "100%" }}
					expanded={expanded === "profileSettings"}
					onChange={handleChangeAccordion("profileSettings")}
				>
					<AccordionSummary
						expandIcon={<ExpandMoreIcon />}
						aria-controls="profile-settings-content"
						id="profile-settings-header"
					>
						<Typography sx={{ flexShrink: 0 }}>Profile</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<UserProfileUpdateForm user_id={id} />
					</AccordionDetails>
				</Accordion>
				<Accordion
					expanded={expanded === "filterSettings"}
					onChange={handleChangeAccordion("filterSettings")}
				>
					<AccordionSummary
						expandIcon={<ExpandMoreIcon />}
						aria-controls="filter-settings-content"
						id="filter-settings-header"
					>
						<Typography sx={{ width: "33%", flexShrink: 0 }}>
							Filter
						</Typography>
					</AccordionSummary>
					<AccordionDetails>
						{shelters && <AnimalFilterForm shelters={shelters} setPetState={setPetState}/>}
					</AccordionDetails>
				</Accordion>
				<Accordion
					expanded={expanded === "matches"}
					onChange={handleChangeAccordion("matches")}
				>
					<AccordionSummary
						expandIcon={<ExpandMoreIcon />}
						aria-controls="matches-content"
						id="matches-header"
					>
						<Typography sx={{ width: "33%", flexShrink: 0 }}>
							Matches
						</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<MatchesGrid user_id={id} />
					</AccordionDetails>
				</Accordion>
			</Grid>
			<Grid
				xs={12}
				sm={7}
				md={5}
				lg={4}
				xl={3}
				sx={{ margin: "auto" }}
				item
			>
				<Container
					xs={12}
					sm={9}
					md={8}
					lg={7}
					xl={6}
					sx={{
						display: "flex",
						justifyContent: "center",
						marginTop: "2vh",
						height: "720px",
					}}
					item
					container
				>
					{petState.map((pet, index) => (
						<AnimalCard
							pet={pet}
							key={pet.id}
							swiped={swiped}
							outOfFrame={outOfFrame}
							swipe={swipe}
							index={index}
							childRefs={childRefs}
						/>
					))}
				</Container>
				<Container sx={{ textAlign: "center" }}>
					<IconButton
						onClick={() => swipe("left")}
						color="secondary"
						sx={{ mr: "5vw" }}
					>
						<Clear fontSize="large" />
					</IconButton>
					<IconButton
						onClick={() => swipe("right")}
						color="error"
						sx={{ ml: "5vw" }}
					>
						<Favorite fontSize="large" />
					</IconButton>
				</Container>
			</Grid>
		</Grid>
	);
};

export default UserHome;
