import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function Movies({
  movies,
  page,
  setSearchValue,
  checkBoxMovies,
  setCheckBoxMovies,
  onLikeFilm,
  onDeleteFilm,
  isMovieSaved,
  isPreloaderActive,
  noMovieError,
  noMovieErrorText,
}) {
  return (
    <>
      <SearchForm
        setSearchValue={setSearchValue}
        checkBox={checkBoxMovies}
        setCheckBox={setCheckBoxMovies}
        page={page}
      />
      <MoviesCardList
        movies={movies}
        page={page}
        onLikeFilm={onLikeFilm}
        onDeleteFilm={onDeleteFilm}
        isMovieSaved={isMovieSaved}
        isPreloaderActive={isPreloaderActive}
        noMovieError={noMovieError}
        noMovieErrorText={noMovieErrorText}
      />
    </>
  );
}

export default Movies;
