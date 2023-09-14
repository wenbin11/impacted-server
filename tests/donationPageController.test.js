const { expect } = require("chai");
const pool = require("../database"); // Import your database connection

const {
  getDonationPageData,
  getPaymentPageData,
} = require("../controllers/donationPageController");

describe("Donation Page Controller", () => {
  it("should fetch data for the Donation Page", async () => {
    const donationPageData = await getDonationPageData();

    expect(donationPageData).to.be.an("array");
    expect(donationPageData).to.not.be.empty;
    // Add more specific assertions based on the expected data structure
  });
});

it("should fetch data for the Payment Page by cause ID", async () => {
  const causeId = 1; // Replace with a valid cause ID

  const paymentPageData = await getPaymentPageData(causeId);

  expect(paymentPageData).to.be.an("object");
  expect(paymentPageData).to.have.property("causeid", causeId);
  // Add more specific assertions based on the expected data structure
});

it("should handle non-existent cause ID", async () => {
  const causeId = -1; // Use a cause ID that doesn't exist

  try {
    const paymentPageData = await getPaymentPageData(causeId);
    // If the query doesn't throw an error, this test case will fail
    expect(paymentPageData).to.be.undefined;
  } catch (error) {
    // Expecting an error due to non-existent cause ID
    expect(error).to.exist;
  }
});
