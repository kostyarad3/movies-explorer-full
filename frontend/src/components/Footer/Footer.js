import React from "react";
const date = new Date().getFullYear();

function Footer() {
  return (
    <footer className="footer">
      <h2 className="footer__heading">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </h2>
      <div className="footer__section">
        <ul className="footer__links">
          <li className="footer__links-item">
            <a
              href="https://practicum.yandex.ru/"
              target="blank"
              className="link footer__link"
            >
              Яндекс.Практикум
            </a>
          </li>
          <li className="footer__links-item">
            <a
              href="https://github.com/kostyarad3"
              target="blank"
              className="link footer__link"
            >
              Github
            </a>
          </li>
        </ul>
        <p className="footer__content">&copy; {date}</p>
      </div>
    </footer>
  );
}

export default Footer;
