
// import db_connexion module and all required modules
const db_conn = require('./connexion');
const log = require('../log_server/log_server');
const patientModel = require('../models/patient.model');

// the connexion
const hibernate = db_conn.hibernate;

const database_functions = {
    selectAllPatient: (request, response, next) => {
        // User MAP
        let userMap = hibernate.tableMap('patients')
            .columnMap('id', 'id')
            .columnMap('firstname', 'firstname')
            .columnMap('lastname', 'lastname')
            .columnMap('age', 'age')
            .columnMap('sexe', 'sexe')
            .columnMap('cardiac', 'cardiac')
            .columnMap('breath', 'breath');
        // Selcet ALL
        let query = hibernate.query(userMap).select();
        query.then(res => {
            log('selectAllPatient', 'Selection SUCCESS');
            return response.status(200).json(res);
        }).catch(err => {
            log('selectAllPatient', 'Selection FAILED');
            return response.status(500).json({ error: 'error ', message: 'Error internal'});
        });
    },
    selectOnePatient: (request, response, next) => {
        // Map USER
        let userMap = hibernate.tableMap('patients')
            .columnMap('id', 'id')
            .columnMap('firstname', 'firstname')
            .columnMap('lastname', 'lastname')
            .columnMap('age', 'age')
            .columnMap('sexe', 'sexe')
            .columnMap('cardiac', 'cardiac')
            .columnMap('breath', 'breath');
        // Select One USER
        let query = hibernate.query(userMap)
            .where(userMap.id.equal(idUser));
        // When Call ends
        query.then(res => {
            log('selectOnePatient', 'Selection SUCCESS');
            return response.status(200).json(res);
        }).catch(err => {
            log('selectOnePatient', 'Selection FAILED');
            return response.status(500).json({ error: 'error ', message: 'Error internal'});
        });
    },
    insertOnePatient: (request, response, next) => {
        // Map USER
        let userMap = hibernate.tableMap('patients')
            .columnMap('id', 'id', {isAutoIncrement: true})
            .columnMap('firstname', 'firstname')
            .columnMap('lastname', 'lastname')
            .columnMap('age', 'age')
            .columnMap('sexe', 'sexe')
            .columnMap('cardiac', 'cardiac')
            .columnMap('breath', 'breath');
        // Get patient model
        let patient = patientModel.createPatient(
            request.body.firstname,
            request.body.lastname,
            request.body.age,
            request.body.sexe,
            request.body.cardiac,
            request.body.breath);
        // Insert USER
        userMap.insert(patient)
            .then(res => {
                log('insertOnePatient', 'Insertion SUCCESS');
                return response.status(200).json({ ok: 'OK' });
            })
            .catch(err => {
                log('insertOnePatient', 'Insertion FAILED');
                return response.status(500).json({ error: 'OK', message: err });
            });
    }
}

/**
 * Export module
 * */
module.exports = database_functions;
