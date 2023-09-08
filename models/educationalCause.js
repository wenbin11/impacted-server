const pool = require('../database');

/**
 * Create a new educational cause 
 * 
 * @param {string} causeName 
 * @param {number} targetedAmount 
 * @param {number} suppliesDonatedPerDollar 
 * @returns the new educational cause data
 */
async function createEducationalCause(causeName, targetedAmount, suppliesDonatedPerDollar, typeId) {
  const query = `
      INSERT INTO educationalcausetable (causename, targetedamount, suppliesdonatedperdollar, typeid)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
  const values = [causeName, targetedAmount, suppliesDonatedPerDollar, typeId];

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
 * @return {object} The educational cause data
 */
async function getAllEducationalCauses() {
  const query = 'SELECT * FROM educationalcausetable';

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
  const query = 'SELECT * FROM educationalcausetable WHERE causeid = $1';
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
    SET causename = $1, targetedamount = $2, suppliesdonatedperdollar = $3, typeid = $4
    WHERE causeid = $4
    RETURNING *;
  `;

  const values = [updatedData.causeName, updatedData.targetedAmount, updatedData.suppliesDonatedPerDollar, updatedData.typeId, causeId];
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
  const query = 'DELETE FROM educationalcausetable WHERE causeid = $1 RETURNING *;';
  const values = [causeId];
  try {
    const result = await pool.query(query, values);

    return result.rows[0];
  } catch (error) {
    throw error;
  }
}

async function getLearningResources() {
  const query = 'SELECT currentamountdonated * suppliesdonatedperdollar AS result from educationalcausetable;';
  try {
    const result = await pool.query(query)
    console.log(result.rows);
    return result.rows;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createEducationalCause,
  getAllEducationalCauses,
  getEducationalCauseByCauseId,
  updateEducationalCause,
  deleteEducationalCause,
  getLearningResources,
};