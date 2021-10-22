import React from "react";
import { Typography, Accordion, AccordionDetails, AccordionSummary, Grid} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import UserProfileUpdateForm from "../Components/forms/UserProfileUpdateForm";
import AnimalFilterForm from "../Components/forms/AnimalFilterForm";
import MatchesGrid from "../Components/grids/MatchesGrid";
import UserAccordionState from "../hooks/useAccordionState";

const UserHome = () => {
    const [expanded, handleChangeAccordion] = UserAccordionState(false);

    return ( 
        <Grid container>
            <Grid xs={12} sm={7} md={5} lg={4} xl={3} sx={{margin: 'auto'}} item>
                <Accordion sx={{width: "100%"}} expanded={expanded === 'profileSettings'} onChange={handleChangeAccordion('profileSettings')}>
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="profile-settings-content"
                    id="profile-settings-header"
                    >
                        <Typography sx={{ flexShrink: 0 }}>
                            Profile
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                            <UserProfileUpdateForm/>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'filterSettings'} onChange={handleChangeAccordion('filterSettings')}>
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="filter-settings-content"
                    id="filter-settings-header"
                    >
                        <Typography sx={{ width: '33%', flexShrink: 0 }}>
                            Filter
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <AnimalFilterForm/>
                    </AccordionDetails>
                </Accordion>
                    <Accordion expanded={expanded === 'matches'} onChange={handleChangeAccordion('matches')}>
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="matches-content"
                        id="matches-header"
                        >
                            <Typography sx={{ width: '33%', flexShrink: 0 }}>
                                Matches
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <MatchesGrid/>
                        </AccordionDetails>
                    </Accordion>
            </Grid>
       </Grid>
     );
}
 
export default UserHome;