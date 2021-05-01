const express = require("express");
const parser = require("body-parser");
const router = express.Router();
const connection = require("../config/database");
const bcrypt = require("bcryptjs");
const salt = process.env.SALT;
const auth = require('../middleware/auth');

router.use(parser.json());
router.use(
  parser.urlencoded({
    extended: true,
  })
);

router.post("/",  (req, res) => {
  const users = req.body;
  const resetPasswordExpires = new Date(Date.now());
  connection.query(
    "INSERT INTO users (name, email, password, resetPasswordToken, resetPasswordExpires) VALUES (?, ?, ?, ?, ?)",
    [users.name, 
      users.email,
      bcrypt.hashSync(users.password, salt), 
       users.resetPasswordToken,
       resetPasswordExpires,
      ],
    (error, results, fields) => {
      if (error) {
        res.status(501).send("L'ajout d'un utilisateur n'as pas abouti" + error);
      } else {
        
        connection.query("SELECT * FROM users WHERE id=?", [results.insertId],(error, results, fields) => {
          if(error){
            res.send("error : " + error)
          }else{
            res.status(200).json({"success" : "L'ajout d'un utilisateur a abouti", "results" : results});
          }
        })
      }
    }
  );
});

module.exports = router;
