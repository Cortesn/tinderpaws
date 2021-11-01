import React, {useState, useEffect} from "react";
import {Grid} from "@mui/material";
import {api} from '../../helperFunctions/axiosInstace'
import createDynamicMatches from "../../helperFunctions/UserHome/createDynamicMatches";

const MatchesGrid = (props) => {
    // populating breeds drop down -- cant move out due to initial render
    const user_id = props.user_id
    const [matchesState, setMatchesState] = useState([]);
    useEffect(() => {
        api.get(`/matches/users/${user_id}`).then((response)=>{
            setMatchesState(response.data);
            });
        },[user_id]);
    
    return ( 
        <Grid container direction={"column"} spacing={1}>
            {createDynamicMatches(matchesState)}
        </Grid>         
     );
}
 
export default MatchesGrid;