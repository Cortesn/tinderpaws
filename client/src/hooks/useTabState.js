import { useState } from "react";

const useTabState = (initialValue) => {

    // handles changing different tabs
    const [value, setValue] = useState(initialValue);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    // const handleChangeIndex = (index) => {
    //     setValue(index);
    // };

    return [value, handleChange];
};

export default useTabState;