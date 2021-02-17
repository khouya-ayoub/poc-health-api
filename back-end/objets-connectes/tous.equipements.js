'use strict'
const { Worker } = require('worker_threads')
const db = require('../controllers/data-base');
const log = require('../log_server/log_server');

function objet (filepath) {
    return new Promise((resolve, reject) => {
        let worker = new Worker(filepath);
        worker.on('online', () => { console.log('Objet connecté lancé !') });
        worker.on('message', messageFromWorker => {
            console.log(messageFromWorker);
            return resolve('Wow');
        })
        worker.on('error', reject);
        worker.on('exit', code => {
            if (code !== 0) {
                reject(new Error(`Worker stopped with exit code ${code}`));
            }
        });
    });
}

/**
 * Un Object connecter qui change les frequence cardiaque avec les frequences respiratoire
 */
async function lancerObjet () {
    // chaque seconde on change de la valeur
    setInterval(() => {
        console.log('Ajouter des données dans la base de données !');
        db.updateValuesInDataBase()
            .then(res => {
                log('lancerObjet', 'UPDATES VALUES SUCCESS');
            })
            .catch(err => {
                log('lancerObjet', 'UPDATES VALUES FAILED');
            });
    }, 1000);
}

module.exports = lancerObjet;