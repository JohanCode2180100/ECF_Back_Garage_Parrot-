const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.JWT_TOKEN);
    next();
  } catch (error) {
    res.status(401).json({ message: "echec de l'authentification - token" });
  }
};
