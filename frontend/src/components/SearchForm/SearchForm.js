import React from "react";
import useValidateForm from "../../hooks/useValidateForm";

function SearchForm({ movies, handleSearch }) {
  const [isFilterOn, setIsFilterOn] = React.useState(false);
  const { handleInputChange, inputValues } = useValidateForm();

  function handleFilter(evt) {
    evt.preventDefault();
    setIsFilterOn(!isFilterOn);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    const { searchValue } = inputValues;
    handleSearch(searchValue, movies)
  }

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        placeholder="Фильм"
        className="search-form__input"
        name="searchValue"
        required
        id="search"
        value={inputValues?.searchValue || ""}
        onChange={handleInputChange}
      ></input>
      <button type="submit" aria-label="Поиск фильмов" className="button search-form__button"></button>
      <div className="serch-form__filter-container">
        <button
          type="checkbox"
          onClick={handleFilter}
          aria-label="Кнопка включения фильтра"
          className={`button search-form__filter-button ${
            isFilterOn && "search-form__filter-button_active"
          }`}
        ></button>
        <p className="search-form__filter-text">Короткометражки</p>
      </div>
    </form>
  );
}

export default SearchForm;
