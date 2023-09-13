const express = require("express");
const bodyParser = require("body-parser");
const { getDashboardPageData } = require("../controllers/dashboardPageController.js");
const { getAllUsers } = require('../controllers/userTableController.js');

const router = express.Router();
router.use(bodyParser.json());

router.get("/dashboard", async (req, res) => {
  try {
    // Call a function to retrieve data from the database
    const dashboard = await getDashboardPageData();
    res.json(dashboard);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/dashboard/users", async (req, res) => {
  try {
    // Call a function to retrieve data from the database
    const users = await getAllUsers();
    console.log(users);
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
