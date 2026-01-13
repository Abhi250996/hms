const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");

const IpdAdmission = sequelize.define(
  "ipd_admissions",
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

    bedNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    ward: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    bedType: {
      type: DataTypes.ENUM("GENERAL", "PRIVATE", "ICU"),
      defaultValue: "GENERAL",
    },

    admissionDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },

    dischargeDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },

    diagnosis: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    treatmentPlan: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    remarks: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    billId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    status: {
      type: DataTypes.ENUM("ADMITTED", "DISCHARGED"),
      defaultValue: "ADMITTED",
    },
  },
  {
    tableName: "ipd_admissions",
    timestamps: true,
  }
);

sequelize.sync();

module.exports = IpdAdmission;
