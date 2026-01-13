const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");

const LabTest = sequelize.define(
  "lab_tests",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    patientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    doctorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    testName: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    testCategory: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    sampleType: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    sampleStatus: {
      type: DataTypes.ENUM("PENDING", "COLLECTED"),
      defaultValue: "PENDING",
    },

    result: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    normalRange: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    reportUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    billId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    status: {
      type: DataTypes.ENUM("ORDERED", "COMPLETED"),
      defaultValue: "ORDERED",
    },
  },
  {
    tableName: "lab_tests",
    timestamps: true,
  }
);

sequelize.sync();

module.exports = LabTest;
