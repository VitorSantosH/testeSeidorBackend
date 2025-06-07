// src/middlewares/security.js
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const applySecurity = (app) => {
  app.use(helmet());
  app.use(rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 500
  }));
};

module.exports = applySecurity;
