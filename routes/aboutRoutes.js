const express = require('express');
const bodyParser = require('body-parser');
const { getAboutPageData } = require('../controllers/aboutPageController.js');

const router = express.Router();
router.use(bodyParser.json());

router.get('/about', async (req, res) => {
  try {
    // Call a function to retrieve data from the database
    const aboutData = await getAboutPageData();
    res.json(aboutData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;