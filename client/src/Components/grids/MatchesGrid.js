import React, {useState, useEffect} from "react";
import {Grid} from "@mui/material";
// import PetsIcon from '@mui/icons-material/Pets';
import createDynamicMatches from "../../helperFunctions/UserHome/createDynamicMatches";
import { api, setToken } from "../../helperFunctions/axiosInstace";

const MatchesGrid = () => {
    // populating breeds drop down -- cant move out due to initial render
    const [matchesState, setMatchesState] = useState([]);
    useEffect(() => {
        const url = `/matches/users/user`;
        setToken(localStorage.token)
        api.get(url).then((response)=>{
            setMatchesState(response.data);
            });
        },[]);
    
    return ( 
        <Grid container direction={"column"} spacing={1}>
            {createDynamicMatches(matchesState)}
        </Grid>         
     );
}
 
export default MatchesGrid;