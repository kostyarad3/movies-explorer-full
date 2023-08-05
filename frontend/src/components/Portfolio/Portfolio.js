import React from "react";
import arrow from "../../images/arrow.svg";

function Portfolio() {
  return (
    <section className="portfolio">
      <h2 className="portfolio__heading">Портфолио</h2>
      <ul className="portfolio__items">
        <li className="porfolio__item">
          <a
            target="blank"
            className="link portfolio__link"
            href="https://kostyarad3.github.io/how-to-learn/"
          >
            Статичный сайт
            <img className="portfolio__arrow" src={arrow} alt="Стрелка" />
          </a>
        </li>
        <li className="porfolio__item">
          <a
            target="blank"
            className="link portfolio__link"
            href="https://kostyarad3.github.io/russian-travel/"
          >
            Адаптивный сайт
            <img className="portfolio__arrow" src={arrow} alt="Стрелка" />
          </a>
        </li>
        <li className="porfolio__item">
          <a
            target="blank"
            className="link portfolio__link"
            href="https://mesto.kostyarad.nomoreparties.sbs/sign-in"
          >
            Одностраничное приложение
            <img className="portfolio__arrow" src={arrow} alt="Стрелка" />
          </a>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;
