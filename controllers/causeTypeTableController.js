const pool = require("../database");

/**
 * Create a new cause type in the database
 *
 * @param {string} typeName Type name
 * @returns {object} the new cause type data
 */
async function createCauseType(typeName) {
  const query = `
    INSERT INTO causetypetable (typename)
    VALUES ($1);
  `;
  const values = [typeName];

  try {
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    throw error;
  }
}

/**
 * Retrieves all badges from the database
 *
 * @return {object} The badge data
 */
async function getAllCauseTypes() {
  const query = "SELECT * FROM causetypetable ORDER BY typeid ASC";

  try {
    const { rows } = await pool.query(query);
    return rows;
  } catch (error) {
    throw error;
  }
}

/**
 * Retrieves a cause type by their typeid from the database
 *
 * @param {number} typeId The id of the cause type
 * @return {object} The badge data
 */
async function getTypeByTypeId(typeId) {
  const query = "SELECT * FROM causetypetable WHERE typeid = $1;";

  try {
    const values = [typeId];
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    throw error;
  }
}

/**
 * Update a cause type by its ID
 *
 * @param {number} typeId Cause type ID to be updated
 * @param {string} updatedTypeName Updated type name
 * @returns {object} the updated cause type data
 */
async function updateCauseType(typeId, updatedTypeName) {
  const query = `
    UPDATE causetypetable
    SET typename = $1
    WHERE typeid = $2;
  `;

  const values = [updatedTypeName, typeId];
  try {
    const result = await pool.query(query, values);

    return result.rows[0];
  } catch (error) {
    throw error;
  }
}

/**
 * Delete a cause type by its ID
 *
 * @param {number} typeId Cause type ID to be deleted
 * @return {object} the deleted cause type data
 */
async function deleteCauseType(typeId) {
  const query = "DELETE FROM causetypetable WHERE typeid = $1;";
  const values = [typeId];
  try {
    const result = await pool.query(query, values);

    return result.rows[0];
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createCauseType,
  getAllCauseTypes,
  updateCauseType,
  getTypeByTypeId,
  deleteCauseType,
};
