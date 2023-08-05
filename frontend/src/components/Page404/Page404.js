import React from "react";
import { useNavigate } from "react-router-dom";

function Page404() {
  const navigate = useNavigate();

  function returtToPrevPage() {
    navigate(-1);
  }

  return (
    <section className="page404">
      <h1 className="page404__digits">404</h1>
      <p className="page404__text">Страница не найдена</p>
      <p onClick={returtToPrevPage} className="link page404__link">Назад</p>
    </section>
  );
}

export default Page404;