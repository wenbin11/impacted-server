const { expect } = require("chai");

const {
  createDonation,
  getAllDonations,
  getDonationsByDonationId,
  getDonationsByUserId,
  updateDonation,
  deleteDonation,
} = require("../controllers/donationTableController");

describe("Donation Table Controller", () => {
  it("should create a new donation", async () => {
    const userId = 1; // Replace with a valid user ID
    const causeId = 1; // Replace with a valid cause ID
    const amountDonated = 100; // Replace with the donation amount

    const newDonation = await createDonation(userId, causeId, amountDonated);

    expect(newDonation).to.have.property("donationid");
    expect(newDonation.userid).to.equal(userId);
    expect(newDonation.causeid).to.equal(causeId);
    expect(newDonation.amountdonated).to.equal("100.00");
  });

  it("should retrieve all donations", async () => {
    const allDonations = await getAllDonations();

    expect(allDonations).to.be.an("array");
    expect(allDonations).to.not.be.empty;
  });

  it("should retrieve donations by donation ID", async () => {
    const donationId = 1; // Replace with a valid donation ID

    const donations = await getDonationsByDonationId(donationId);

    expect(donations).to.not.be.null;
  });

  it("should retrieve donations by user ID", async () => {
    const userId = 1; // Replace with a valid user ID

    const donations = await getDonationsByUserId(userId);

    expect(donations).to.be.an("array");
    expect(donations).to.not.be.empty;
  });

  it("should delete a donation", async () => {
    const donationIdToDelete = 1; // Replace with a valid donation ID

    const deletedDonation = await deleteDonation(donationIdToDelete);

    expect(deletedDonation).to.not.be.null;
  });
});
