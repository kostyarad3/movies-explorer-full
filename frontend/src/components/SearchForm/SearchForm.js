import React from "react";
import useValidateForm from "../../hooks/useValidateForm";

function SearchForm({ setSearchValue, checkBox, page, setCheckBox }) {
  const { handleInputChange, inputValues } = useValidateForm();
  const [isValueEmptyText, setIsValueEmptyText] = React.useState("");

  React.useEffect(() => {
    if (page === "movies") {
      inputValues.inputValue = localStorage.getItem("searchValue");
      setSearchValue(localStorage.getItem("searchValue"));
      if (
        !localStorage.getItem("checkBoxMovies") ||
        localStorage.getItem("checkBoxMovies") === "false"
      ) {
        setCheckBox(false);
      } else {
        setCheckBox(true);
      }
    } else {
      inputValues.inputValue = "";
      setSearchValue("");
    }
  }, []);

  function handleCheckbox(evt) {
    evt.preventDefault();
    setCheckBox(!checkBox);
    if (page === "movies") {
      localStorage.setItem("checkBoxMovies", !checkBox);
    } else {
      localStorage.setItem("checkBoxSavedMovies", !checkBox);
    }
  }

  function handleSubmit(evt) {
    if (!inputValues.inputValue && page === "movies") {
      setIsValueEmptyText("Нужно ввести ключевое слово");
    } else {
      setIsValueEmptyText("");
    }
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
      <label className="search-form__input-error">{isValueEmptyText}</label>
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
