import {useState} from 'react';
const UseShelterState = () => {
    // shelters selcted for final query 
    const [selectedShelters, setSelectedShelters] = useState(null);
    const handleSelectedShelters = (event, value) => setSelectedShelters(value);
    return  [selectedShelters, handleSelectedShelters];
}
 
export default UseShelterState;