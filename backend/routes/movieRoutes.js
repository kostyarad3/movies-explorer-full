const { celebrate, Joi } = require('celebrate');
const router = require('express').Router();
const { LINK_REGEX } = require('../utils/constants');
const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

router.get('/', getMovies);

router.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      country: Joi.string().required().min(2).max(100),
      director: Joi.string().required().min(2).max(50),
      duration: Joi.number().required(),
      year: Joi.number().required(),
      description: Joi.string().required().min(2).max(10000),
      image: Joi.string().required().pattern(LINK_REGEX),
      trailerLink: Joi.string().required().pattern(LINK_REGEX),
      nameRU: Joi.string().required(),
      nameEN: Joi.string().required(),
      thumbnail: Joi.string().required().pattern(LINK_REGEX),
      movieId: Joi.number().required(),
    }),
  }),
  createMovie,
);

router.delete(
  '/:movieId',
  celebrate({
    params: Joi.object().keys({
      movieId: Joi.string().required().hex().length(24),
    }),
  }),
  deleteMovie,
);

module.exports = router;
