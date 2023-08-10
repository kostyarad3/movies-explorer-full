import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function Movies({
  movies,
  page,
  setSearchValue,
  checkBox,
  handleCheckbox,
  onLikeFilm,
  isMovieSaved,
  isPreloaderActive,
  noMovieError,
  noMovieErrorText,
}) {
  return (
    <>
      <SearchForm
        setSearchValue={setSearchValue}
        checkBox={checkBox}
        handleCheckbox={handleCheckbox}
        page={page}
      />
      <MoviesCardList
        movies={movies}
        page={page}
        onLikeFilm={onLikeFilm}
        isMovieSaved={isMovieSaved}
        isPreloaderActive={isPreloaderActive}
        noMovieError={noMovieError}
        noMovieErrorText={noMovieErrorText}
      />
    </>
  );
}

export default Movies;
