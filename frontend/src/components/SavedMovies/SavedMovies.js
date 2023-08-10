import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function SavedMovies({
  savedMovies,
  page,
  searchValue,
  setSearchValue,
  checkBox,
  onDeleteFilm,
  handleCheckbox,
}) {
  return (
    <section className="saved-movies">
      <SearchForm
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        checkBox={checkBox}
        handleCheckbox={handleCheckbox}
        page={page}
      />
      <MoviesCardList
        movies={savedMovies}
        page={page}
        onDeleteFilm={onDeleteFilm}
      />
    </section>
  );
}

export default SavedMovies;
