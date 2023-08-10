import React from "react";
import useValidateForm from "../../hooks/useValidateForm";

function SearchForm({ setSearchValue, checkBox, handleCheckbox, page }) {
  const { handleInputChange, inputValues } = useValidateForm();

  React.useEffect(() => {
    if (page === "movies") {
      inputValues.inputValue = localStorage.getItem("searchValue");
      setSearchValue(inputValues.inputValue);
    } else {
      inputValues.inputValue = localStorage.getItem("searchValueSaved");
      setSearchValue(inputValues.inputValue);
    }
  }, []);

  function handleSubmit(evt) {
    evt.preventDefault();
    if (page === "movies") {
      localStorage.setItem("searchValue", inputValues.inputValue);
      setSearchValue(inputValues.inputValue);
    } else {
      localStorage.setItem("searchValueSaved", inputValues.inputValue);
      setSearchValue(inputValues.inputValue);
    }
  }

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        placeholder="Фильм"
        className="search-form__input"
        name="inputValue"
        id="inputValue"
        value={inputValues.inputValue || ""}
        onChange={handleInputChange}
      ></input>
      <label className="search-form__input-error">
        {!inputValues.searchValue &&
          !localStorage.getItem("searchValue") &&
          "Нужно ввести ключевое слово"}
      </label>
      <button
        type="submit"
        aria-label="Поиск фильмов"
        className="button search-form__button"
      ></button>
      <div className="serch-form__filter-container">
        <button
          type="checkbox"
          onClick={handleCheckbox}
          aria-label="Кнопка включения фильтра"
          className={`button search-form__filter-button ${
            checkBox && "search-form__filter-button_active"
          }`}
        ></button>
        <p className="search-form__filter-text">Короткометражки</p>
      </div>
    </form>
  );
}

export default SearchForm;
