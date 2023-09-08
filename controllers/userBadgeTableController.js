const pool = require('../database');

/**
 * Create a new user badge entry
 * 
 * @param {number} userId User ID
 * @param {number} badgeId Badge ID
 * @param {number} causeId Cause ID
 * @param {timestamp} achievementTime Achievement time
 * @returns the new user badge entry data
 */
async function createUserBadge(userId, badgeId, causeId, achievementTime) {
  const query = `
    INSERT INTO UserBadgeTable (UserID, BadgeID, CauseID, AchievementTime)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;
  const values = [userId, badgeId, causeId, achievementTime];

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
  const query = 'SELECT * FROM UserBadgeTable';

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
 * @param {timestamp} updatedAchievementTime Updated achievement time
 * @returns the updated user badge entry data
 */
async function updateUserBadge(userBadgeId, userId, badgeId, causeId, updatedAchievementTime) {
  const query = `
    UPDATE UserBadgeTable
    SET UserID = $1, BadgeID = $2, CauseID = $3, AchievementTime = $4
    WHERE UserBadgeID = $5
    RETURNING *;
  `;

  const values = [userId, badgeId, causeId, updatedAchievementTime, userBadgeId];
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
  const query = 'DELETE FROM UserBadgeTable WHERE UserBadgeID = $1 RETURNING *;';
  const values = [userBadgeId];
  try {
    const result = await pool.query(query, values);

    return result.rows[0];
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createUserBadge,
  getAllUserBadges,
  updateUserBadge,
  deleteUserBadge
};
