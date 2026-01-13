const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");

const OpdVisit = sequelize.define(
  "opd_visits",
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

    diagnosis: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    prescription: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    remarks: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    followUpDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },

    visitDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  },
  {
    tableName: "opd_visits",
    timestamps: true,
  }
);

sequelize.sync();

module.exports = OpdVisit;
