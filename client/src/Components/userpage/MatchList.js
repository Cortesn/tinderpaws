import React from "react";
import { List, Button } from "@mui/material";
import MatchItem from "./MatchItem";
import useButtonState from "../../hooks/useButtonState";

/* Returns a compiled list of user matches for a specific pet */
const MatchList = (props) => {
	const { matches } = props;

	const [unmatch, toggleUnmatch] = useButtonState(false);
	// add a listener to check for new matches + addMatch
	// or check for chats with match.user_id
	return (
		<List>
			{/* iterate through list of users */}
			{matches.map((match) => (
				<MatchItem
					key={match.pet_id}
					match={match}
					unmatch={unmatch}
				/>
			))}
			<Button onClick={toggleUnmatch} sx={{ textTransform: "none" }}>
				{unmatch ? "done" : "edit"}
			</Button>
		</List>
	);
};

export default MatchList;
