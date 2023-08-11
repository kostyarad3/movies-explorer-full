import React from "react";

function MoviesCard({ movie, page, onLikeFilm, onDeleteFilm, isMovieSaved }) {
  function handleSaveFilm() {
    if (isMovieSaved(movie)) {
      onLikeFilm(movie);
    } else {
      onLikeFilm(movie);
    }
  }

  function handleDeleteFilm() {
    movie.selected = false;
    onDeleteFilm(movie);
  }

  const minutes = movie.duration % 60;
  const hours = (movie.duration - minutes) / 60;
  const filmDuration = `${hours}ч ${minutes}м`;

  const src = movie.image.formats
    ? `https://api.nomoreparties.co/${movie.image.url}`
    : movie.image;

  return (
    <>
      <h2 className="movie__name">{movie.nameRU}</h2>
      <p className="movie__duration">{filmDuration}</p>
      {page === "movies" ? (
        <button
          className={`button movie__button ${
            isMovieSaved(movie) ? "movie__button_active" : ""
          }`}
          onClick={handleSaveFilm}
          type="button"
          aria-label="Сохранить в рекомендации"
        ></button>
      ) : (
        <button
          onClick={handleDeleteFilm}
          className="button saved-movie__button"
          type="button"
        ></button>
      )}
      <a className="movie__link" href={movie.trailerLink} target="blank">
        <img
          className="movie__image"
          alt={`Картинка фильма ${movie.nameRU} режиссера ${movie.director}`}
          src={src}
        />
      </a>
    </>
  );
}

export default MoviesCard;
