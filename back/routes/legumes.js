const express = require("express");
const parser = require("body-parser");
const router = express.Router();
const connection = require("../config/database");
const auth =require("../middleware/auth");

router.use(parser.json());
router.use(parser.urlencoded({
    extended: true
}));

//récupération de l'intégralité de la Table legumes
router.get('/', (req, res) => {
    connection.query('SELECT * FROM legumes ',
        (err, results) => {
            if (err) {
                res.status(501).send("couldn't get legumes");
                console.log('Erreur requete Get legumes');
            } else {
                console.log('Table legumes recupéré avec succées');
                res.status(200);
                res.json(results);
            }
        });
});

//selection d'un chambre suivant id
// router.get("/user/:user/id/:id",(req, res) => {
//     const idChambreCultureOne = parseInt(req.params.user, req.params.id);
//     const sql = 'SELECT DISTINCT c.fk_id_user, c.fk_id_plante, p.variete from chambre_culture c JOIN plante p ON p.id_plante=c.fk_id_plante where fk_id_user='+ req.params.user +' and id_chambre='+ req.params.id +' and c.active=1';
//     connection.query(sql, idChambreCultureOne, (error, results, fields) => {
//         if (error) {
//             res.status(501).send("couldn't get chambre"+ sql);
//             console.log('Erreur requete Get id chambre' + sql);
//         } else {
//             console.log("selection d'une chambre suivant id recupéré avec succés" + sql);
//             res.status(200);
//             res.json(results);
//         }
//     });
// });

// selection filtrage suivant id et limit
//     router.get("/user/:user/selection/:id",(req, res) => {
//         connection.query('SELECT c.id_chambre,p.variete, c.fonction, c.longueur, c.largeur, c.hauteur, c.volume, c.surface from chambre_culture c  join plante p ON p.id_plante=fk_id_plante WHERE c.active = 1 AND c.fk_id_user =? limit ' + req.params.id +'',
//          [req.params.user, req.params.id],  (error, results, fields) => {
//             if (error) {
//                             res.status(501).send("couldn't get selection filter chambre culture");
//                             console.log('Erreur requete Get selection filter chambre culture');
//                         } else {
//                             console.log("filtrage des selection a afficher suivant id recupéré avec succés");
//                             res.status(200);
//                             res.json(results);
//                         }

//      });
//  });

// selection d'un chambre suivant l id_user route pour ChambreADD
// router.get("/user/:user", (req, res) => {
//     const idChambreCultureOne = parseInt(req.params.user);
//     const sql = 'SELECT c.fonction, c.longueur,u.name, c.id_chambre, p.variete, p.id_plante FROM chambre_culture c join plante p ON p.id_plante=c.fk_id_plante JOIN users u ON u.id=c.fk_id_user where c.active=1 and c.fk_id_user= ? ';
//       connection.query(sql, idChambreCultureOne, (error, results, fields) => {
//         if (error) {
//             res.status(501).send("couldn't get id_user chambre");
//             console.log('Erreur requete Get id chambre');
//         } else {
//             console.log("selection d'une chambre suivant id recupéré avec succés");
//             res.status(200);
//             res.json(results);
//         }
//     });
// });
                                                    
//creation d'un legume
  router.post('/', (req, res) => {
    connection.query('INSERT INTO legumes (  name ) VALUES (?)', 
    [req.body.name], (err, results, fields) => {
        if (err) {
            res.status(501).send("couldn't post legume" + err);
            console.log('Dommage post d un legume!'+ err);
          } else {
            req.body.id = results.insertId;
            res.json(req.body);
            console.log("creation d'un legume avec succés");
          }
    })
});

// Modification d'un legume
router.put("/:id",(req, res) => {
    const idLegumes = req.params.id;
    const legume = req.body;
    connection.query(
        "UPDATE legumes SET ? WHERE id_legumes=?",
        [legume, idLegumes],
        (error, results, fields) => {
            if (error) {
                res.status(501).send("couldn't put legume" + error);
                console.log('Dommage update d un legume!');
            } else {
                res.json(req.body);
                console.log("update d'un legume avec succés");
            }
        }
    );
});

//Suppression d'un legume
router.delete("/:id",(req, res) => {
    const idLegumes = req.params.id;
    connection.query(
        "DELETE FROM chambre_culture WHERE id_legumes= ?",
        [idLegumes],
        (error, results, fields) => {
            if (error) {
                res.status(501).send("couldn't delete legume" + error);
                console.log('Dommage delete legume !');
            } else {
                res.json(idLegumes);
                console.log("suppression d'un legume avec succés");
            }
        }
    );
});

module.exports = router;