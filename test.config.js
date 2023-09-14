require("dotenv").config();

module.exports = {
  // Database connection options for testing
  database: {
    user: process.env.DB_USER || "testuser",
    host: "localhost",
    database: "impactEd",
    password: process.env.DB_PW,
    port: 5432,
  },
};
