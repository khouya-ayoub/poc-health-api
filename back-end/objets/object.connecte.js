'use strict'

/**
 * Un Object connecter qui change les frequence cardiaque avec les frequences respiratoire
 */
async function objectConnecte () {
    // chaque seconde on change de la valeur
    setInterval(() => { console.log('Objet connecté entrain de travailler !') }, 1000)
}

module.exports = objectConnecte;