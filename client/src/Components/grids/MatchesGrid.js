import React, {useState, useEffect} from "react";
import {Grid} from "@mui/material";
// import PetsIcon from '@mui/icons-material/Pets';
import axios from'axios';
import createDynamicMatches from "../../helperFunctions/UserHome/createDynamicMatches";

const MatchesGrid = (props) => {
    // populating breeds drop down -- cant move out due to initial render
    const user_id = props.user_id
    const [matchesState, setMatchesState] = useState([]);
    useEffect(() => {
        const url = `http://localhost:3001/users/${user_id}/matches`;
        axios.get(url).then((response)=>{
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