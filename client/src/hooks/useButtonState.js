import { useState } from "react";

const useButtonState = (initialValue) => {
    const [editClicked, setEditClicked] = useState(initialValue);

    const handleChange = () => {
        setEditClicked((prev) => !prev);
    };

    return [editClicked, handleChange];
};

export default useButtonState;

