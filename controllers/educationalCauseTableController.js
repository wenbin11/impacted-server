const pool = require("../database");

/**
 * Create a new educational cause
 *
 * @param {string} causeName
 * @param {number} targetedAmount
 * @param {number} suppliesDonatedPerDollar
 * @param {number} typeId
 * @param {string} image_path
 * @returns the new educational cause data
 */
async function createEducationalCause(
  causeName,
  targetedAmount,
  suppliesDonatedPerDollar,
  typeId,
  image_path
) {
  const query = `
      INSERT INTO educationalcausetable (causename, targetedamount, suppliesdonatedperdollar, typeid, image_path)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;
  const values = [
    causeName,
    targetedAmount,
    suppliesDonatedPerDollar,
    typeId,
    image_path,
  ];

  try {
    const { rows } = await pool.query(query, values);
    return rows[0];
  } catch (error) {
    throw error;
  }
}

/**
 * Retrieves all educational causes from the database
 *
 * @return {array} The educational cause data
 */
async function getAllEducationalCauses() {
  const query = `SELECT 
                  ec.causeid,
                  ec.causename,
                  ec.targetedamount,
                  ec.currentamountdonated,
                  ec.suppliesdonatedperdollar,
                  ct.typename,
                  ec.image_path
                FROM 
                  educationalcausetable AS ec
                JOIN 
                  causetypetable as ct ON ec.typeid = ct.typeid
                ORDER BY
                  ec.causeid ASC;
  `;

  try {
    const { rows } = await pool.query(query);
    return rows;
  } catch (error) {
    throw error;
  }
}

/**
 * Retrieves an educational cause by CauseID from the database
 *
 * @param {number} causeId The causeID of the educational cause to retrieve
 * @return {object} The educational cause data
 */
async function getEducationalCauseByCauseId(causeId) {
  const query = "SELECT * FROM educationalcausetable WHERE causeid = $1";
  const values = [causeId];

  try {
    const { rows } = await pool.query(query, values);
    return rows[0];
  } catch (error) {
    throw error;
  }
}

/**
 * Update an educational cause by its ID
 *
 * @param {string} causeId the CauseID to be updated
 * @param {object} updatedData an object of updated values
 * @returns the updated educational cause data
 */
async function updateEducationalCause(causeId, updatedData) {
  const query = `
    UPDATE educationalcausetable
  SET causename = $1, targetedamount = $2, currentamountdonated = $3, suppliesdonatedperdollar = $4, typeid = $5, image_path = $6
    WHERE causeid = $7;
  `;

  const values = [
    updatedData.causeName,
    updatedData.targetedAmount,
    updatedData.currentAmountDonated,
    updatedData.suppliesDonatedPerDollar,
    updatedData.typeId,
    updatedData.image_path,
    causeId,
  ];
  try {
    const result = await pool.query(query, values);

    return result.rows[0];
  } catch (error) {
    throw error;
  }
}

/**
 * Update the current amount donated by its ID
 *
 * @param {string} causeId the CauseID to be updated
 * @param {number} donatedAmount the new donated amount to be added
 * @returns the updated educational cause data
 */
async function updateDonationAmount(causeId, donatedAmount) {
  const query = `
    UPDATE educationalcausetable
      SET currentamountdonated = currentamountdonated + $1
      WHERE causeid = $2
      RETURNING *;
  `;

  const values = [donatedAmount, causeId];
  try {
    const result = await pool.query(query, values);

    return result.rows[0];
  } catch (error) {
    throw error;
  }
}

/**
 * Delete an educational cause by its ID
 *
 * @param {string} causeId the CauseID to be deleted
 * @return the deleted educational cause data
 */
async function deleteEducationalCause(causeId) {
  const query = "DELETE FROM educationalcausetable WHERE causeid = $1;";
  const values = [causeId];
  try {
    const result = await pool.query(query, values);

    return result.rows[0];
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createEducationalCause,
  getAllEducationalCauses,
  getEducationalCauseByCauseId,
  updateEducationalCause,
  updateDonationAmount,
  deleteEducationalCause,
};
