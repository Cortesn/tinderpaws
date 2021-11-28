import React from "react";
import {
	Typography,
	Accordion,
	AccordionDetails,
	AccordionSummary,
    Button
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MatchesGrid from "../grids/MatchesGrid";
import useButtonState from "../../hooks/useButtonState";

const MatchesAccordion = (props) => {
    const {expanded, handleChangeAccordion, handleOpen} = props;
    const [unmatch, toggleUnmatch] = useButtonState(false);
    return ( 
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
            <Button onClick={toggleUnmatch} sx={{ textTransform: "none" }}>
			    {unmatch ? "Done" : "Edit"}
			</Button>
            <MatchesGrid snackBar={handleOpen} unmatch={unmatch}/>
        </AccordionDetails>
    </Accordion>
    );
}
 
export default MatchesAccordion;