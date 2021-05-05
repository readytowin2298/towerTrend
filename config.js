/** Shared config for application; can be req'd many places. */

require('dotenv');

const SECRET_KEY = process.env.SECRET_KEY || 'development-secret-key';

const PORT = +process.env.PORT || 3000;

const BCRYPT_WORK_FACTOR = 14;

const DB_URI =
  process.env.NODE_ENV === 'test'
    ? 'postgres://fmaespfg:NqWGXNRf3-QK8xtpr0hs3vkjGIKSLDfa@queenie.db.elephantsql.com:5432/fmaespfg'
    : 'postgres://zgstfuqv:cndc3QMK0PhfPML5N7_TUZvCDa3gDena@queenie.db.elephantsql.com:5432/zgstfuqv';

module.exports = {
    BCRYPT_WORK_FACTOR,
    SECRET_KEY,
    PORT,
    DB_URI
    };
      