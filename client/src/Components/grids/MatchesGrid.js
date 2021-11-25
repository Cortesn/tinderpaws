import React, { useEffect} from "react";
import { api, setToken } from "../../helperFunctions/axiosInstace";
import useDeleteItemState from "../../hooks/useDeleteItemState";
import MatchList from "../userpage/MatchList";

const MatchesGrid = ({snackBar}) => {
    // populating breeds drop down -- cant move out due to initial render
    const [matchesState, setMatchesState,, deleteMatch] = useDeleteItemState([]);
    useEffect(() => {
        setToken(localStorage.token)
        api.get(`/matches/pets`).then((response)=>{
            setMatchesState(response.data);
            });
        });
    
    return (   
       < MatchList matches={matchesState} deleteMatch={deleteMatch} snackBar={snackBar}/>
     );
}
 
export default MatchesGrid;