import React from "react";
import {
	Typography,
	Accordion,
	AccordionDetails,
	AccordionSummary
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AnimalFilterForm from "../forms/AnimalFilterForm";

const FilterAnimalAccordion = (props) => {
    const {expanded, 
        handleChangeAccordion, 
        shelters, 
        setPetState,
        success, 
        setSuccessState, 
        filterError, 
        setFilterErrorState
    } = props;
    return ( 
        <Accordion
        expanded={expanded === "filterSettings"}
        onChange={handleChangeAccordion("filterSettings")}
        onClick={()=>{
            setFilterErrorState(false)
		    setSuccessState(false)
        }}
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
                    success={success}
				    setSuccessState={setSuccessState}
				    filterError={filterError}
				    setFilterErrorState={setFilterErrorState}
                />
            )}
        </AccordionDetails>
    </Accordion>
     );
}
 
export default FilterAnimalAccordion;