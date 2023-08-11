import React from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import moviesApi from "../../utils/MoviesApi";
import * as MainApi from "../../utils/MainApi";
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
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Popup from "../Popup/Popup";
import PopupSuccess from "../../images/infotooltip-success.svg";
import PopupFailure from "../../images/infotooltip-failure.svg";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  // STATES
  const [currentUser, setCurrentUser] = React.useState({});
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [loginErrorText, setLoginErrorText] = React.useState(" ");
  const [registerErrorText, setRegisterErrorText] = React.useState(" ");
  const [movies, setMovies] = React.useState([]);
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [checkBoxMovies, setCheckBoxMovies] = React.useState(false);
  const [checkBoxSavedMovies, setCheckBoxSavedMovies] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");
  const [searchValueSaved, setSearchValueSaved] = React.useState("");
  const [filteredMovies, setFilteredMovies] = React.useState([]);
  const [filteredSavedMovies, setFilteredSavedMovies] = React.useState([]);
  const [isPreloaderActive, setIsPreloaderActive] = React.useState(false);
  const [noMovieError, setNoMovieError] = React.useState(false);
  const [noMovieErrorText, setNoMovieErrorText] = React.useState("");
  const [popupText, setPopupText] = React.useState("");
  const [popupImage, setPopupImage] = React.useState(null);
  const [isPopupOpen, setIsPopupOpen] = React.useState(false);
  //FUNCTIONS
  function handleClosePopup() {
    setIsPopupOpen(false);
  }

  function handleRegistration(name, email, password) {
    MainApi.register(name, email, password)
      .then((res) => {
        if (res.name) {
          handleLogin(email, password);
        }
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
    MainApi.login(email, password)
      .then((res) => {
        if (res) {
          setLoggedIn(true);
          navigate("/movies", { replace: true });
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
    MainApi.editUserInfo(name, email)
      .then((updatedUserInfo) => {
        setCurrentUser(updatedUserInfo);
        setPopupImage(PopupSuccess);
        setPopupText("Изменения данных успешны!");
        setIsPopupOpen(true);
      })
      .catch((err) => {
        if (err) {
          console.log(err);
          setPopupImage(PopupFailure);
          setPopupText("При обновлении пользователя произошла ошибка");
          setIsPopupOpen(true);
        }
        if (err.includes(409)) {
          console.log(err);
          setPopupImage(PopupFailure);
          setPopupText("Пользователь с таким email уже существует.");
          setIsPopupOpen(true);
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
      MainApi.getContent(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            navigate(location, { replace: true });
            setCurrentUser(res.user);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  function handleLikeMovie(movie) {
    // проверить, сохранен ли фильм, если да - то удалить из сохраненных
    if (isMovieSaved(movie)) {
      savedMovies.map((item) => {
        if (item.movieId === movie.id) {
          handleDeleteMovie(item);
        }
      });
    } else {
      MainApi.saveMovie(movie).then((data) => {
        const savedMovie = data.movie;
        //чтобы при множественном клике на сохранить заново не добавлялся фильм в сохраненные
        const newSavedMovies = savedMovies.filter(
          (item) => item.movieId !== savedMovie.movieId
        );
        setSavedMovies([savedMovie, ...newSavedMovies]);
        localStorage.setItem("savedMovies", [
          JSON.stringify([savedMovie, ...newSavedMovies]),
        ]);
      });
    }
  }

  function getSavedMovies() {
    MainApi.getSavedMovies()
      .then((data) => {
        setSavedMovies(data.data);
        localStorage.setItem("savedMovies", JSON.stringify(data.data));
      })
      .catch((err) => console.log(err));
  }

  function isMovieSaved(movie) {
    return savedMovies.some((item) => item.movieId === movie.id);
  }

  function handleDeleteMovie(movie) {
    MainApi.deleteMovie(movie._id).then(() => {
      const newSavedMovies = savedMovies.filter(
        (item) => item.movieId !== movie.movieId
      );
      localStorage.setItem("savedMovies", JSON.stringify(newSavedMovies));
      setSavedMovies(newSavedMovies);
    });
  }
  // EFFECTS
  React.useEffect(() => {
    if (loggedIn) {
      getSavedMovies();
      setIsPreloaderActive(true);
      moviesApi
        .getMovies()
        .then((data) => {
          setMovies(data);
        })
        .catch((err) => {
          setNoMovieError(true);
          setNoMovieErrorText(
            `Во время запроса произошла ошибка.
             Возможно, проблема с соединением или
             сервер недоступен.
             Подождите немного и попробуйте ещё раз`
          );
          console.log(err);
        })
        .finally(() => {
          setIsPreloaderActive(false);
        });
      MainApi.getUserInfo()
        .then((data) => {
          setCurrentUser(data.user);
        })
        .catch((err) => console.log(err));
    }
  }, [loggedIn]);

  React.useEffect(() => {
    let filteredMovies = movies;
    if (!searchValue) {
      filteredMovies = [];
      localStorage.setItem("filteredMovies", JSON.stringify(filteredMovies));
    }
    if (searchValue) {
      filteredMovies = filteredMovies.filter((movie) =>
        movie.nameRU.toLowerCase().includes(searchValue.toLowerCase())
      );
      localStorage.setItem("filteredMovies", JSON.stringify(filteredMovies));
      setNoMovieError(false);
      setNoMovieErrorText("");
    }
    if (filteredMovies.length === 0 && searchValue) {
      setNoMovieError(true);
      setNoMovieErrorText("Ничего не найдено");
    }
    setFilteredMovies(filteredMovies);
  }, [searchValue, movies]);

  React.useEffect(() => {
    let filteredSavedMovies = savedMovies;
    if (!searchValueSaved) {
      filteredSavedMovies = savedMovies;
    }
    if (searchValueSaved) {
      filteredSavedMovies = filteredSavedMovies.filter((movie) =>
        movie.nameRU.toLowerCase().includes(searchValueSaved.toLowerCase())
      );
      setNoMovieError(false);
      setNoMovieErrorText("");
    }
    setFilteredSavedMovies(filteredSavedMovies);
  }, [searchValueSaved, savedMovies, location]);

  React.useEffect(() => {
    let filteredMovies = JSON.parse(localStorage.getItem("filteredMovies"));
    let filteredSavedMovies = savedMovies;
    if (checkBoxMovies) {
      filteredMovies = filteredMovies.filter((movie) => movie.duration <= 40);
    }
    if (checkBoxSavedMovies) {
      filteredSavedMovies = filteredSavedMovies.filter(
        (movie) => movie.duration <= 40
      );
    }
    setFilteredMovies(filteredMovies);
    setFilteredSavedMovies(filteredSavedMovies);
  }, [checkBoxMovies, checkBoxSavedMovies, movies]);

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
              <ProtectedRoute loggedIn={!loggedIn}>
                <main>
                  <Login
                    handleLogin={handleLogin}
                    LoginErrorText={loginErrorText}
                  />
                </main>
              </ProtectedRoute>
            }
          />

          <Route
            path="/signup"
            element={
              <ProtectedRoute loggedIn={!loggedIn}>
                <main>
                  <Register
                    handleRegistration={handleRegistration}
                    RegisterErrorText={registerErrorText}
                  />
                </main>
              </ProtectedRoute>
            }
          />

          <Route
            path="/movies"
            element={
              <ProtectedRoute loggedIn={loggedIn}>
                <Header loggedIn={loggedIn} />
                <main className="main">
                  <Movies
                    movies={filteredMovies}
                    page="movies"
                    setSearchValue={setSearchValue}
                    checkBoxMovies={checkBoxMovies}
                    setCheckBoxMovies={setCheckBoxMovies}
                    onLikeFilm={handleLikeMovie}
                    onDeleteFilm={handleDeleteMovie}
                    isMovieSaved={isMovieSaved}
                    isPreloaderActive={isPreloaderActive}
                    noMovieError={noMovieError}
                    noMovieErrorText={noMovieErrorText}
                  />
                </main>
                <Footer />
              </ProtectedRoute>
            }
          />

          <Route
            path="/saved-movies"
            element={
              <ProtectedRoute loggedIn={loggedIn}>
                <Header loggedIn={loggedIn} />
                <main className="main">
                  <SavedMovies
                    savedMovies={filteredSavedMovies}
                    page="savedMovies"
                    setSearchValue={setSearchValueSaved}
                    searchValue={searchValueSaved}
                    checkBoxSavedMovies={checkBoxSavedMovies}
                    setCheckBoxSavedMovies={setCheckBoxSavedMovies}
                    onDeleteFilm={handleDeleteMovie}
                  />
                </main>
                <Footer />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute loggedIn={loggedIn}>
                <Header loggedIn={loggedIn} />
                <main className="main">
                  <Profile
                    onUpdateUser={handleUpdateUser}
                    handleExitClick={handleExitClick}
                  />
                </main>
              </ProtectedRoute>
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
        <Popup
          text={popupText}
          image={popupImage}
          isOpen={isPopupOpen}
          onClose={handleClosePopup}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
