import { useState } from "react";

const useInput = (validate) => {
  const [inputValue, setInputValue] = useState("");
  const [inputIsTouched, setInputIsTouched] = useState(false);

  const inputIsInvalid = !validate(inputValue) && inputIsTouched;

  const inputChangeHandler = (event) => {
    setInputValue(event.target.value);
  };

  const inputBlurHandler = () => {
    setInputIsTouched(true);
  };

  return {
    inputValue,
    inputIsInvalid,
    inputChangeHandler,
    inputBlurHandler
  };
};

export default useInput;
