const express = require("express");
const stripe = require("stripe")(process.env.STRIPE_KEY); // Replace with your actual Stripe secret key
const router = express.Router();

const { createDonation } = require("../controllers/donationTableController");
const {
  updateDonationAmount,
} = require("../controllers/educationalCauseTableController");

// POST /cause/:causeId/checkout enpoint: Initiate a Stripe Checkout Session
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
            currency: "sgd",
            product_data: {
              name: "ImpactEd",
              description: causeName,
            },
            // Convert donation amount to cents
            unit_amount: donationAmount * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      // Redirect URL after successful payment
      success_url: `http://localhost:8081/success?causeId=${causeId}&userId=${userId}&donationAmount=${donationAmount}`,
      // Redirect URL if the user cancels the payment
      cancel_url: `http://localhost:8081/cancel?causeId=${causeId}`,
      // Submit button text
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

// GET /success endpoint: Handle successful payment
router.get("/success", async (req, res) => {
  try {
    // Get data from the query parameters
    const { causeId, userId, donationAmount } = req.query;

    // Insert the donation information into database
    const resultOne = await createDonation(userId, causeId, donationAmount);
    const resultTwo = await updateDonationAmount(causeId, donationAmount);

    if (resultOne && resultTwo) {
      // Render a success page and provide transaction details
      res.status(200).json([resultOne, resultTwo]);
    } else {
      res.status(500).send("Failed to insert donation into the database.");
    }
  } catch (error) {
    console.log("Error processing successful payment:", error);
    res.status(500).send("An error occurred while processing the payment.");
  }
});

// GET /cancel endpoint: Handle error payment
router.get("/cancel", (req, res) => {
  res.status(200).json({ message: "Payment was cancelled." });
});

module.exports = router;
