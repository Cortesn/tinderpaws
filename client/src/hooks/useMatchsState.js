import { useState } from "react";

const useMatchState = (initialValue) => {
    const [matches, setMatches] = useState(initialValue);

    const deleteMatch = (name) => {
        setMatches(matches.filter((user) => user !== name));
    }

    return [matches, deleteMatch];
};

export default useMatchState;
