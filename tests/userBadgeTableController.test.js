const { expect } = require("chai");
const sinon = require("sinon");
const app = require("../index");

// Import your controller functions
const {
  createUserBadge,
  getAllUserBadges,
  updateUserBadge,
  deleteUserBadge,
} = require("../controllers/userBadgeTableController");

describe("User Badge Controller", () => {
  it("should create a user badge in the database", async () => {
    // Mock the request data
    const userId = 31;
    const badgeId = 5;
    const causeId = 15;

    // Call the createUser function with mock data and the mocked pool
    const createdEntry = await createUserBadge(userId, badgeId, causeId);

    // Assert that the pool.query method was called with the correct SQL query and values
    expect(createdEntry).to.not.be.null;
    expect(createdEntry).to.have.property("achievementtime");
    expect(createdEntry.userid).to.equal(userId);
    expect(createdEntry.badgeid).to.equal(badgeId);
    expect(createdEntry.causeid).to.equal(causeId);
  });

  it("should get all entries in the database", async () => {
    // Call the createUser function with mock data and the mocked pool
    const getAllUserBadgesResults = await getAllUserBadges();

    // Assert that the result is an array
    expect(getAllUserBadgesResults).to.be.an("array");

    // Assert that the array is not empty
    expect(getAllUserBadgesResults).to.not.be.empty;

    // Assert that each user object has the expected properties
    getAllUserBadgesResults.forEach((userBadge) => {
      expect(userBadge).to.have.property("userid");
      expect(userBadge).to.have.property("causeid");
      expect(userBadge).to.have.property("badgeid");
      expect(userBadge).to.have.property("achievementtime");
    });
  });

  it("should delete an entry in the database", async () => {
    // Call the createUser function with mock data and the mocked pool

    const userBadgeId = 3;

    const deletionResult = await deleteUserBadge(userBadgeId);

    expect(deletionResult).to.equal(true);
  });
});
