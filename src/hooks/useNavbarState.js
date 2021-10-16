import { useState } from "react";

const useNavbarState = (initialValue) => {

    const [state, setState] = useState(initialValue);

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
        }

        setState({ ...state, [anchor]: open });
    };

    return [state, toggleDrawer];
};

export default useNavbarState;