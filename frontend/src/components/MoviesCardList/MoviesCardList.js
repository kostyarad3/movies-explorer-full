import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import useWindowWidth from '../../hooks/useWindowWidth'

function MoviesCardList({ movies, page}) {
  const [numberOfMovies, setNubmerOfMovies] = React.useState();
  const [maxNumberOfMovies, setMaxNubmerOfMovies] = React.useState();
  const windowWidth = useWindowWidth();
  //изменяет количество фильмов при отображении страницы
  React.useEffect(() => {
    setNubmerOfMovies(movies.length);
  }, [page]);
  // измененние количества доступных фильмов при отображениее
  React.useEffect(() => {
    if (windowWidth < 650) {
      setMaxNubmerOfMovies(5);
    } else if (windowWidth < 900) {
      setMaxNubmerOfMovies(8);
    } else {
      setMaxNubmerOfMovies(12);
    }
  }, [windowWidth]);
  // функция добавления фильмов
  function addMoreFilms() {
    if (windowWidth < 650) {
      setMaxNubmerOfMovies(maxNumberOfMovies + 3);
    } else if (windowWidth < 900) {
      setMaxNubmerOfMovies(maxNumberOfMovies + 3);
    } else {
      setMaxNubmerOfMovies(maxNumberOfMovies + 3);
    }
  }

  const moviesElements = movies.slice(0, maxNumberOfMovies).map((movie) => (
    <li key={movie.movieId} className="movie">
      <MoviesCard movie={movie} page={page} />
    </li>
  ));

  return (
    <section>
      <ul className="movies-cardlist">{moviesElements}</ul>
      <button
        type="button"
        aria-label="Загрузить еще фильмы"
        className={`button movies-cardlist__button ${
          numberOfMovies <= 3 ? "movies-cardlist__button_hidden" : ""
        }`}
        onClick={addMoreFilms}
      >
        Ещё
      </button>
    </section>
  );
}

export default MoviesCardList;
