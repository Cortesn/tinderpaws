import React from "react";
import { List, Button, Box } from "@mui/material";
import MatchItem from "./MatchItem";
import useButtonState from "../../hooks/useButtonState";

/* Returns a compiled list of user matches for a specific pet */
const MatchList = (props) => {
	const { matches, deleteMatch } = props;

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
					deleteMatch={deleteMatch}
					unmatch={unmatch}
				/>
			))}
			<Box sx={{textAlign: 'end', pt:1}}>
				<Button onClick={toggleUnmatch} sx={{ textTransform: "none" }}>
					{unmatch ? "done" : "edit"}
				</Button>
			</Box>
		</List>
	);
};

export default MatchList;
