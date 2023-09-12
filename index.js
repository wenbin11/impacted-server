const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const aboutRoutes = require("./routes/aboutRoutes");
const donationRoutes = require("./routes/donationRoutes");
const auth = require("./routes/auth");
const checkout = require("./routes/stripe-checkout");
const profileRoutes = require("./routes/profileRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// My API Routes
app.use("/", aboutRoutes);
app.use("/", donationRoutes);
app.use("/", profileRoutes);
app.use("/", auth);
app.use("/", checkout);

// Start the server
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
