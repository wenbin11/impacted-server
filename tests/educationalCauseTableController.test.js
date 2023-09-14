const { expect } = require("chai");
const sinon = require("sinon");
const app = require("../index");

// Import your controller functions
const {
  createEducationalCause,
  getAllEducationalCauses,
  updateEducationalCause,
} = require("../controllers/educationalCauseTableController");

describe("Educational Cause Table Controller", () => {
  it("should create an educational cause in the database", async () => {
    // Mock the request data
    const causeName = "New Cause";
    const targetedAmount = 5000;
    const suppliesDonatedPerDollar = 0.03;
    const typeId = 4;
    const image_path = "new_image.png";

    // Call the createUser function with mock data and the mocked pool
    const createdEntry = await createEducationalCause(
      causeName,
      targetedAmount,
      suppliesDonatedPerDollar,
      typeId,
      image_path
    );

    // Assert that the pool.query method was called with the correct SQL query and values
    expect(createdEntry).to.not.be.null;
    expect(createdEntry).to.have.property("causeid");
    expect(createdEntry.causename).to.equal(causeName);
    expect(createdEntry.typeid).to.equal(typeId);
  });

  it("should get all entries in the database", async () => {
    // Call the createUser function with mock data and the mocked pool
    const getAllResults = await getAllEducationalCauses();

    // Assert that the result is an array
    expect(getAllResults).to.be.an("array");

    // Assert that the array is not empty
    expect(getAllResults).to.not.be.empty;

    // Assert that each user object has the expected properties
    getAllResults.forEach((result) => {
      expect(result).to.have.property("causename");
      expect(result).to.have.property("causeid");
      expect(result).to.have.property("image_path");
    });
  });

  it("should get update an educational cause in the database", async () => {
    // Call the createUser function with mock data and the mocked pool

    const causeId = 7;
    const updatedData = {
      causeName: "Cause Name",
      targetedAmount: 510.0,
      currentAmountDonated: 200.0,
      suppliesDonatedPerDollar: 0.42,
      typeId: 4,
      image_path: "image.png",
    };

    const updatedResults = await updateEducationalCause(causeId, updatedData);

    expect(updatedResults).to.not.be.null;
    
  });

//   it("should get delete an entry in the database", async () => {
//     // Call the createUser function with mock data and the mocked pool

//     const causeId = 8;

//     const deletedResults = await deleteEducationalCause(causeId);

//     expect(deletedResults).to.not.be.null;
//   });
});
