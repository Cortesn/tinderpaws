import React, {useState, useEffect} from "react";
import {Grid} from "@mui/material";
import createDynamicMatches from "../../helperFunctions/UserHome/createDynamicMatches";
import { api, setToken } from "../../helperFunctions/axiosInstace";
import MatchList from "../userpage/MatchList";

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
        // <Grid container direction={"column"} spacing={1}>
        //     {createDynamicMatches(matchesState)}
        // </Grid>     
       < MatchList matches={matchesState}/>
     );
}
 
export default MatchesGrid;