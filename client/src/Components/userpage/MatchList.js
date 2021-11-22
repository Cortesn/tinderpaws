import React from 'react'
import { 
    List,
} from '@mui/material';
import MatchItem from './MatchItem';

/* Returns a compiled list of user matches for a specific pet */
const MatchList = (props) => {
    const {matches} = props;
    // add a listener to check for new matches + addMatch
    // or check for chats with match.user_id
    return (
        <List> 
            {/* iterate through list of users */}
            {matches.map((match) => (
                    <MatchItem 
                        key={match.match_id} 
                        match={match} 
                        />   
                    )
                )
            }
        </List>
    )
}

export default MatchList;
