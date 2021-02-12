/**
 * This file contains all functions need to connect to the data base.
 * Please be careful when you change something or you add something, and please
 * add a commenter line that describe your code you had added, and if you
 * can, add a test-script for your code in file tests_data_base.js located in
 * the folder ../tests/tests_data_base.js. Thank you !
 * */

// import mysql module
const mysql = require('mysql');

/**
 * @const db_info information needs to creat a connexion to data base
 * */
const db_infos = {
    host: "localhost",
    user: "root",
    password: "",
    database: "health_api"
};

// connexion : variable connected to data base
const connexion = mysql.createConnection(db_infos);

/**
 * export the module !
 * */
// export functions and variables
exports.connexion = connexion;
