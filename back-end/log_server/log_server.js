/**
 * This file contains all functions need to write a journal use of
 * the server and it's help to detect all bugs and errors.
 * */
const file = require('fs');

const path = "./log_server/push_system_log.txt";

const writeLog = function (source, message) {
    let line = "" + Date() + " | src: " + source + " | msg: " + message + "\n";
    file.appendFile(path, line, (err) => {
        if (err) {
            throw err;
        }
    });
};


module.exports = writeLog;
