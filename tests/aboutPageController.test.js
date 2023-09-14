const { expect } = require("chai");
const pool = require("../database"); // Import your database connection
const {
  getAboutPageData,
  getDonationPageData,
} = require("../controllers/aboutPageController");

describe("About Page Controller", () => {
  // Test the getAboutPageData function
  it("should retrieve data for the About Page", async () => {
    const aboutPageData = await getAboutPageData();

    expect(aboutPageData).to.be.an("object");
    expect(aboutPageData.learningResources).to.be.an("object");
    expect(aboutPageData.supporters).to.be.an("object");
    expect(aboutPageData.goals).to.be.an("object");
    expect(aboutPageData.pieChartData).to.be.an("object");
  });
});

describe("Donation Page Controller", () => {
  // Test the getDonationPageData function
  it("should retrieve data for the Donation Page", async () => {
    const donationPageData = await getDonationPageData();

    expect(donationPageData).to.be.an("array");
  });
});
