const express = require("express");

const router = express.Router();
const loginModels = require("../models/auth_Login");
const UserModels = require("../models/public/User");

router.post("/api/login", loginModels.login);
router.post("/api/addAdmin", UserModels.addAdmin);
module.exports = router;
