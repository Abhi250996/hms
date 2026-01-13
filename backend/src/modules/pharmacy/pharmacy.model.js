// src/modules/pharmacy/pharmacy.model.js
const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");

const Medicine = sequelize.define(
  "medicines",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    batch: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    manufacturer: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    expiryDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },

    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    reorderLevel: {
      type: DataTypes.INTEGER,
      defaultValue: 10,
    },

    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },

    status: {
      type: DataTypes.ENUM("AVAILABLE", "OUT_OF_STOCK", "EXPIRED"),
      defaultValue: "AVAILABLE",
    },
  },
  {
    tableName: "medicines",
    timestamps: true,
  }
);

sequelize.sync();

module.exports = Medicine;
