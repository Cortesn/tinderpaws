import React from "react";
import {
	Typography,
	Accordion,
	AccordionDetails,
	AccordionSummary
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MatchesGrid from "../grids/MatchesGrid";

const MatchesAccordion = (props) => {
    const {expanded, handleChangeAccordion, handleOpen} = props;
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
            <MatchesGrid snackBar={handleOpen}/>
        </AccordionDetails>
    </Accordion>
    );
}
 
export default MatchesAccordion;