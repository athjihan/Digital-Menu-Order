const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: "host.docker.internal", // Use 'host.docker.internal' for Docker on Windows/Mac
  user: "root",
  password: "",
  database: "seafood_database",
});

module.exports = pool;
