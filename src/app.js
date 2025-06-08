// src/app.js
const express = require('express');
const applySecurity = require('./middlewares/security');
const logger = require('./utils/logger');
const usageRoutes = require('./routes/usageRouter');
const vehicleRoutes = require('./routes/vehicleRoutes');
const driverRoutes = require('./routes/driverRoutes');
const seedData = require('./config/seed');

const app = express();
app.use(express.json());

applySecurity(app);
require('./routes/swagger')(app);

app.use('/usages', usageRoutes);
app.use('/vehicles', vehicleRoutes);
app.use('/drivers', driverRoutes);

seedData();

module.exports = app;
