const pool = require("../database.js");

/**
 * Create a new badge
 *
 * @param {string} badgeName Badge name
 * @param {string} badgeDescription Badge description
 * @returns the new badge data
 */
async function createBadge(badgeName, badgeDescription, img_path) {
  const query = `
    INSERT INTO badgetable (badgename, badgedescription, img_path)
    VALUES ($1, $2, $3);
  `;
  const values = [badgeName, badgeDescription, img_path];

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
async function getAllBadges() {
  const query = "SELECT * FROM badgetable ORDER BY badgeid ASC;";

  try {
    const { rows } = await pool.query(query);
    return rows;
  } catch (error) {
    throw error;
  }
}

async function getBadgeByBadgeId(badgeId) {
  const query = "SELECT * FROM badgetable WHERE badgeid = $1;";
  const values = [badgeId];

  try {
    const result = await pool.query(query, values);
    return result.rows[0];
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
async function updateBadge(
  badgeId,
  updatedBadgeName,
  updatedBadgeDescription,
  img_path
) {
  const query = `
    UPDATE badgetable
    SET badgename = $1, badgedescription = $2, img_path = $3
    WHERE badgeid = $4;
  `;

  const values = [
    updatedBadgeName,
    updatedBadgeDescription,
    img_path,
    badgeId,
  ];
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
  const query = "DELETE FROM badgetable WHERE badgeid = $1 RETURNING *;";
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
  getBadgeByBadgeId,
  updateBadge,
  deleteBadge,
};
