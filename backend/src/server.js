// src/server.js
require("./config/env");
const app = require("./app");
const sequelize = require("./config/db");

const PORT = process.env.PORT || 5000;

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Unable to connect to DB:", error);
  }
})();
