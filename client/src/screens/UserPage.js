import React, { useState, useMemo } from "react";
import { Container, IconButton } from "@mui/material";
import { Clear, Favorite } from "@mui/icons-material";
import { pets } from "../TempData/petsData";
import { AnimalCard } from "../Components/userpage/AnimalCard";

const alreadyRemoved = [];
let charactersState = pets;

export const UserPage = () => {
	const [petState, setPetState] = useState(pets);
	const [lastDirection, setLastDirection] = useState();

	const childRefs = useMemo(
		() =>
			Array(pets.length)
				.fill(0)
				.map((i) => React.createRef()),
		[]
	);

	const swiped = (direction, nameToDelete) => {
		console.log("removing: " + nameToDelete);
		setLastDirection(direction);
		alreadyRemoved.push(nameToDelete);
	};

	const outOfFrame = (name) => {
		console.log(name + " left the screen!");
		charactersState = charactersState.filter(
			(character) => character.name !== name
		);
		setPetState(charactersState);
	};

	const swipe = (dir) => {
		const cardsLeft = petState.filter(
			(person) => !alreadyRemoved.includes(person.name)
		);
		if (cardsLeft.length) {
			const toBeRemoved = cardsLeft[cardsLeft.length - 1].name; // Find the card object to be removed
			const index = pets
				.map((person) => person.name)
				.indexOf(toBeRemoved); // Find the index of which to make the reference to
			alreadyRemoved.push(toBeRemoved); // Make sure the next card gets removed next time if this card do not have time to exit the screen
			childRefs[index].current.swipe(dir); // Swipe the card!
		}
	};

	return (
		<>
			<Container sx={{display:"flex", flexDirection:"column", flex:1}}>
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
						height: "730px",
					}}
					item container
				>
					{petState.map((pet, index) => (
						<AnimalCard
							pet={pet}
							key={pet.name}
							swiped={swiped}
							outOfFrame={outOfFrame}
							swipe={swipe}
							index={index}
							childRefs={childRefs}
						/>
					))}
				</Container>
				<Container sx={{textAlign:"center"}}>
					<IconButton onClick={() => swipe("left")} color="secondary" sx={{mr:"5vw"}}>
						<Clear fontSize="large" />
					</IconButton>
					<IconButton onClick={() => swipe("right")} color="error" sx={{ml:"5vw"}}>
						<Favorite fontSize="large" />
					</IconButton>
				</Container>
			</Container>
		</>
	);
};
