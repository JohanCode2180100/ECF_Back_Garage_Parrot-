const express = require("express");

const router = express.Router();
const loginControllers = require("../models/auth_Login");

router.post("/api/login", loginControllers.login);

module.exports = router;
