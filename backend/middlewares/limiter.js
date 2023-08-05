const rateLimiter = require('express-rate-limit');

const limiter = rateLimiter({
  max: 160,
  windowMS: 55000,
  message: 'Слишком много запросов. Повторите позже',
});

module.exports = limiter;
