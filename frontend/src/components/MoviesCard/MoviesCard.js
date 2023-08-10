import React from "react";

function MoviesCard({ movie, page, onLikeFilm, onDeleteFilm, isSavedMovie }) {
  function handleSaveFilm(evt) {
    const saveButton = evt.target.closest(".movie__button");
    saveButton.classList.toggle("movie__button_active");
    if (saveButton.classList.contains("movie__button_active")) {
      movie.selected = true;
    } else movie.selected = false;
    onLikeFilm(movie);
  }

  function handleDeleteFilm() {
    movie.selected = false
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
            isSavedMovie(movie) ? "movie__button_active" : ""
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
      <img
        className="movie__image"
        alt={`Картинка фильма ${movie.nameRU} режиссера ${movie.director}`}
        src={src}
      />
    </>
  );
}

export default MoviesCard;
