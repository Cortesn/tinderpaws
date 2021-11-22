import React from "react";
import {
	Typography,
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Grid,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import UserProfileUpdateForm from "../forms/UserProfileUpdateForm";
import AnimalFilterForm from "../forms/AnimalFilterForm";
import MatchesGrid from "../grids/MatchesGrid";
import UserAccordionState from "../../hooks/useAccordionState";

const AnimalFilterSection = ({shelters, setPetState}) => {
	const [expanded, handleChangeAccordion] = UserAccordionState(false);

	return (
		<Grid 
			item 
			xs={12} sm={12} md={6} lg={4} 
			sx={{ 
				display: { xs: 'none', md: 'block' },
				maxWidth: '650px'
				}}>
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
					<UserProfileUpdateForm/>
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
					{shelters && (
						<AnimalFilterForm
							shelters={shelters}
							setPetState={setPetState}
						/>
					)}
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
					<MatchesGrid/>
				</AccordionDetails>
			</Accordion>
		</Grid>
	);
};

export default AnimalFilterSection;
