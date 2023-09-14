const { expect } = require("chai");
const pool = require("../database"); // Import your database connection

const {
  createBadge,
  getAllBadges,
  updateBadge,
  getBadgeByBadgeId,
  deleteBadge,
} = require("../controllers/badgeTableController");

describe("Badge Table Controller", () => {
  let testBadgeId;

  // Test the createBadge function
  it("should create a new badge", async () => {
    const badgeName = "Test Badge";
    const badgeDescription = "Test Badge Description";
    const img_path = "/test-badge.png";

    const newBadge = await createBadge(badgeName, badgeDescription, img_path);

    expect(newBadge).to.be.not.null;

    // Save the created badge ID for later use
    testBadgeId = 7;
  });

  // Test the getAllBadges function
  it("should retrieve all badges", async () => {
    const badges = await getAllBadges();

    expect(badges).to.be.an("array");
    expect(badges).to.not.be.empty;
  });

  // Test the getBadgeByBadgeId function
  it("should retrieve a badge by its ID", async () => {
    const badge = await getBadgeByBadgeId(testBadgeId);

    expect(badge).to.be.not.null;
  });

  // Test the updateBadge function
  it("should update a badge by its ID", async () => {
    const updatedBadgeName = "Updated Test Badge";
    const updatedBadgeDescription = "Updated Test Badge Description";
    const updatedImgPath = "/images/updated-test-badge.png";

    const updatedBadge = await updateBadge(
      testBadgeId,
      updatedBadgeName,
      updatedBadgeDescription,
      updatedImgPath
    );

    expect(updatedBadge).to.be.not.null;
  });

  // Test the deleteBadge function
  it("should delete a badge by its ID", async () => {

    const deletedBadge = await deleteBadge(testBadgeId);

    expect(deletedBadge).to.be.not.null;
  });
});
