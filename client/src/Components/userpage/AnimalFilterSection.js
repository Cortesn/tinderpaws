import React from "react";
import {Grid} from "@mui/material";
import UserAccordionState from "../../hooks/useAccordionState";
import ProfileUpdateAccordion from "./ProfileUpdateAccordion";
import FilterAnimalAccordion from "./FilterAnimalAccordion";
import MatchesAccordion from "./MatchesAccordion";

const AnimalFilterSection = ({shelters, setPetState, success, setSuccessState, filterError, setFilterErrorState}) => {
	const [expanded, handleChangeAccordion] = UserAccordionState(false);
	
	return (
		<Grid 
			item 
			xs={12} sm={12} md={6} lg={4} 
			sx={{ 
				display: { xs: 'none', md: 'block' },
				maxWidth: '650px'
				}}>
			<ProfileUpdateAccordion
				expanded={expanded}
				handleChangeAccordion={handleChangeAccordion}
			/>
			<FilterAnimalAccordion
				expanded={expanded}
				handleChangeAccordion={handleChangeAccordion}
				shelters={shelters}
				setPetState={setPetState}
				success={success}
				setSuccessState={setSuccessState}
				filterError={filterError}
				setFilterErrorState={setFilterErrorState}
			/>
			<MatchesAccordion
				expanded={expanded}
				handleChangeAccordion={handleChangeAccordion}
			/>
		</Grid>
	);
};

export default AnimalFilterSection;
