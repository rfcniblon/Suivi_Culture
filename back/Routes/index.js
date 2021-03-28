const express = require('express');
const router = express.Router();

const users = require("./users");
const register = require("./register");
const login = require('./login');
const token = require("./token");
const secured = require("./secured");
const forgotpassword = require("./forgotpassword");

router.use("/users", users);
router.use("/register", register);
router.use("/login", login);
router.use("/token", token);
router.use("/secured", secured);
router.use("/forgotpassword", forgotpassword);

module.exports = router;
