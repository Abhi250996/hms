const { Sequelize } = require("sequelize");
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME || "hms_db",
  process.env.DB_USER || "root",
  process.env.DB_PASSWORD || "root", // Fallback to 'root'
  {
    host: process.env.DB_HOST || "127.0.0.1",
    dialect: "mysql",
    logging: false,
  }
);

module.exports = sequelize;