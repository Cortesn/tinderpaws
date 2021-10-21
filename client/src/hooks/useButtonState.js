import { useState } from "react";

const useButtonState = (initialValue) => {
    const [buttonClicked, setButtonClicked] = useState(initialValue);

    const handleButtonChange = () => {
        setButtonClicked((prev) => !prev);
    };

    return [buttonClicked, handleButtonChange];
};

export default useButtonState;

