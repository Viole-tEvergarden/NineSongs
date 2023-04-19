const express = require('express');
const UserController = require("../Controller/user");

const router = express.Router();

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.post('/logout', UserController.logout);

module.exports = router;