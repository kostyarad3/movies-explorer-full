import React from 'react';

export default function useValidateForm() {

  const [inputValues, setInputValues] = React.useState({});
  const [isFormValid, setIsFormValid] = React.useState(false);
  const [inputErrors, setInputErrors] = React.useState({});
  const [emailError, setEmailError] = React.useState("")


  const handleInputChange = evt => {
    const { name, value } = evt.target;
    if (name === "email") {
      const validateEmailRegex = /^\S+@\S+\.\S+$/;
      const validEmail = validateEmailRegex.test(value);
      if (!validEmail) {
        setEmailError("Email не валиден");
      } else {
        setEmailError("")
      }
    }

    setInputValues({ ...inputValues, [name]: value });
    setIsFormValid(evt.target.closest('form').checkValidity());
    setInputErrors({ ...inputErrors, [name]: evt.target.validationMessage });
  };

  return { inputValues, inputErrors, isFormValid, setInputValues, handleInputChange, setIsFormValid, emailError };
};
