import React, { useMemo } from "react";
import {
	Grid,
	IconButton,
	Container,
} from "@mui/material";
import { Clear, Favorite } from "@mui/icons-material";
import { AnimalCard } from "./AnimalCard";
import { api } from "../../helperFunctions/axiosInstace";

const alreadyRemoved = [];

const AnimalCardSection = ({petState, setPetState, id }) => {

	const childRefs = useMemo(() => {
		console.log("from cR", petState);
		return Array(petState.length)
			.fill(0)
			.map((i) => React.createRef());
	}, [petState]);

	const swiped = (direction, idToDelete) => {
		console.log("removing: " + idToDelete + " on the " + direction);
		// setLastDirection(direction);
		// Add pet-user pair to db matches table
		const data = { user_id: parseInt(id), pet_id: idToDelete };
		if (direction === "right") {
			api.post("/user/match", data).then((response) => {
				console.log(response.data);
			});
		}

		alreadyRemoved.push(idToDelete);
		console.log("alreadyRemoved", alreadyRemoved);
	};

	const outOfFrame = (id) => {
		console.log(id + " left the screen!");
		const charactersState = petState.filter(
			(character) => character.id !== id
		);
		console.log("before out of frame", petState);
		setPetState(charactersState);
		console.log("after out of frame", charactersState);
	};

	const swipe = (dir) => {
		const cardsLeft = petState.filter(
			(person) => !alreadyRemoved.includes(person.id)
		);
		console.log("cardsLeft", cardsLeft);
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
	);
};

export default AnimalCardSection;
