const pool = require('../database');

/**
 * Create a new cause type 
 * 
 * @param {string} typeName Type name
 * @returns the new cause type data
 */
async function createCauseType(typeName) {
  const query = `
    INSERT INTO CauseTypeTable (TypeName)
    VALUES ($1)
    RETURNING *;
  `;
  const values = [typeName];

  try {
    const { rows } = await pool.query(query, values);
    return rows[0];
  } catch (error) {
    throw error;
  }
}

/**
 * Retrieves all cause types from the database
 * 
 * @return {object} The cause type data
 */
async function getAllCauseTypes() {
  const query = 'SELECT * FROM CauseTypeTable';

  try {
    const { rows } = await pool.query(query);
    return rows;
  } catch (error) {
    throw error;
  }
}

/**
 * Update a cause type by its ID 
 * 
 * @param {number} typeId Cause type ID to be updated 
 * @param {string} updatedTypeName Updated type name
 * @returns the updated cause type data
 */
async function updateCauseType(typeId, updatedTypeName) {
  const query = `
    UPDATE CauseTypeTable
    SET TypeName = $1
    WHERE TypeID = $2
    RETURNING *;
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
 * @return the deleted cause type data
 */
async function deleteCauseType(typeId) {
  const query = 'DELETE FROM CauseTypeTable WHERE TypeID = $1 RETURNING *;';
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
  deleteCauseType
};