const express = require("express");
const bodyParser = require("body-parser");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const {
  getUserProfilePageData,
} = require("../controllers/profilePageController.js");
const {
  getUserByUserId,
  updateUserDetails,
  getUserByEmail,
  updatePassword,
} = require("../controllers/userTableController.js");

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

router.get("/get-profile/:userId", async (req, res) => {
  // Get data from the query parameters (URL parameters)
  const { userId } = req.params;
  try {
    // Call a function to retrieve data from the database
    const profileData = await getUserByUserId(userId);
    res.json(profileData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post(
  "/update-profile/:userId",
  [
    check("email", "Please include a valid email").isEmail(),
    check("fname", "First Name is empty").not().isEmpty(),
    check("lname", "Last Name is empty").not().isEmpty(),
  ],
  async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { userId } = req.params;
    const { email, fname, lname } = req.body;

    try {
      // Check if the user already exists by email
      const existingUser = await getUserByEmail(email);
      if (existingUser) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Email address is already in use" }] });
      }

      // Create the user
      const user = await updateUserDetails(userId, req.body);

      res.json("Update Success");
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// Define a route for updating the user's password
router.post(
  "/reset-password/:userId",
  [
    // Use express-validator to check if new password and confirm password match
    check("newPassword", "New password is required").notEmpty(),
    check("confirmPassword").custom((value, { req }) => {
      if (value !== req.body.newPassword) {
        throw new Error("Passwords do not match");
      }
      return true;
    }),
  ],
  async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const userId = req.params.userId;
    const newPassword = req.body.newPassword;

    try {
      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);
      // Update the user's password in the database
      const updatedUser = await updatePassword(userId, hashedPassword);

      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
      console.error("Error updating password:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

module.exports = router;
