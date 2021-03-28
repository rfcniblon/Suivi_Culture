const express = require("express");
const parser = require("body-parser");
const router = express.Router();
const connection = require("../config/database");
const bcrypt = require("bcryptjs");
const salt = process.env.SALT;
const auth = require('../middleware/auth');

router.use(parser.json());
router.use(parser.urlencoded({
    extended: true
}));

//Récuperation du type d'accés
router.get("/acces?", (req, res) => {
    const typeAccesOne = (req.query.name);
    const sql = 'SELECT id,name, roles FROM users where name = ? ';
    connection.query(sql, typeAccesOne, (error, results, fields) => {
        if (error) {
            res.status(501).send("couldn't get type acces");
            console.log("Erreur requete Get type d'acces");
        } else {
            console.log("recuperation du type d'acces recuperer avec succés");
            res.status(200);
            res.json(results);
        }
    });
});


// Recuperation de la table User avec le nombre selectionner par l'user 
router.get("/selection/:id", (req, res) => {
    const idSuiviOne = parseInt(req.params.id);
   const sql = 'SELECT  id,name, email,resetPasswordToken,DATE_FORMAT(resetPasswordExpires, "%d/%m/%Y %h:%i:%s")as resetPasswordExpires,roles, DATE_FORMAT(createdAt, "%d/%m/%Y %h:%i:%s")as createdAt,  DATE_FORMAT(updatedAt, "%d/%m/%Y %h:%i:%s")as updatedAt,status from users LIMIT ? ';
    //const sql = "SELECT * FROM suivi LIMIT ? ";
    connection.query(sql, idSuiviOne,(error, results, fields) => {
        if (error) {
            res.status(501).send("couldn't get qte filter user");
            console.log('Erreur requete Get qte filter user');
        } else {
            console.log("filtrage des quantite a afficher suivant id recupéré avec succés");
            res.status(200);
            res.json(results);
        }
    });
});

//récupération de l'intégralité de la Table users
router.get('/', (req, res) => {
    connection.query('SELECT * FROM users',
        (err, results) => {
            if (err) {
                res.status(501).send("couldn't get users");
            } else {
                console.log('Table users recupéré avec succés');
                res.status(200);
                res.json(results);
            }
        });
});

// Modification d'un compte user
router.put("/:id",auth, (req, res) => {
    const idUsers = req.params.id;
    const users = req.body;
    connection.query(
        "UPDATE users SET ? WHERE id=?",
        [users, idUsers],
        (error, results, fields) => {
            if (error) {
                res.status(501).send("couldn't put user" + error);
                console.log('Dommage!');
            } else {
                res.json(req.body);
                res.status(200);
                console.log("update d'un compte user avec succés");
            }
        }
    );
});

//Suppression d'un compte user
router.delete("/:id", auth,(req, res) => {
    const idUsers = req.params.id;
    connection.query(
        "DELETE FROM users WHERE id= ?",
        [idUsers],
        (error, results, fields) => {
            if (error) {
                res.status(501).send("couldn't delete user" + error);
                console.log('Dommage!');
            } else {
                res.json(idUsers);
                res.status(200);
                console.log("suppression d'un compte user avec succés");
            }
        }
    );
});

module.exports = router;
