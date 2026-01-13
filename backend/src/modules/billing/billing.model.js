// src/modules/billing/billing.model.js
const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");

const Bill = sequelize.define(
  "bills",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    patientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // FK → patients.id (later)
    },

    totalAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },

    paidAmount: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
    },

    paymentStatus: {
      type: DataTypes.ENUM("PENDING", "PARTIAL", "PAID"),
      defaultValue: "PENDING",
    },

    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
      // FK → users.id
    },
  },
  {
    tableName: "bills",
    timestamps: true,
  }
);

module.exports = Bill;
