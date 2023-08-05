import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import api from "../../utils/api";
import * as auth from "../../utils/auth";
// ДВА ФАЙЛА НИЖЕ ДЛЯ ПРОВЕРКИ КАРТОЧЕК ФИЛЬМОВ
import { moviesArray } from "../../utils/constants";
import { savedMoviesArray } from "../../utils/constants";
import "../../index.css";
import Main from "../Main/Main";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Page404 from "../Page404/Page404";
import Profile from "../Profile/Profile";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";

function App() {
  const navigate = useNavigate();
  // STATES
  const [currentUser, setCurrentUser] = React.useState({});
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [profileErrorText, setProfileErrorText] = React.useState(" ");
  const [loginErrorText, setLoginErrorText] = React.useState(" ");
  const [registerErrorText, setRegisterErrorText] = React.useState(" ");
  const [movies, setMovies] = React.useState(moviesArray);
  const [savedMovies, setSavedMovies] = React.useState(savedMoviesArray);

  //FUNCTIONS
  function findMoviesByQuery(searchValue, movies) {
    if (!searchValue) {
      return movies;
    }
    const newMoviesArray = movies.filter((movie) => {
      return movie.nameRU.toLowerCase().includes(searchValue.toLowerCase());
    });
    return newMoviesArray;
  }

  function handleMoviesSearch(searchValue, movies) {
    setMovies(findMoviesByQuery(searchValue, movies));
  }

  function handleSavedMoviesSearch(searchValue, savedMovies) {
    setSavedMovies(findMoviesByQuery(searchValue, savedMovies));
  }

  function handleRegistration(name, email, password) {
    auth
      .register(name, email, password)
      .then((res) => {
        navigate("./sign-in", { replace: true });
      })
      .catch((err) => {
        if (err) {
          console.log(err);
          setRegisterErrorText("При регистрации пользователя произошла ошибка");
        }
        if (err.includes(409)) {
          setRegisterErrorText("Пользователь с таким email уже существует.");
        }
      });
  }

  function handleLogin(email, password) {
    auth
      .login(email, password)
      .then((res) => {
        if (res) {
          setLoggedIn(true);
          navigate("/", { replace: true });
        }
      })
      .catch((err) => {
        setLoggedIn(false);
        if (err) {
          console.log(err);
          setLoginErrorText("При авторизации произошла ошибка.");
        }
        if (err.includes(401)) {
          setLoginErrorText("Вы ввели неправильный логин или пароль.");
        }
      });
  }

  function handleUpdateUser(name, email) {
    api
      .editUserInfo(name, email)
      .then((updatedUserInfo) => {
        setCurrentUser(updatedUserInfo);
      })
      .catch((err) => {
        if (err) {
          console.log(err);
          setProfileErrorText("При обновлении пользователя произошла ошибка");
        }
        if (err.includes(409)) {
          setProfileErrorText("Пользователь с таким email уже существует.");
        }
      });
  }

  function handleExitClick() {
    setLoggedIn(false);
    localStorage.clear();
    navigate("/", { replace: true });
  }

  function checkToken() {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth
        .getContent(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            navigate("/", { replace: true });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  React.useEffect(() => {
    if (loggedIn) {
      api
        .getUserInfo()
        .then((data) => {
          setCurrentUser(data.user);
        })
        .catch((err) => console.log(err));
    }
  }, [loggedIn]);

  // EFFECTS
  React.useEffect(() => {
    checkToken();
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header loggedIn={loggedIn} />
                <Main />
                <Footer />
              </>
            }
          />

          <Route
            path="/signin"
            element={
              <main>
                <Login
                  handleLogin={handleLogin}
                  LoginErrorText={loginErrorText}
                />
              </main>
            }
          />

          <Route
            path="/signup"
            element={
              <main>
                <Register
                  handleRegistration={handleRegistration}
                  RegisterErrorText={registerErrorText}
                />
              </main>
            }
          />

          <Route
            path="/movies"
            element={
              <>
                <Header loggedIn={loggedIn} />
                <main className="main">
                  <Movies
                    movies={movies}
                    page="movies"
                    handleSearch={handleMoviesSearch}
                  />
                </main>
                <Footer />
              </>
            }
          />

          <Route
            path="/saved-movies"
            element={
              <>
                <Header loggedIn={loggedIn} />
                <main className="main">
                  <SavedMovies
                    savedMovies={savedMovies}
                    page="savedMovies"
                    handleSearch={handleSavedMoviesSearch}
                  />
                </main>
                <Footer />
              </>
            }
          />

          <Route
            path="/profile"
            element={
              <>
                <Header loggedIn={loggedIn} />
                <main className="main">
                  <Profile
                    onUpdateUser={handleUpdateUser}
                    handleExitClick={handleExitClick}
                    ProfileErrorText={profileErrorText}
                  />
                </main>
              </>
            }
          />

          <Route
            path="*"
            element={
              <main className="main">
                <Page404 />
              </main>
            }
          />
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
