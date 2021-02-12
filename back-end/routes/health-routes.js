// imports
const express = require('express');
// router for manipulate roots that use the data base
const router = express.Router();
// imports functions and methods
const databaseController = require('../controllers/data-base');
/**
 * Methodes
 * */
router.get('/get-all-users', databaseController.selectAllPatient);
router.get('/get-one-user', databaseController.selectOnePatient);
router.post('/insert-one-patient', databaseController.insertOnePatient);
/**
 * Export the router
 * */
module.exports = router;