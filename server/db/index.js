const { createDBInstance } = require("../../lib/db");

const db = createDBInstance();

module.exports = db;
