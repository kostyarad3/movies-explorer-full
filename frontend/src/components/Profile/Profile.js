/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import useValidateForm from "../../hooks/useValidateForm";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Profile({ onUpdateUser, handleExitClick }) {
  const {
    handleInputChange,
    setInputValues,
    inputValues,
    inputErrors,
    isFormValid,
    emailError,
  } = useValidateForm();
  const currentUser = React.useContext(CurrentUserContext);
  const [areInputsdisabled, setAreInputsdisabled] = React.useState(true);
  const [isEditing, setIsEditing] = React.useState(false);

  React.useEffect(() => {
    setInputValues({ name: currentUser.name, email: currentUser.email });
  }, []);

  function handleSubmit(evt) {
    evt.preventDefault();
    const { name, email } = inputValues;
    onUpdateUser(name, email);
    setIsEditing(!isEditing);
    setAreInputsdisabled(!areInputsdisabled);
    return inputValues;
  }

  function handleEditClick() {
    setAreInputsdisabled(!areInputsdisabled);
    setIsEditing(!isEditing);
  }

  return (
    <section className="profile">
      <form className="profile-form" onSubmit={handleSubmit}>
        <h1 className="profile-form__heading">Привет, {currentUser.name}!</h1>
        <div className="profile-form__container">
          <p className="profile-form__text">Имя</p>
          <input
            className={`profile-form__input ${
              inputErrors.name ? "profile-form__input_invalid" : ""
            }`}
            type="name"
            name="name"
            id="name"
            placeholder="Имя"
            minLength="2"
            disabled={areInputsdisabled}
            value={inputValues?.name || ""}
            onChange={handleInputChange}
          />
          <label className="profile-form__input-error profile-form__input-error_name">
            {inputErrors.name}
          </label>
        </div>
        <div className="profile-form__container">
          <p className="profile-form__text">E-mail</p>
          <input
            className={`profile-form__input ${
              inputErrors.email ? "profile-form__input_invalid" : ""
            }`}
            type="email"
            name="email"
            placeholder="E-mail"
            id="email"
            minLength="5"
            disabled={areInputsdisabled}
            maxLength="50"
            value={inputValues?.email || ""}
            onChange={handleInputChange}
          />
          <label className="profile-form__input-error profile-form__input-error_email">
            {inputErrors.email || emailError}
          </label>
        </div>
        {isEditing ? (
          <>
            <button
              disabled={
                inputValues.name === currentUser.name &&
                inputValues.email === currentUser.email
              }
              type="submit"
              aria-label="Сохранение данных профиля"
              className={`button profile-form__save-button ${
                (inputValues.name === currentUser.name &&
                  inputValues.email === currentUser.email) ||
                !isFormValid
                  ? "profile-form__save-button_inactive"
                  : ""
              }`}
            >
              Сохранить
            </button>
          </>
        ) : (
          <>
            <p className="link profile-form__link" onClick={handleEditClick}>
              Редактировать
            </p>
            <p className="link profile-form__link" onClick={handleExitClick}>
              Выйти из аккаунта
            </p>
          </>
        )}
      </form>
    </section>
  );
}

export default Profile;
