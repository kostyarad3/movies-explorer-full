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

function App() {
  const navigate = useNavigate();
  const location = useLocation()
  // STATES
  const [currentUser, setCurrentUser] = React.useState({});
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [profileErrorText, setProfileErrorText] = React.useState(" ");
  const [loginErrorText, setLoginErrorText] = React.useState(" ");
  const [registerErrorText, setRegisterErrorText] = React.useState(" ");
  const [movies, setMovies] = React.useState([]);
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [checkBox, setCheckBox] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");
  const [searchValueSaved, setSearchValueSaved] = React.useState("")
  const [filteredMovies, setFilteredMovies] = React.useState([]);
  const [filteredSavedMovies, setFilteredSavedMovies] = React.useState([]);
  const [isPreloaderActive, setIsPreloaderActive] = React.useState(false);
  const [noMovieError, setNoMovieError] = React.useState(false);
  const [noMovieErrorText, setNoMovieErrorText] = React.useState("");

  //FUNCTIONS
  function handleCheckbox(evt) {
    evt.preventDefault();
    setCheckBox(!checkBox);
    localStorage.setItem("checkBox", JSON.stringify(!checkBox));
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
    MainApi.editUserInfo(name, email)
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
      MainApi.getContent(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            navigate(location, { replace: true });
            setCurrentUser(res.user)
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  function handleLikeMovie(movie) {
    // проверить, сохранен ли фильм, если да - то удалитьиз сохраненных
    if (isSavedMovie(movie)) {
      const newArr = savedMovies.filter(function (item) {
        return item.movieId !== movie.id;
      });
      setSavedMovies(newArr);
      localStorage.setItem("savedMovies", [JSON.stringify(newArr)]);
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

  function isSavedMovie(movie) {
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
      setCheckBox(JSON.parse(localStorage.getItem("checkBox")) || false);
      setIsPreloaderActive(true);
      moviesApi
        .getMovies()
        .then((data) => {
          localStorage.setItem("movies", JSON.stringify(data));
          setMovies(JSON.parse(localStorage.getItem("movies")));
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
  // эффект для поиска и фильтрации
  React.useEffect(() => {
    let filteredMovies = movies;
    let filteredSavedMovies = savedMovies;
    if (!searchValue) {
      filteredMovies = [];
    }
    if (!searchValueSaved) {
      filteredSavedMovies = savedMovies
    }
    if (searchValue) {
      filteredMovies = filteredMovies.filter((movie) =>
        movie.nameRU.toLowerCase().includes(searchValue.toLowerCase())
      );
      setNoMovieError(false);
      setNoMovieErrorText("");
    }
    if (searchValueSaved) {
      filteredSavedMovies = filteredSavedMovies.filter((movie) =>
      movie.nameRU.toLowerCase().includes(searchValueSaved.toLowerCase())
    );
    }
    if (checkBox) {
      filteredMovies = filteredMovies.filter((movie) => movie.duration <= 40);
      filteredSavedMovies = filteredSavedMovies.filter(
        (movie) => movie.duration <= 40
      );
    }
    if (filteredMovies.length === 0) {
      setNoMovieError(true);
      setNoMovieErrorText("Ничего не найдено");
    }
    setFilteredMovies(filteredMovies);
    setFilteredSavedMovies(filteredSavedMovies);
  }, [checkBox, searchValue, searchValueSaved, movies, savedMovies, location.pathname]);

  React.useEffect(() => {
    checkToken();
    setSavedMovies(JSON.parse(localStorage.getItem("savedMovies")) || []);
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
              <ProtectedRoute loggedIn={loggedIn}>
                <Header loggedIn={loggedIn} />
                <main className="main">
                  <Movies
                    movies={filteredMovies}
                    page="movies"
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                    checkBox={checkBox}
                    setCheckBox={setCheckBox}
                    handleCheckbox={handleCheckbox}
                    onLikeFilm={handleLikeMovie}
                    isSavedMovie={isSavedMovie}
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
                    checkBox={checkBox}
                    onDeleteFilm={handleDeleteMovie}
                    handleCheckbox={handleCheckbox}
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
                    ProfileErrorText={profileErrorText}
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
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
