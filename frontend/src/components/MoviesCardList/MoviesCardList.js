import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import useWindowWidth from "../../hooks/useWindowWidth";
import Preloader from "../Preloader/Preloader";
import NoMovieError from "../NoMovieError/NoMovieError";
import { ONE_ROW_WIDTH, TWO_ROWS_WIDTH } from "../../utils/constants.js";

function MoviesCardList({
  movies,
  page,
  onLikeFilm,
  onDeleteFilm,
  isMovieSaved,
  isPreloaderActive,
  noMovieError,
  noMovieErrorText,
}) {
  const [numberOfMovies, setNubmerOfMovies] = React.useState();
  const [maxNumberOfMovies, setMaxNubmerOfMovies] = React.useState();
  const windowWidth = useWindowWidth();
  //изменяет количество фильмов при отображении страницы
  React.useEffect(() => {
    setNubmerOfMovies(movies.length);
    if (page === "movies") {
      movies = JSON.parse(localStorage.getItem("filteredMovies")) || [];
    } else {
      movies = JSON.parse(localStorage.getItem("savedMovies"));
    }
  }, [page, movies, window.location.href]);
  // измененние количества доступных фильмов при отображениее
  React.useEffect(() => {
    if (page === "savedMovies") {
      return setMaxNubmerOfMovies(movies.length);
    }
    if (windowWidth < ONE_ROW_WIDTH) {
      setMaxNubmerOfMovies(5);
    } else if (windowWidth < TWO_ROWS_WIDTH) {
      setMaxNubmerOfMovies(8);
    } else {
      setMaxNubmerOfMovies(12);
    }
  }, [windowWidth]);
  // функция добавления фильмов
  function addMoreFilms() {
    if (windowWidth < ONE_ROW_WIDTH) {
      setMaxNubmerOfMovies(maxNumberOfMovies + 2);
    } else if (windowWidth < TWO_ROWS_WIDTH) {
      setMaxNubmerOfMovies(maxNumberOfMovies + 2);
    } else {
      setMaxNubmerOfMovies(maxNumberOfMovies + 3);
    }
  }

  const moviesElements = movies.slice(0, maxNumberOfMovies).map((movie) => (
    <li key={movie.id || movie.movieId} className="movie">
      <MoviesCard
        movie={movie}
        page={page}
        onLikeFilm={onLikeFilm}
        onDeleteFilm={onDeleteFilm}
        isMovieSaved={isMovieSaved}
      />
    </li>
  ));

  return (
    <section>
      {isPreloaderActive ? <Preloader /> : <></>}
      <ul className="movies-cardlist">{moviesElements}</ul>
      {noMovieError ? (
        <NoMovieError noMovieErrorText={noMovieErrorText} />
      ) : (
        <></>
      )}
      <button
        type="button"
        aria-label="Загрузить еще фильмы"
        className={`button movies-cardlist__button ${
          numberOfMovies <= 3 ||
          numberOfMovies <= maxNumberOfMovies ||
          page === "savedMovies"
            ? "movies-cardlist__button_hidden"
            : ""
        }`}
        onClick={addMoreFilms}
      >
        Ещё
      </button>
    </section>
  );
}

export default MoviesCardList;
