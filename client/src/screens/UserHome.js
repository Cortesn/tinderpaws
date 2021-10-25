import React from "react";
import { Typography, Accordion, AccordionDetails, AccordionSummary, Grid, Button} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import UserProfileUpdateForm from "../Components/forms/UserProfileUpdateForm";
import AnimalFilterForm from "../Components/forms/AnimalFilterForm";
import MatchesGrid from "../Components/grids/MatchesGrid";
import UserAccordionState from "../hooks/useAccordionState";
import {useState, useEffect} from 'react';
import axios from 'axios';
import { useParams } from "react-router";


const UserHome = () => {
    const {id} = useParams();
    const [expanded, handleChangeAccordion] = UserAccordionState(false);
    // create hook for shelters 
    // const [shelters, handleGetShelter] = UseSettingsShelterState();
    const [shelters, setShelters] = useState(null);
    useEffect(() => {
        const url = 'http://localhost:3001/shelters';
        axios.get(url).then((response)=>{
            setShelters(response.data);
            });
        },[]);

    
    return ( 
        <Grid container>
            <Grid xs={12} sm={7} md={5} lg={4} xl={3} sx={{margin: 'auto'}} item>
                <Button>Hello</Button>
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
                        {shelters && <AnimalFilterForm shelters={shelters}/>}
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
                            <MatchesGrid user_id={id}/>
                        </AccordionDetails>
                    </Accordion>
            </Grid>
       </Grid>
     );
}
 
export default UserHome;