const express = require("express");

const router = express.Router();

const loginModels = require("../models/public/auth_Login");

router.post("/api/login", loginModels.login);

module.exports = router;
