const mysql = require("mysql");

require("dotenv").config();
const LOCALHOST = process.env.DB_HOST;
const PORT = process.env.DB_PORT;
const USERDB = process.env.DB_USER;
const PASSWORDDB = process.env.DB_PASS;
const DATABASE = process.env.DATABASE;
  // port: PORT,
const connection = mysql.createConnection({
 host: LOCALHOST,
 user: USERDB,
 password: PASSWORDDB,
 database: DATABASE
});

connection.connect(function(err){
  if(!err) {
     console.log("Connexion reussi à la base de donnée");
 } else {
     console.log("erreur lors de la connexion à la base de donnée");
 }
 });

module.exports = connection;
