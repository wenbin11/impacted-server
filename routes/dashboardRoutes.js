const express = require("express");
const bodyParser = require("body-parser");
const {
  getDashboardPageData,
} = require("../controllers/dashboardPageController.js");
const {
  getAllUsers,
  deleteUser,
} = require("../controllers/userTableController.js");
const {
  createBadge,
  getAllBadges,
  getBadgeByBadgeId,
  updateBadge,
  deleteBadge,
} = require("../controllers/badgeTableController.js");
const {
  getAllCauseTypes,
  deleteCauseType,
  updateCauseType,
  getTypeByTypeId,
  createCauseType,
} = require("../controllers/causeTypeTableController.js");
const {
  createEducationalCause,
  deleteEducationalCause,
  updateEducationalCause,
  getAllEducationalCauses,
  getEducationalCauseByCauseId,
} = require("../controllers/educationalCauseTableController.js");
const {
  createDonation,
  getAllDonations,
  getDonationsByDonationId,
  updateDonation,
  deleteDonation,
} = require("../controllers/donationTableController.js");

const router = express.Router();
router.use(bodyParser.json());

router.get("/dashboard", async (req, res) => {
  try {
    // Call a function to retrieve data from the database
    const dashboard = await getDashboardPageData();
    res.json(dashboard);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/dashboard/users", async (req, res) => {
  try {
    // Call a function to retrieve data from the database
    const users = await getAllUsers();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/dashboard/users/delete/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    // Call a function to retrieve data from the database
    const users = await deleteUser(userId);
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/dashboard/types", async (req, res) => {
  try {
    // Call a function to retrieve data from the database
    const types = await getAllCauseTypes();
    res.json(types);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/dashboard/get-type/:typeId", async (req, res) => {
  const { typeId } = req.params;
  try {
    // Call a function to retrieve data from the database
    const types = await getTypeByTypeId(typeId);
    res.json(types);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/dashboard/update-type/:typeId", async (req, res) => {
  const { typeId } = req.params;
  const { typeName } = req.body;
  try {
    // Call a function to retrieve data from the database
    const types = await updateCauseType(typeId, typeName);
    res.json(types);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/dashboard/add-type", async (req, res) => {
  const { typeName } = req.body;
  try {
    // Call a function to retrieve data from the database
    const types = await createCauseType(typeName);
    res.json("Create Donation Type Successful!");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/dashboard/types/delete/:typeId", async (req, res) => {
  const { typeId } = req.params;
  try {
    // Call a function to retrieve data from the database
    const type = await deleteCauseType(typeId);
    res.json(type);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/dashboard/badges", async (req, res) => {
  try {
    // Call a function to retrieve data from the database
    const types = await getAllBadges();
    res.json(types);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/dashboard/get-badge/:badgeId", async (req, res) => {
  const { badgeId } = req.params;
  try {
    // Call a function to retrieve data from the database
    const types = await getBadgeByBadgeId(badgeId);
    res.json(types);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/dashboard/update-badge/:badgeId", async (req, res) => {
  const { badgeId } = req.params;
  const { newBadgeName, newBadgeDescription, newImgPath } = req.body;
  try {
    // Call a function to retrieve data from the database
    const types = await updateBadge(
      badgeId,
      newBadgeName,
      newBadgeDescription,
      newImgPath
    );
    res.json(types);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/dashboard/add-badge", async (req, res) => {
  const { badgeName, badgeDescription, imgPath } = req.body;
  try {
    // Call a function to retrieve data from the database
    const types = await createBadge(badgeName, badgeDescription, imgPath);
    res.json("Create Badge Successful!");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/dashboard/badges/delete/:badgeId", async (req, res) => {
  const { badgeId } = req.params;
  try {
    // Call a function to retrieve data from the database
    const type = await deleteBadge(badgeId);
    res.json(type);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/dashboard/causes", async (req, res) => {
  try {
    // Call a function to retrieve data from the database
    const types = await getAllEducationalCauses();
    res.json(types);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/dashboard/get-cause/:causeId", async (req, res) => {
  const { causeId } = req.params;
  try {
    // Call a function to retrieve data from the database
    const types = await getEducationalCauseByCauseId(causeId);
    res.json(types);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/dashboard/update-cause/:causeId", async (req, res) => {
  const { causeId } = req.params;
  try {
    // Call a function to retrieve data from the database
    const types = await updateEducationalCause(causeId, req.body);
    res.json(types);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/dashboard/add-cause", async (req, res) => {
  const { causeName, targetAmount, suppliesPerDollar, typeId, imgPath } =
    req.body;
  try {
    // Call a function to retrieve data from the database
    const types = await createEducationalCause(
      causeName,
      targetAmount,
      suppliesPerDollar,
      typeId,
      imgPath
    );
    res.json("Create Cause Successful!");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/dashboard/causes/delete/:causeId", async (req, res) => {
  const { causeId } = req.params;
  try {
    // Call a function to retrieve data from the database
    const type = await deleteEducationalCause(causeId);
    res.json(type);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/dashboard/donations", async (req, res) => {
  try {
    // Call a function to retrieve data from the database
    const types = await getAllDonations();
    res.json(types);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/dashboard/get-donation/:donationId", async (req, res) => {
  const { donationId } = req.params;
  try {
    // Call a function to retrieve data from the database
    const types = await getDonationsByDonationId(donationId);
    res.json(types);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/dashboard/update-donation/:donationId", async (req, res) => {
  const { donationId } = req.params;
  const { amountDonated } = req.body;
  try {
    // Call a function to retrieve data from the database
    const types = await updateDonation(donationId, amountDonated);
    res.json(types);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/dashboard/add-donation", async (req, res) => {
  const { userId, causeId, amountDonated } = req.body;
  try {
    // Call a function to retrieve data from the database
    const types = await createDonation(userId, causeId, amountDonated);
    res.json("Create Donation Successful!");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/dashboard/donations/delete/:donationId", async (req, res) => {
  const { donationId } = req.params;
  try {
    // Call a function to retrieve data from the database
    const type = await deleteEducationalCause(donationId);
    res.json(type);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
