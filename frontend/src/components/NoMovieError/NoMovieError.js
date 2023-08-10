import React from "react";

function NoMovieError({ noMovieErrorText }) {
  return (
    <section className="no-movie-error">
      <p className="no-movie-error__text">{noMovieErrorText}</p>
    </section>
  );
}
export default NoMovieError;
