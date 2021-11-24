
import React from "react";
import {
	Typography,
	Accordion,
	AccordionDetails,
	AccordionSummary
} from "@mui/material";
import UserProfileUpdateForm from "../forms/UserProfileUpdateForm";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const ProfileUpdateAccordion = (props) => {
    const {expanded, handleChangeAccordion} = props;
    return(
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
    )
}
 
export default ProfileUpdateAccordion;