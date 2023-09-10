const express = require('express');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const { createUser, getUserByEmail } = require('../controllers/userTableController');

// Register a new user
router.post('/register', [
  check('username', 'Username is required').not().isEmpty(),
  check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
  check('email', 'Please include a valid email').isEmail(),
], async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, password, email, fname, lname } = req.body;

  try {
    // Check if the user already exists by email
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ errors: [{ msg: 'Email address is already in use' }] });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create the user
    const user = await createUser(username, hashedPassword, email, fname, lname);

    // Generate a JWT token
    const payload = { user: { id: user.userid } };
    jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: 3600 }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Login user
router.post('/login', [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').exists(),
], async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    // Check if the user exists by email
    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(400).json({ errors: [{ msg: 'Invalid Email' }] });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: 'Invalid Password' }] });
    }

    // Generate a JWT token
    const payload = { user: { id: user.userid } };
    jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: 3600 }, (err, token) => {
      if (err) throw err;
      res.send([{token}, {userId: user.userid}]);
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
