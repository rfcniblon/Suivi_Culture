const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const parser = require("body-parser");
const jwtsecret = process.env.JWT_SECRET;
router.use(parser.urlencoded({ extended: false }))
 
// parse application/json
router.use(parser.json())

router.post(
    '/',
    (req, res) => {
        let token = req.body.token;
        jwt.verify(token, jwtsecret, (err, authenticationData) => {
            if(err){
                res.json({
                    succes: false,
                    token: "erreur"
                });
            }
            else {
                res.json({
                    succes: true,
                    token: token
                });
            }
        });
    }
)

module.exports = router;
