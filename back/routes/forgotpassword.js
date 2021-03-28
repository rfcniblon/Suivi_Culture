const express = require('express');
const crypto = require('crypto');
const bodyParser = require("body-parser");
const router = express();
const nodemailer = require("nodemailer");
const API_PORT = process.env.API_PORT;

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: true
}));

let smtp = {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
    }
};

let transporter = nodemailer.createTransport(smtp);

router.post("/", (req, res, next) => {

    const token = crypto.randomBytes(20).toString('hex'); 
    const email = req.body.email;
    // send mail with defined transport object
    let mailOptions = {
        from: process.env.EMAIL, // adresse email expediteur
        to: `${email}`, // adresse email receptionnaire
        subject: ' Liens pour réinitialiser le mot de pass ', // Subject line
        text:
            "Vous recevez ceci parce que vous (ou quelqu'un d'autre) avez demandé la réinitialisation du mot de passe de votre compte..\n\n"
            + "Veuillez cliquer sur le lien suivant ou collez-le dans votre navigateur pour terminer le processus dans l'heure suivant sa réception::\n\n"
            + `${API_PORT}/reset/${token}\n\n`
            + "Si vous ne l'avez pas demandé, veuillez ignorer cet e-mail et votre mot de passe restera inchangé.\n",
      
    };

    console.log("demande de reinitialisation de mot de pass envoyé par email");

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            res.status(501).send(error);
        }
        else {
            res.status(200).json({message: "Votre demande de reinitialisation a bien été envoyée." });
            res.send("ok");
        }
    })

})


module.exports = router;
