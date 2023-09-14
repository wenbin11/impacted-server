const { expect } = require("chai");

// Import your controller functions
const {
  getUserProfilePageData,
} = require("../controllers/profilePageController");

describe("User Profile Page Controller", () => {
  it("should get user profile page data in the database", async () => {
    userId = 41;

    // Call the createUser function with mock data and the mocked pool
    const userData = await getUserProfilePageData(userId);

    expect(userData).to.have.property("badgeInfo");
    expect(userData).to.have.property("pastDonations");
    expect(userData).to.have.property("userInfo");
  });
});
