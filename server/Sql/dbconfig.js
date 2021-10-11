require("dotenv").config();

const config = {
  user: process.env.DB_CONFIG_USER,
  password: process.env.DB_CONFIG_PASSWORD,
  server: "localhost",
  database: "fakelookDb",
  options: {
    trustedConnection: true,
    trustServerCertificate: true,
    enableArithAort: true,
    instancename: "MSSQLPLEASEWORK",
  },
  port: 1433,
};
module.exports = config;
