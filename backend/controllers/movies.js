const Movie = require('../models/movie');
const BadRequestError = require('../errors/bad-request-err');
const ForbiddenError = require('../errors/forbidden-err');
const NotFoundError = require('../errors/not-found-err');

function getMovies(req, res, next) {
  const ownerId = req.user._id;
  Movie.find({})
    .then((movies) => {
      const savedMovies = movies.filter((movie) => movie.owner.toString() === ownerId);
      if (savedMovies) {
        res.send({ data: savedMovies });
      } else {
        next(new NotFoundError('У вас нет сохраненных фильмов'));
      }
    })
    .catch(next);
}

function createMovie(req, res, next) {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: req.user._id,
  })
    .then((movie) => res.send({ data: movie }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(
          new BadRequestError(
            'Переданы некорректные данные при создании фильма.',
          ),
        );
        return;
      }
      next(err);
    });
}

function deleteMovie(req, res, next) {
  Movie.findById(req.params.movieId)
    .orFail(new NotFoundError('Фильм не найден'))
    .then((card) => {
      if (card.owner.equals(req.user._id)) {
        Movie.deleteOne(card)
          .then((deletedMovie) => res.send({ data: deletedMovie }))
          .catch(next);
      } else {
        next(new ForbiddenError('Нет прав на удаление чужого фильма'));
      }
    })
    .catch(next);
}

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
