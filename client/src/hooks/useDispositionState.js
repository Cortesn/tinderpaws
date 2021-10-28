import { useState } from "react";

const UseDispositionState = () => {
    // dispositions
    const [disposition, setDisposition] = useState({
        OtherAnimals:false,
        Children: false,
        Leashed: false,
        Available: false,
        Pending: false

    });
    const handleDispositionChange = (event) => {
        setDisposition({
          ...disposition,
          [event.target.name]: event.target.checked,
        });
      };
    
    // const { OtherAnimals, Children, Leashed, Unavailable, Available, Pending} = state;

    return [disposition, handleDispositionChange];
}
 
export default UseDispositionState;