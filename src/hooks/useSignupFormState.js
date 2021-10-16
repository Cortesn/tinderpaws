import { useState } from "react";

const useSignupFormState = (initialValue) =>{
    const [values, setValues] = useState(initialValue);
    
    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    // password visability
    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword1: !values.showPassword1,
            showPassword2: !values.showPassword2,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return [values, handleChange, handleClickShowPassword, handleMouseDownPassword];
}

export default useSignupFormState;
