/**
 * This file contains all functions need to manipulate data from the data base.
 * Please be careful when you change something or you add something, and please
 * add a commenter line that describe your code you had added, and if you can
 * add a test-script for your code in file tests_data_base.js located in the
 * folder ../tests/tests_data_base.js. Thank you !
 * */

// import db_connexion module and all required modules
const db_conn = require('./connexion');
const log = require('../log_server/log_server');
const bcrypt = require('bcrypt');
const subscriptionModel = require('../models/subscription.model');
const notificationModel = require('../models/notification.model');

// the connexion
const conn = db_conn.connexion;


const database_functions = {
    login: (request, response, next) => {
        /**
         * the login function
         * @first test for existing user login
         * @second compare of the password
         * @third return some information
         * TODO: change the third part to the necessary inf
         * @WARNING for each part we use a log system !
         * */
        let sql = "SELECT * FROM mb_users WHERE mus_login = ?";
        conn.query(sql, [request.params.login], (err, res) => {
            if (err || (res.length === 0)) {
                log(__filename + " login()", "try to get unexcited user");
                return response.status(401).json({ error: 'error ' + err, message: 'No user !'});
            } else {
                if (res[0].MUS_PASSWORD !== request.params.password) {
                    log(__filename + " login()", "password incorrect for : " + request.params.login);
                    return response.status(401).json({ error: 'error ', message: 'Password incorrect !'});
                }
                log(__filename + " login()", "login successfully : " + request.params.login);
                return response.status(200).json({
                    _id: res[0].MUS_IDUSER,
                    nom: res[0].MUS_NOM,
                    prenom: res[0].MUS_PRENOM,
                    user_function: res[0].MUS_FONCTION,
                    description:'Successful request !',
                    message:''
                });
            }
        });
    },
    saveSubscription: (subscription) => {
        /**
         * This function save the given subscription
         * */
        let sql = "INSERT INTO mb_subscriptions(MSU_IDUSER,MSU_ENDPOINT,MSU_AUTH,MSU_P256DH) values(?,?,?,?)";
        conn.query(sql, [subscription.idUser, subscription.subNot.endpoint, subscription.subNot.keys.auth, subscription.subNot.keys.p256dh], (err, res) => {
            if (err || (res.length === 0))  {
                console.log("Errreur insertion :" + err);
            } else {
                console.log(" insertion réussite ");
            }
        });
    },
    getSubscriptions: (idUser, callback) => {
        /**
         * todo:
         * */
        let sql = "SELECT endpoint, auth, p256dh from MB_SUBSCRIBE where id_user = ?";
        conn.query(sql, [idUser], (err, res) => {
            if(err || res.length === 0) {
                console.log(err);
            }
            else{
                let listSubscriptions = new Array();
                for (let indice = 0; indice < res.length; indice ++) {
                    listSubscriptions.push(subscriptionModel.createSubrcription(res[indice].endpoint, res[indice].auth, res[indice].p256dh));
                }
                callback(listSubscriptions);
            }
        });
    },
    getNotifications: (idUser, callback) => {
        /**
         * Todo :
         * */
        let sql = "SELECT mno_titre, mno_description FROM mb_notifications N, mb_envoie E" +
            " WHERE E.men_iduser = ? AND N.mno_idnotification = E.men_idnotification and E.men_etatread = 0";
        conn.query(sql, [idUser], (err, res) => {
            if(err || res.length === 0) {
                console.log(err);
            }
            else{
                let listNotifications = new Array();
                for (let i = 0; i < res.length; i++) {
                    listNotifications.push(notificationModel.createNotification(res[i].mno_titre, res[i].mno_description));
                }
                callback(listNotifications);
            }
        });
    },
    promiseGetNotifications: (idUser) => {
        return new Promise((resolve, reject) => {
            let sql = "SELECT E.men_idnotification, mno_titre, mno_description FROM mb_notifications N, mb_envoie E" +
                " WHERE E.men_iduser = ? AND N.mno_idnotification = E.men_idnotification and E.men_etatenvoie = 0";
            conn.query(sql, [idUser], (err, res) => {
                if(err || res.length === 0) {
                    console.log(err);
                }
                else{
                    let listNotifications = new Array();
                    for (let i = 0; i < res.length; i++) {
                        listNotifications.push(notificationModel.createNotification(res[i].mno_titre, res[i].mno_description));
                        database_functions.changeEtatEnvoieNotification(idUser, res[i].men_idnotification).then(() => {});
                    }
                    resolve(listNotifications);
                }
            });
        });
    },
    promiseGetSubscription: (idUser) => {
        return new Promise((resolve, reject) => {
            let sql = "SELECT MSU_ENDPOINT, MSU_AUTH, MSU_P256DH from mb_subscriptions where MSU_IDUSER = ?";
            conn.query(sql, [idUser], (err, res) => {
                if(err || res.length === 0) {
                    console.log(err);
                }
                else{
                    let listSubscriptions = new Array();
                    for (let indice = 0; indice < res.length; indice ++) {
                        listSubscriptions.push(subscriptionModel.createSubrcription(res[indice].MSU_ENDPOINT, res[indice].MSU_AUTH, res[indice].MSU_P256DH));
                    }
                    resolve(listSubscriptions);
                }
            });
        });
    },
    promiseGetEtatSubscription: (idUser) => {
      return new Promise( (resolve, reject) => {
         let sql = "SELECT MUS_ETATSUBSCRIPTION FROM mb_users WHERE MUS_IDUSER = ?";
         conn.query(sql, [idUser], (err, res) => {
            if(err || res.length === 0){
                console.log(err);
                resolve(false);
            }
            if (res[0].MUS_ETATSUBSCRIPTION === 1){
                resolve(true);
            } else {
                console.log(res);
                resolve(false);
            }
         });
      });
    },
    changeEtatEnvoieNotification: (idUser, idNotification) => {
        return new Promise((resolve, reject) => {
            /**
             * todo :
             * */
            let sql = "UPDATE mb_envoie set men_etatenvoie = 1 where men_iduser = ? AND men_idnotification = ?";
            conn.query(sql, [idUser, idNotification], (err, res) => {
                if (err || (res.length === 0))  {
                    reject();
                } else {
                    resolve();
                }
            });
        })
    },
    changeStateOfSubscription: (request, response, next) => {
        let sql = "UPDATE mb_users set mus_etatsubscription = ? where mus_iduser = ?";
        conn.query(sql, [request.body.etatsub, request.body.idUser], (err,res) => {
            if(err || res.length === 0){
                console.log(err);
                return response.status(400).json( {message: 'erreur de modification', state: false } );
            }
            else{
                return response.status(200).json( {message: 'modification réussite', state: true});
            }
        });
    },
    addNotification: (request, response, next) => {
        let notif = request.body;
        let sql = "INSERT INTO mb_notifications(MNO_TITRE, MNO_DESCRIPTION, MNO_TYPE, MNO_CIBLE, MNO_QUICREAT, MNO_DATECREAT) values(?,?,?,?,?,?)";
        conn.query(sql, [notif.titre, notif.description, notif.type, notif.cible, notif.qui, notif.date], (err, res) => {
            if (err || (res.length === 0))  {
                console.log("Errreur insertion :" + err);
            } else {
                console.log(" insertion réussite ");
            }
        })
    },
    addUser: (request, response, next) => {
        // first thing crypt the password
        bcrypt.hash(request.body.password, 10)
            .then(hash => {
                let user = request.body;
                // when the password is crypted successfully
                let sql ="INSERT INTO mb_users (MUS_NOM, MUS_PRENOM, MUS_LOGIN, MUS_PASSWORD, MUS_GROUP, MUS_QUICREAT, MUS_DATECREAT) values(?)";
                let values = [user.nom,user.prenom,user.login,hash, user.group,user.qui,user.date];
                conn.query(sql, [values], (err, res) => {
                    if (err || res.affectedRows === 0) {
                        log(__filename + " signup()", "error while creating a new user !");
                        console.log(err);
                        return response.status(400).json({ error: 'error ' + err, message: 'error'});
                    } else {
                        log(__filename + " signup()", "user created successfully : " + request.body.login);
                        return response.status(200).json({
                            status: '200',
                            message: 'User created successfully !'
                        });
                    }
                });
            })
            .catch(error => response.status(500).json({
                error
            }));
    },
    getUserNotifications: (request, response, next) => {
        let sql = "SELECT men_idnotification, mno_titre, mno_description FROM mb_notifications N, mb_envoie E WHERE E.men_iduser = ? AND N.mno_idnotification = E.men_idnotification and E.men_etatread = 0";
        conn.query(sql, [request.body.idUser], (err, res) => {
            if(err || res.length === 0) {
                console.log(err);
                return response.status(500).json({ error: 'error ' + err, message: 'error'});
            }
            else{
                return response.status(200).json({ message: 'bien recu', notifications: res });
            }
        });
    },
    chageStateRead: (request, response, next) => {
        let sql = "UPDATE MB_ENVOIE set MEN_ETATREAD = 1 WHERE MEN_IDNOTIFICATION = ? AND  MEN_IDUSER = ?";
        conn.query(sql, [request.body.idNotif, request.body.idUser], (err, res) => {
            if(err || res.length === 0) {
                console.log(err);
                return response.status(500).json({ error: 'error ' + err, message: 'error'});
            }
            else{
                return response.status(200).json({ message: 'bien recu'});
            }
        });

    }
};

/**
 * Export module
 * */
module.exports = database_functions;
