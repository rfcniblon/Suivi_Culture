const express = require("express");
const parser = require("body-parser");
const router = express.Router();
const connection = require("../config/database");
const Auth = require("../middleware/auth");
router.use(parser.json());
router.use(parser.urlencoded({
    extended: true
}));

// exemple de route securisée 
 router.post('/', Auth,(req, res) => {
      res.send(req.authenticationData);
      console.log(req.authenticationData)
    }
  );

module.exports = router;
