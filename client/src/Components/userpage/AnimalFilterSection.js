import React from "react";
import {Grid, useMediaQuery} from "@mui/material";
import UserAccordionState from "../../hooks/useAccordionState";
import ProfileUpdateAccordion from "./ProfileUpdateAccordion";
import FilterAnimalAccordion from "./FilterAnimalAccordion";
import MatchesAccordion from "./MatchesAccordion";
import { useTheme } from '@mui/material/styles';

const AnimalFilterSection = ({shelters, setPetState, success, setSuccessState, filterError, setFilterErrorState}) => {
	const [expanded, handleChangeAccordion] = UserAccordionState(false);
	// reference to remove column spacing between cards
    const theme = useTheme();
    const desktop = useMediaQuery(theme.breakpoints.up('sm'));
	return (
		<Grid 
			item 
			xs={12} sm={12} md={6} lg={4} 
			sx={{ 
				display: { xs: 'none', md: 'block' },
				maxWidth: desktop? '420px ! important' : '370px ! important'
				}}>
			<div style={{width: '95%', marginLeft: 'auto'}}>
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
			</div>
		</Grid>
	);
};

export default AnimalFilterSection;
