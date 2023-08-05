import React from "react";
import headerLogo from "../../images/logo-header.svg";
import { Link } from "react-router-dom";
import useValidateForm from "../../hooks/useValidateForm";

function Register({ handleRegistration, RegisterErrorText }) {
  const { inputValues, inputErrors, isFormValid, handleInputChange } =
    useValidateForm();

  function handleSubmit(evt) {
    evt.preventDefault();
    const { name, email, password } = inputValues;
    handleRegistration(name, email, password);
  }

  return (
    <section className="register">
      <form className="register-form" onSubmit={handleSubmit}>
        <Link to="/" className="link auth__image">
          <img alt="Логотип шапки" src={headerLogo} />
        </Link>
        <h1 className="register-form__title">Добро пожаловать!</h1>
        <p className="register-form__input-name">Имя</p>
        <input
          type="name"
          className="register-form__input"
          name="name"
          id="name"
          placeholder="Имя"
          required
          minLength="2"
          maxLength="40"
          value={inputValues?.name || ""}
          onChange={handleInputChange}
        />
        <label className="register-form__input-error">{inputErrors.name}</label>
        <p className="register-form__input-name">E-mail</p>
        <input
          type="email"
          className="register-form__input"
          name="email"
          id="email"
          placeholder="E-mail"
          required
          minLength="5"
          maxLength="40"
          value={inputValues?.email || ""}
          onChange={handleInputChange}
        />
        <label className="register-form__input-error">
          {inputErrors.email}
        </label>
        <p className="register-form__input-name">Пароль</p>
        <input
          type="password"
          className="register-form__input"
          name="password"
          id="password"
          placeholder="Пароль"
          required
          minLength="6"
          maxLength="40"
          value={inputValues?.password || ""}
          onChange={handleInputChange}
        />
        <label className="register-form__input-error">
          {inputErrors.password}
        </label>
        <label className="register-form__error">{RegisterErrorText}</label>
        <button
          type="submit"
          aria-label="Зарегестрироваться"
          disabled={!isFormValid}
          className={`button register-form__button ${
            !isFormValid && "register-form__button_inactive"
          }`}
        >
          Зарегестрироваться
        </button>
        <p className="register-form__text">
          Уже зарегестрированы?&nbsp;
          <Link to="/signin" className="link register-form__link">
            Войти
          </Link>
        </p>
      </form>
    </section>
  );
}
export default Register;
