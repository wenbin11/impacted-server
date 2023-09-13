const pool = require("../database");

/**
 * Create a new donation entry
 *
 * @param {number} userId User ID making the donation
 * @param {number} causeId Cause ID to which the donation is made
 * @param {number} amountDonated Amount donated
 * @returns the new donation data
 */
async function createDonation(userId, causeId, amountDonated) {
  const query = `
    INSERT INTO donationtable (userid, causeid, amountdonated, donationtime)
    VALUES ($1, $2, $3, NOW())
    RETURNING *;
  `;
  const values = [userId, causeId, amountDonated];

  try {
    const { rows } = await pool.query(query, values);
    return rows[0];
  } catch (error) {
    throw error;
  }
}

async function getAllDonations() {
  const query = `SELECT 
                    dt.donationid,
                    ut.username,
                    ec.causename,
                    dt.amountdonated,
                    dt.donationtime
                  FROM 
                    donationtable AS dt
                  JOIN 
                    usertable AS ut ON dt.userid = ut.userid
                  JOIN 
                    educationalcausetable AS ec ON dt.causeid = ec.causeid
                  ORDER BY
                    dt.donationid ASC;
  `;
  try {
    const { rows } = await pool.query(query);
    return rows;
  } catch (error) {
    throw error;
  }
}

async function getDonationsByDonationId(donationId) {
  const query = "SELECT * FROM donationtable WHERE donationid = $1";
  const values = [donationId];

  try {
    const { rows } = await pool.query(query, values);
    return rows;
  } catch (error) {
    throw error;
  }
}

/**
 * Retrieves all donations made by a user
 *
 * @param {number} userId User ID to retrieve donations for
 * @return {object} The donation data
 */
async function getDonationsByUserId(userId) {
  const query = "SELECT * FROM donationtable WHERE userid = $1";
  const values = [userId];

  try {
    const { rows } = await pool.query(query, values);
    return rows;
  } catch (error) {
    throw error;
  }
}

/**
 * Update a donation entry by its ID
 *
 * @param {number} donationId Donation ID to be updated
 * @param {number} updatedAmountDonated Updated amount donated
 * @returns the updated donation data
 */
async function updateDonation(donationId, updatedAmountDonated) {
  const query = `
    UPDATE donationtable
    SET amountDonated = $1
    WHERE donationid = $2;
  `;

  const values = [updatedAmountDonated, donationId];
  try {
    const result = await pool.query(query, values);

    return result.rows[0];
  } catch (error) {
    throw error;
  }
}

/**
 * Delete a donation entry by its ID
 *
 * @param {number} donationId Donation ID to be deleted
 * @return the deleted donation data
 */
async function deleteDonation(donationId) {
  const query = "DELETE FROM donationtable WHERE donationid = $1;";
  const values = [donationId];
  try {
    const result = await pool.query(query, values);

    return result.rows[0];
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createDonation,
  getAllDonations,
  getDonationsByDonationId,
  getDonationsByUserId,
  updateDonation,
  deleteDonation,
};
