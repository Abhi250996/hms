require("dotenv").config();
const sequelize = require("./config/db");
const app = require("./app"); // THIS LINE WAS LIKELY MISSING OR WRONG

// Ensure models are recognized before sync
require("./modules/admin/admin.model");

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database Connected.");

    await sequelize
      .sync({ alter: false, force: false })
      .then(() => {
        console.log("✅ Database Synced Safely (No Alter)");
      })
      .catch((err) => {
        console.error("❌ Sync Error:", err);
      });
    console.log("✅ Database Tables Synced.");

    // This is where 'app' is used
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    // If you see "app is not defined" here, it's because of the import above
    console.error("❌ Unable to connect:", error.message);
  }
};

startServer();
