const express = require("express");

const router = express.Router();
const loginControllers = require("../controllers/auth_Login");

router.post("/api/login", loginControllers.login);

module.exports = router;
