import { useState } from "react";

const useMatchState = (initialValue) => {
    const [matches, setMatches] = useState(initialValue);

    const deleteMatch = (userId) => {
        setMatches(matches.filter((user) => user.userId !== userId));
    }

    return [matches, deleteMatch];
};

export default useMatchState;
