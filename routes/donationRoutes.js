
const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();
const { getDonationPageData, getPaymentPageData } = require('../controllers/donationPageController.js');
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

router.get('/cause/:causeId', async (req, res) => {
  const { causeId } = req.params;
  try {
    // Call a function to retrieve data from the database
    const paymentData = await getPaymentPageData(causeId);
    res.json(paymentData);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;