const pool = require("../database");

/**
 * Create a new user badge entry
 *
 * @param {number} userId User ID
 * @param {number} badgeId Badge ID
 * @param {number} causeId Cause ID
 * @param {timestamp} achievementTime Achievement time
 * @returns the new user badge entry data
 */
async function createUserBadge(userId, badgeId, causeId) {
  const query = `
    INSERT INTO userbadgetable (userid, badgeid, causeid, achievementtime)
    VALUES ($1, $2, $3, NOW()) RETURNING *;
  `;
  const values = [userId, badgeId, causeId];

  try {
    const { rows } = await pool.query(query, values);
    return rows[0];
  } catch (error) {
    throw error;
  }
}

/**
 * Retrieves all user badge entries from the database
 *
 * @return {object} The user badge entry data
 */
async function getAllUserBadges() {
  const query = "SELECT * FROM userbadgetable";

  try {
    const { rows } = await pool.query(query);
    return rows;
  } catch (error) {
    throw error;
  }
}

/**
 * Update a user badge entry by its ID
 *
 * @param {number} userBadgeId User Badge ID to be updated
 * @param {number} userId User ID
 * @param {number} badgeId Badge ID
 * @param {number} causeId Cause ID
 * @param {timestamp} achievementTime Updated achievement time
 * @returns the updated user badge entry data
 */
async function updateUserBadge(
  userBadgeId,
  userId,
  badgeId,
  causeId,
  achievementTime
) {
  const query = `
    UPDATE userbadgetable
    SET userid = $1, badgeid = $2, causeid = $3, achievementtime = $4
    WHERE userbadgeid = $5;
  `;

  const values = [userId, badgeId, causeId, achievementTime, userBadgeId];
  try {
    const result = await pool.query(query, values);

    return result.rows[0];
  } catch (error) {
    throw error;
  }
}

/**
 * Delete a user badge entry by its ID
 *
 * @param {number} userBadgeId User Badge ID to be deleted
 * @return the deleted user badge entry data
 */
async function deleteUserBadge(userBadgeId) {
  const query = "DELETE FROM userbadgetable WHERE userbadgeid = $1;";
  const values = [userBadgeId];
  try {
    const result = await pool.query(query, values);

    return true;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createUserBadge,
  getAllUserBadges,
  updateUserBadge,
  deleteUserBadge,
};
