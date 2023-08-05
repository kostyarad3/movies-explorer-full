import React from "react";
import myPhoto from "../../images/my-photo.jpg";

function AboutMe() {
  return (
    <section className="about-me">
      <h2 className="about-me__heading">Cтудент</h2>
      <div className="about-me__container">
        <div className="about-me__item">
          <img
            className="about-me__photo"
            src={myPhoto}
            alt="Фотография студента Радченко Константина"
          />
        </div>
        <div className="about-me__item">
          <h3 className="about-me__name">Константин</h3>
          <p className="about-me__text">Фронтенд-разработчик, 22 года</p>
          <p className="about-me__text">
            Я родился и проживаю в Москве, в 2023 году закончил
            Санкт-Петербургский государственный университет гражданской авиации
            по специальности пилот-инженер. В 2022 году начал кодить. Заканчиваю
            курсы от Яндекс Практикума, нахожусь в активном поиске стажировок.
          </p>
          <a
            className="link about-me__link"
            target="blank"
            href="https://github.com/kostyarad3"
          >
            Github
          </a>
        </div>
      </div>
    </section>
  );
}

export default AboutMe;
