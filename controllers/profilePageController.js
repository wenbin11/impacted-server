const pool = require("../database");
const { getUserByUserId } = require("./userTableController");

/**
 * Fetches data for the User Profile Page.
 *
 * This function retrieves data about the user such as their past donations,
 * their personal information and the badges they have received
 * 
 * @param {number} userId the user id of the user
 * @returns {object} An object containing information about the user.
 * @throws {Error} If an error occurs while executing the database queries.
 */
async function getUserProfilePageData(userId) {
  try {
    // Query One: Fetch user badge details based on their userid
    const queryOne = `
            SELECT
                bt.badgename,
                bt.badgedescription,
                bt.img_path,
                ut.firstname,
                ut.lastname,
                ut.email,
                ubt.achievementtime
            FROM
                badgetable AS bt
            JOIN
                userbadgetable ubt ON bt.badgeid = ubt.badgeid
            JOIN 
                usertable ut ON ubt.userid = ut.userid
            WHERE
                ut.userid = $1;
        `;

    // Query Two: Get the user past donation details
    const queryTwo = `
            SELECT
                ec.causename,
                dt.donationid,
                dt.amountdonated,
                dt.donationtime
            FROM
                educationalcausetable AS ec
            JOIN
                donationtable dt ON ec.causeid = dt.causeid
            WHERE
                dt.userid = $1;
        `;
    const values = [userId];

    // Execute queries
    const userInfo = await getUserByUserId(userId);
    const resultOne = await pool.query(queryOne, values);
    const resultTwo = await pool.query(queryTwo, values);

    // Construct data to be returned
    const results = {
      badgeInfo: resultOne.rows,
      pastDonations: resultTwo.rows,
      userInfo: userInfo,
    };

    return results;
  } catch (error) {
    console.error("Error executing queries:", error);
    throw error;
  }
}

module.exports = {
  getUserProfilePageData,
};
