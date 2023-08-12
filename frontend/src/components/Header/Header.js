import React from "react";
import headerLogo from "../../images/logo-header.svg";
import Navigation from "../Navigation/Navigation";
import { Link, NavLink } from "react-router-dom";
import useWindowWidth from "../../hooks/useWindowWidth";

function Header({ loggedIn }) {
  const windowWidth = useWindowWidth();
  const [isNavigationOpen, setisNavigationOpen] = React.useState(false);

  function handleNavigationOpen() {
    setisNavigationOpen(!isNavigationOpen);
  }

  return loggedIn && windowWidth < 900 ? (
    <>
      <Navigation
        isNavigationOpen={isNavigationOpen}
        handleNavigationOpen={handleNavigationOpen}
      />
      <header className="header">
        <Link to="/" className="link">
          <img className="header__logo" alt="Логотип шапки" src={headerLogo} />
        </Link>
        <div className="button header-menu" onClick={handleNavigationOpen}>
          <span className="header-menu__item"></span>
          <span className="header-menu__item"></span>
          <span className="header-menu__item"></span>
        </div>
      </header>
    </>
  ) : loggedIn && windowWidth > 900 ? (
    <header className="header">
      <Link to="/" className="link">
        <img className="header__logo" alt="Логотип шапки" src={headerLogo} />
      </Link>
      <nav className="header__films">
        <ul className="header__list">
          <li className="header__list-item">
            <NavLink
              to="/movies"
              className={({ isActive }) =>
                isActive
                  ? " link header__film header__film_active"
                  : "link header__film"
              }
            >
              Фильмы
            </NavLink>
          </li>
          <li className="header__list-item">
            <NavLink
              to="/saved-movies"
              className={({ isActive }) =>
                isActive
                  ? " link header__film header__film_active"
                  : "link header__film"
              }
            >
              Сохраненные фильмы
            </NavLink>
          </li>
        </ul>
      </nav>
      <Link to="/profile" className="button header__profile-button">
        Аккаунт
      </Link>
    </header>
  ) : (
    <header className="header">
      <Link to="/" className="link">
        <img className="header__logo" alt="Логотип шапки" src={headerLogo} />
      </Link>
      <div className="header__buttons">
        <Link to="/signup" className="button header__button">
          Регистрация
        </Link>
        <Link to="/signin" className="button header__button">
          Войти
        </Link>
      </div>
    </header>
  );
}

export default Header;
