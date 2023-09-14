const { expect } = require("chai");

const { getDashboardPageData } = require("../controllers/dashboardPageController");

describe("Dashboard Page Controller", () => {
  it("should fetch data for the Dashboard Page", async () => {
    const dashboardData = await getDashboardPageData();

    // Add specific assertions based on the expected data structure and values
    expect(dashboardData).to.be.an("object");
    expect(dashboardData.donations).to.be.an("object");
    expect(dashboardData.supporters).to.be.an("object");
    expect(dashboardData.types).to.be.an("object");
    expect(dashboardData.totalUsers).to.be.an("object");
    expect(dashboardData.totalAmount).to.be.an("object");
  });
});
