import { useState } from "react";

const useFormPasswordState = (initialValue) =>{
    const [values, setValues] = useState(initialValue);

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    // password visability
    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return [values, handleChange, handleClickShowPassword, handleMouseDownPassword];
}

export default useFormPasswordState;
