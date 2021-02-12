/**
 * This file contains the routes for roots that manipulate the data base.
 * Please be careful when you change something or you add something, and please
 * add a commenter line that describe your code you had added, and if you can
 * add a test-script for your code in the folder ../tests/tests_---.js.
 *                              Thank you !
 * */

const express = require('express');
const bodyParser = require('body-parser');

// import data base router
const databaseRouters = require('./routes/data-base');
// import user router
const userRouters = require('./routes/user');
// import test router
const testRouter = require('./routes/test');
// import notification router
const notificationRouter = require('./routes/notification');
// todo
const internRouter = require('./routes/intern-routes');

// init app
const app = express();

// General MidelWare
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// transform
app.use(bodyParser.json());
/**
 * Add Routers
 * */
// use the routes of data base
app.use('/api/db', databaseRouters);
// use the routes of user
app.use('/api/auth', userRouters);
// test routes
app.use('/test', testRouter);
// notification routes
app.use('/api/notification', notificationRouter);


/**
 * export the app
 */
module.exports = app;
