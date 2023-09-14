const express = require("express");
const stripe = require("stripe")(process.env.STRIPE_KEY); // Replace with your actual Stripe secret key
const router = express.Router();

const { createDonation } = require("../controllers/donationTableController");
const {
  updateDonationAmount,
} = require("../controllers/educationalCauseTableController");

// Define a route for initiating a Stripe Checkout session
router.post("/cause/:causeId/checkout", async (req, res) => {
  try {
    // Get data from the request body
    const { causeName, donationAmount, userId, causeId } = req.body;

    // Create a Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "sgd", // Change to your desired currency
            product_data: {
              name: "ImpactEd",
              description: causeName,
            },
            unit_amount: donationAmount * 100, // Convert donation amount to cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `http://localhost:8081/success?causeId=${causeId}&userId=${userId}&donationAmount=${donationAmount}`, // Redirect URL after successful payment
      cancel_url: `http://localhost:8081/cancel?causeId=${causeId}`, // Redirect URL if the user cancels the payment
      submit_type: "donate",
    });

    // Send the Checkout session ID to the client
    res.json({ sessionId: session.id });
  } catch (error) {
    console.error("Error creating Checkout session:", error);
    res.status(500).json({
      error: "An error occurred while creating the Checkout session.",
    });
  }
});

// Define a route for handling successful payments
router.get("/success", async (req, res) => {
  try {
    // Get data from the query parameters (URL parameters)
    const { causeId, userId, donationAmount } = req.query;

    // Insert the donation information into your database
    const resultOne = await createDonation(userId, causeId, donationAmount);
    const resultTwo = await updateDonationAmount(causeId, donationAmount);
    // Check if the donation was successfully inserted into the database
    if (resultOne && resultTwo) {
      // Render a success page or provide a success response to the client
      res.status(200).json([resultOne, resultTwo]);
    } else {
      // Handle the case where the insertion failed
      res.status(500).send("Failed to insert donation into the database.");
    }
  } catch (error) {
    console.log("Error processing successful payment:", error);
    res.status(500).send("An error occurred while processing the payment.");
  }
});

router.get("/cancel", (req, res) => {
  res.status(200).json({ message: "Payment was cancelled." });
});

module.exports = router;
