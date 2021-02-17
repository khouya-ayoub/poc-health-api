const jsorm = require('js-hibernate');
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
const hibernate = jsorm.session(db_infos);
const connexion = mysql.createConnection(db_infos);

/**
 * export the module !
 * */
module.exports  = {
    hibernate: hibernate,
    mysql: connexion
};
