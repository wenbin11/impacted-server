const { expect } = require("chai");

const {
  createCauseType,
  getAllCauseTypes,
  updateCauseType,
  getTypeByTypeId,
  deleteCauseType,
} = require("../controllers/causeTypeTableController");

describe("Cause Type Controller", () => {
  let testCauseTypeId;

  // Test the createCauseType function
  it("should create a new cause type", async () => {
    const typeName = "Test Cause Type";

    const newCauseType = await createCauseType(typeName);

    expect(newCauseType).to.be.not.null;

    // Save the created cause type ID for later use
    testCauseTypeId = 9;
  });

  // Test the getAllCauseTypes function
  it("should retrieve all cause types", async () => {
    const causeTypes = await getAllCauseTypes();

    expect(causeTypes).to.be.an("array");
    expect(causeTypes).to.not.be.empty;
  });

  // Test the getTypeByTypeId function
  it("should retrieve a cause type by its ID", async () => {
    const causeType = await getTypeByTypeId(testCauseTypeId);

    expect(causeType.typeid).to.equal(testCauseTypeId);
  });

  // Test the updateCauseType function
  it("should update a cause type by its ID", async () => {
    const updatedTypeName = "Updated Cause Type";

    const updatedCauseType = await updateCauseType(9, updatedTypeName);

    expect(updatedCauseType).to.be.not.null;
  });

  // Test the deleteCauseType function
  it("should delete a cause type by its ID", async () => {
    const deletedCauseType = await deleteCauseType(11);

    expect(deletedCauseType).to.be.not.null;
  });
});
