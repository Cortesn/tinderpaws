import { useState } from "react";

const UserAccordionState = (initialValue) => {
    // accordion expansion
    const [expanded, setExpanded] = useState(initialValue);

    const handleChangeAccordion = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    
    return [expanded, handleChangeAccordion];
}
 
export default UserAccordionState;