import { useState } from "react";
const UseAnimalFilterState = () => {
    // animals
    const [state, setState] = useState({
        Dog: false,
        Cat: false,
        Other: false
    });

    const handleAnimalSelectionChange = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.checked,
        });
        };
        
    return [state, handleAnimalSelectionChange]
}
 
export default UseAnimalFilterState;