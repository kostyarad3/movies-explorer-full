/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import useValidateForm from "../../hooks/useValidateForm";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Profile({ onUpdateUser, handleExitClick, ProfileErrorText }) {
  const { handleInputChange, setInputValues, inputValues, isFormValid } =
    useValidateForm();
  const currentUser = React.useContext(CurrentUserContext);
  const [areInputsdisabled, setAreInputsdisabled] = React.useState(true);
  const [isEditing, setIsEditing] = React.useState(false);

  function handleSubmit(evt) {
    evt.preventDefault();
    const { name, email } = inputValues;
    onUpdateUser(name, email);
    setIsEditing(!isEditing);
    setAreInputsdisabled(!areInputsdisabled);
  }

  React.useEffect(() => {
    setInputValues({ name: currentUser.name, email: currentUser.email });
  }, []);

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
            className="profile-form__input"
            type="name"
            name="name"
            id="name"
            placeholder="Имя"
            minLength="2"
            disabled={areInputsdisabled}
            maxLength="20"
            value={inputValues?.name || ""}
            onChange={handleInputChange}
          />
        </div>
        <div className="profile-form__container">
          <p className="profile-form__text">E-mail</p>
          <input
            className="profile-form__input"
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
        </div>
        {isEditing ? (
          <>
            <span className="profile-form__error">{ProfileErrorText}</span>
            <button
              disabled={!isFormValid}
              type="submit"
              aria-label="Сохранение данных профиля"
              className={`button profile-form__save-button ${
                !isFormValid && "profile-form__save-button_inactive"
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
