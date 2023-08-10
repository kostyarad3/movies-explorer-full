import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function Movies({
  movies,
  page,
  searchValue,
  setSearchValue,
  checkBox,
  handleCheckbox,
  onLikeFilm,
  isSavedMovie,
  isPreloaderActive,
  noMovieError,
  noMovieErrorText,
}) {
  return (
    <>
      <SearchForm
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        checkBox={checkBox}
        handleCheckbox={handleCheckbox}
        page={page}
      />
      <MoviesCardList
        movies={movies}
        page={page}
        onLikeFilm={onLikeFilm}
        isSavedMovie={isSavedMovie}
        isPreloaderActive={isPreloaderActive}
        noMovieError={noMovieError}
        noMovieErrorText={noMovieErrorText}
      />
    </>
  );
}

export default Movies;
