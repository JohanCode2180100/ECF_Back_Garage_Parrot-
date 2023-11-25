const postgres = require("postgres");

const db = postgres(process.env.DATABASE_URL);

module.exports = db;
