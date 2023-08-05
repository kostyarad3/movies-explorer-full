import React from "react";

function AboutProject() {
  return (
    <section className="about-project">
      <h2 className="about__project__heading">О проекте</h2>
      <div className="about-project__sections">
        <div className="about-project__section">
          <h2 className="about-project__subheading">
            Дипломный проект включал 5 этапов
          </h2>
          <p className="about-project__text">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </div>
        <div className="about-project__section">
          <h2 className="about-project__subheading">
            На выполнение диплома ушло 5 недель
          </h2>
          <p className="about-project__text">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </div>
      </div>
      <div className="about-project__scale">
        <div className="about-project__scale-item">1 неделя</div>
        <div className="about-project__scale-item">4 недели</div>
        <div className="about-project__scale-item">Back-end</div>
        <div className="about-project__scale-item">Front-end</div>
      </div>
    </section>
  );
}

export default AboutProject;
