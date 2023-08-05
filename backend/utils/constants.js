// eslint-disable-next-line no-useless-escape
const LINK_REGEX = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;
// const EN_TEXT_REGEX = /^[a-zA-Z]+$\s/;
// const RU_TEXT_REGEX = /[\wа-я\sё]/;
const { NODE_ENV } = process.env;
const { JWT_SECRET } = process.env;
const { DB_URL = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;

module.exports = {
  JWT_SECRET,
  NODE_ENV,
  LINK_REGEX,
  DB_URL,
};
