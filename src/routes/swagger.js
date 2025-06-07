// src/routes/swagger.js
const swaggerUi = require('swagger-ui-express');
const swaggerDoc = require("../config/swagger.json");

module.exports = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
};
