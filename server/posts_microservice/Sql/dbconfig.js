require("dotenv").config();

const config = {
  user: process.env.DB_CONFIG_USER,
  password: process.env.DB_CONFIG_PASSWORD,
  server: process.env.DB_CONFIG_SERVER_NAME,
  database: process.env.DB_CONFIG_DATABASE,
  options: {
    trustedConnection: true,
    trustServerCertificate: true,
    enableArithAort: true,
    //instancename: "MSSQLPLEASEWORK",
  },
  port: 1433,
};
module.exports = config;
