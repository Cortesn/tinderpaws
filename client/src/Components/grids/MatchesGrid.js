import React, {useState, useEffect} from "react";
import { api, setToken } from "../../helperFunctions/axiosInstace";
import MatchList from "../userpage/MatchList";

const MatchesGrid = () => {
    // populating breeds drop down -- cant move out due to initial render
    const [matchesState, setMatchesState] = useState([]);
    useEffect(() => {
        setToken(localStorage.token)
        api.get(`/matches/pets`).then((response)=>{
            setMatchesState(response.data);
            });
        },[]);
    
    return (   
       < MatchList matches={matchesState}/>
     );
}
 
export default MatchesGrid;