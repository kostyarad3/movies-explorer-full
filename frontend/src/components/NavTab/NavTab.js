import React from "react";

function NavTab() {
  function scrollToSection(evt) {
    const elementToScroll = evt.target.id;
    document.querySelector(`.${elementToScroll}`).scrollIntoView({
      block: "center",
      behavior: "smooth",
    });
  }

  return (
    <ul className="navtab">
      <li className="navtab__item">
        <a
          href="#1"
          id="about-project"
          className="link navtab__link"
          onClick={scrollToSection}
        >
          О проекте
        </a>
      </li>
      <li className="navtab__item">
        <a
          href="#1"
          id="techs"
          className="link navtab__link"
          onClick={scrollToSection}
        >
          Технологии
        </a>
      </li>
      <li className="navtab__item">
        <a
          href="#1"
          id="about-me"
          className="link navtab__link"
          onClick={scrollToSection}
        >
          Студент
        </a>
      </li>
    </ul>
  );
}

export default NavTab;
