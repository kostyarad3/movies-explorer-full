import React from "react";
import { Link } from "react-router-dom";

function Navigation({ isNavigationOpen, handleNavigationOpen }) {
  return (
    <nav
      className={`navigation ${isNavigationOpen ? "navigation_opened" : ""}`}
    >
      <ul className="navigation__list">
        <li className="navigation__list-item">
          <Link
            to="/"
            className="link navigation__link"
            onClick={handleNavigationOpen}
          >
            Главная
          </Link>
        </li>
        <li className="navigation__list-item">
          <Link
            to="/movies"
            className="link navigation__link"
            onClick={handleNavigationOpen}
          >
            Фильмы
          </Link>
        </li>
        <li className="navigation__list-item">
          <Link
            to="/saved-movies"
            className="link navigation__link"
            onClick={handleNavigationOpen}
          >
            Сохраненные фильмы
          </Link>
        </li>
        <li className="navigation__list-item">
          <Link
            to="/profile"
            className="button navigation__button"
            onClick={handleNavigationOpen}
          >
            Аккаунт
          </Link>
        </li>
        <button
          onClick={handleNavigationOpen}
          className="button button_type_close"
          type="button"
          aria-label="Закрыть"
        ></button>
      </ul>
    </nav>
  );
}

export default Navigation;
