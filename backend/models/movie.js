const mongoose = require('mongoose');
const { LINK_REGEX } = require('../utils/constants');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  director: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: Number,
    required: true,
    maxlength: 4,
  },
  description: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 100,
  },
  image: {
    type: String,
    validate: {
      validator: (url) => LINK_REGEX.test(url),
      message: 'Нужно ввести URL',
    },
  },
  trailerLink: {
    type: String,
    validate: {
      validator: (url) => LINK_REGEX.test(url),
      message: 'Нужно ввести URL',
    },
  },
  thumbnail: {
    type: String,
    validate: {
      validator: (url) => LINK_REGEX.test(url),
      message: 'Нужно ввести URL',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    // + populate возможно
    // type: mongoose.Schema.Types.ObjectId,
    // ref: 'user',
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
