const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const { getLearningResources } = require('./models/educationalCause');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/about', async (req, res) => {
  try {
    // Call a function to retrieve data from the database
    const aboutData = await getLearningResources();
    console.log(aboutData);
    res.json(aboutData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
