const express = require("express");
const bodyParser = require("body-parser");
const {
  getUserProfilePageData,
} = require("../controllers/profilePageController.js");

const router = express.Router();
router.use(bodyParser.json());

router.get("/profile", async (req, res) => {
  // Get data from the query parameters (URL parameters)
  const { userId } = req.query;
  try {
    // Call a function to retrieve data from the database
    const profileData = await getUserProfilePageData(userId);
    res.json(profileData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
