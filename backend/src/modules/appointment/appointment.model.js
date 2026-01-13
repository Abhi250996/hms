const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");

const Appointment = sequelize.define(
  "appointments",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    patientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // later: FK → patients.id
    },

    doctorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // later: FK → doctors.id
    },

    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },

    time: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    status: {
      type: DataTypes.ENUM("BOOKED", "CANCELLED", "COMPLETED"),
      defaultValue: "BOOKED",
    },
  },
  {
    tableName: "appointments",
    timestamps: true, // adds createdAt & updatedAt
  }
);

// create table if not exists
sequelize.sync();

module.exports = Appointment;
