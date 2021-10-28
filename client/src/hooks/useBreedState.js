import {useState} from 'react';
const UseBreedState = () => {
    // breeds selected for final query 
    const [selectedBreeds, setSelectedBreeds] = useState(null);
    const handleSelectedBreeds = (event, value)=> setSelectedBreeds(value);
    return  [selectedBreeds, handleSelectedBreeds];
}
 
export default UseBreedState;