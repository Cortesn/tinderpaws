import { useState } from "react";

export default useInputState = (initialValue) => {
	const [value, setValue] = useInputState(initialValue);
	const handleChange = (e) => {
		setValue(e.target.value);
	};
	const reset = () => {
		setValue("");
	};
  return [value, handleChange, reset];
};
