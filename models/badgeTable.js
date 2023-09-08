const pool = require('./database.js');

/**
 * Create a new badge 
 * 
 * @param {string} badgeName Badge name
 * @param {string} badgeDescription Badge description
 * @returns the new badge data
 */
async function createBadge(badgeName, badgeDescription) {
  const query = `
    INSERT INTO BadgeTable (BadgeName, BadgeDescription)
    VALUES ($1, $2)
    RETURNING *;
  `;
  const values = [badgeName, badgeDescription];

  try {
    const { rows } = await pool.query(query, values);
    return rows[0];
  } catch (error) {
    throw error;
  }
}

/**
 * Retrieves all badges from the database
 * 
 * @return {object} The badge data
 */
async function getAllBadges() {
  const query = 'SELECT * FROM BadgeTable';

  try {
    const { rows } = await pool.query(query);
    return rows;
  } catch (error) {
    throw error;
  }
}

/**
 * Update a badge by its ID 
 * 
 * @param {number} badgeId Badge ID to be updated 
 * @param {string} updatedBadgeName Updated badge name
 * @param {string} updatedBadgeDescription Updated badge description
 * @returns the updated badge data
 */
async function updateBadge(badgeId, updatedBadgeName, updatedBadgeDescription) {
  const query = `
    UPDATE BadgeTable
    SET BadgeName = $1, BadgeDescription = $2
    WHERE BadgeID = $3
    RETURNING *;
  `;

  const values = [updatedBadgeName, updatedBadgeDescription, badgeId];
  try {
    const result = await pool.query(query, values);

    return result.rows[0];
  } catch (error) {
    throw error;
  } 
}

/**
 * Delete a badge by its ID 
 * 
 * @param {number} badgeId Badge ID to be deleted 
 * @return the deleted badge data
 */
async function deleteBadge(badgeId) {
  const query = 'DELETE FROM BadgeTable WHERE BadgeID = $1 RETURNING *;';
  const values = [badgeId];
  try {
    const result = await pool.query(query, values);

    return result.rows[0];
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createBadge,
  getAllBadges,
  updateBadge,
  deleteBadge
};
