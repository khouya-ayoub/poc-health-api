
// import db_connexion module and all required modules
const db_conn = require('./connexion');
const log = require('../log_server/log_server');
const patientModel = require('../models/patient.model');

// the connexion
const hibernate = db_conn.hibernate;
const mysql = db_conn.mysql;

// User MAP
const userMap = hibernate.tableMap('patients')
    .columnMap('id', 'id')
    .columnMap('firstname', 'firstname')
    .columnMap('lastname', 'lastname')
    .columnMap('age', 'age')
    .columnMap('sexe', 'sexe')
    .columnMap('cardiac', 'cardiac')
    .columnMap('breath', 'breath');

const f = {
    randomCardiac: () => {
        return  Math.floor(Math.random() * (120 - 30) + 30);
    },
    randomBreath: () => {
        return Math.floor(Math.random() * (80 - 20) + 20);
    }
}

const database_functions = {
    selectAllPatients: (request, response, next) => {
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
        console.log(request.params);
        // Select One USER
        let query = hibernate.query(userMap)
            .where(userMap.id.Equal(request.params.id));
        // When Call ends
        query.then(res => {
            log('selectOnePatient', 'Selection SUCCESS');
            return response.status(200).json(res[0]);
        }).catch(err => {
            log('selectOnePatient', 'Selection FAILED');
            return response.status(500).json({ error: 'error ', message: 'Error internal'});
        });
    },
    insertOnePatient: (request, response, next) => {
        console.log(request.body);
        // Get patient model
        let patient = patientModel.createPatient(
            request.body.firstname,
            request.body.lastname,
            request.body.age,
            request.body.sexe,
            request.body.cardiac,
            request.body.breath);
        // Insert USER
        userMap.Update(patient)
            .then(res => {
                log('insertOnePatient', 'Insertion SUCCESS');
                return response.status(200).json({ ok: 'OK' });
            })
            .catch(err => {
                log('insertOnePatient', 'Insertion FAILED');
                return response.status(500).json({ error: 'OK', message: err });
            });
    },
    updateValuesInDataBase: () => {
        return new Promise((resolve, reject) => {
            log('updateValuesInDataBase', 'DEBUT UPDATES');
            let query = hibernate.query(userMap).select();
            query.then(resultat => {
                log('updateValuesInDataBase', 'SELECTION SUCCESS');
                let sql = 'UPDATE patients SET cardiac = ?, breath = ? WHERE id = ?';
                for (let i = 0; i < resultat.length; i++) {
                    mysql.query(sql, [f.randomCardiac(), f.randomBreath(), resultat[i].id], (err, res) => {
                        if(err) {
                            log('updateValuesInDataBase', 'UPDATE PATIENT ID : ' + resultat[i].id + ' FAILED ' + err);
                        }
                        else{
                            log('updateValuesInDataBase', 'UPDATE PATIENT ID : ' + resultat[i].id + ' SUCCESS');
                        }
                    });
                }
                resolve(true);
            })
                .catch(err => {
                    log('updateValuesInDataBase', 'SELECTION FAILED');
                    reject(err);
                });
        });

    }
}

/**
 * Export module
 * */
module.exports = database_functions;
