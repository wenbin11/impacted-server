const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();
const { getDonationPageData } = require('../controllers/donationPageController.js');
router.use(bodyParser.json());

router.get('/donation', async (req, res) => {
  try {
    // Call a function to retrieve data from the database
    const donationData = await getDonationPageData();
    res.json(donationData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;