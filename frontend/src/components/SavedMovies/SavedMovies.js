import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function SavedMovies({
  savedMovies,
  page,
  setSearchValue,
  checkBoxSavedMovies,
  setCheckBoxSavedMovies,
  onDeleteFilm,
  handleCheckbox,
}) {
  return (
    <section className="saved-movies">
      <SearchForm
        setSearchValue={setSearchValue}
        checkBox={checkBoxSavedMovies}
        page={page}
        setCheckBox={setCheckBoxSavedMovies}
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
