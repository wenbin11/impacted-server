const pool = require("../database");
const { getUserByUserId } = require("./userTableController");

async function getUserProfilePageData(userId) {
  try {
    // Query One: Fetch user badge details based on their userid
    const queryOne = `
            SELECT
                bt.badgename,
                bt.badgedescription,
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
    
    const userInfo = await getUserByUserId(userId);
    const resultOne = await pool.query(queryOne, values);
    const resultTwo = await pool.query(queryTwo, values);

    const results = {
        badgeInfo: resultOne.rows,
        pastDonations: resultTwo.rows,
        userInfo: userInfo
    }

    return results;

  } catch (error) {
    console.error("Error executing queries:", error);
    throw error;
  }
}

module.exports = {
  getUserProfilePageData,
};
