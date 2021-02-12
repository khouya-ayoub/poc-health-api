/**
 * Importations
 * */
const express = require('express');
const bodyParser = require('body-parser');

/**
 * Import de router
 * */
const healthRouter = require('./routes/health-routes');

/**
 * Init APP
 * */
const app = express();

/**
 * General Middleware
 * */
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

/**
 * Transform
 * */
app.use(bodyParser.json());

/**
 * Add Router
 * */
app.use('/api-health', healthRouter);

/**
 * export the app
 */
module.exports = app;