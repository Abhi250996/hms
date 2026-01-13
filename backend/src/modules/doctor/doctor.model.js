// src/modules/doctor/doctor.model.js
const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");

const Doctor = sequelize.define(
  "doctors",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    staffId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },

    mobile: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    department: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    specialization: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    designation: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    status: {
      type: DataTypes.ENUM("ACTIVE", "INACTIVE"),
      defaultValue: "ACTIVE",
    },

    joiningDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },

    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
      // FK → users.id
    },
  },
  {
    tableName: "doctors",
    timestamps: true,
  }
);

module.exports = Doctor;
