const pool = require("../database");

/**
 * Fetches data for the Dashboard Page.
 *
 * This function retrieves various data points related to ImpactEd's initiatives,
 * including line charts data and pie chart data.
 *
 * @returns {Object} An object containing information about line chart data and pie chart data.
 * @throws {Error} If an error occurs while executing the database queries.
 */
async function getDashboardPageData() {
  try {
    // Query One: Fetch total donation made per day
    const queryOne = `
            SELECT 
                DATE_TRUNC('day', donationtime) AS Date,
                SUM(amountDonated) AS total
            FROM
                donationtable
            GROUP BY
                Date;
        `;

    // Query Two: Fetch the total number of new users created each day
    const queryTwo = `
            SELECT 
                DATE_TRUNC('day', date_joined) AS Date,
                COUNT(DISTINCT userid) AS total
            FROM
                usertable
            GROUP BY
                Date;
        `;

    // Query Three: Get the total donation made for each cause type
    const queryThree = `
        SELECT 
            ct.typename AS causeType,
            SUM(ec.currentamountdonated)
        FROM causetypetable ct
        JOIN educationalcausetable ec ON ct.typeid = ec.typeid
        GROUP BY ct.typeid;
    `;

    // Calculate the total donated amount
    const queryFour = `
        SELECT 
            SUM(amountDonated) AS total
        FROM
            donationtable;
    `;

    // Calculate the total number of donors
    const queryFive = `
        SELECT 
            Count(Distinct userid) AS total
        FROM
            usertable;
    `;

    // Execute SQL queries
    const resultOne = await pool.query(queryOne);
    const resultTwo = await pool.query(queryTwo);
    const resultThree = await pool.query(queryThree);
    const resultFour = await pool.query(queryFour);
    const resultFive = await pool.query(queryFive);

    // Extract data for Echarts 
    const donationDate = resultOne.rows.map((item) => item.date);
    const donationSeries = resultOne.rows.map((item) => item.total);

    const supportersDate = resultTwo.rows.map((item) => item.date);
    const supportersSeries = resultTwo.rows.map((item) => item.total);

    const typeLegend = resultThree.rows.map((item) => item.causetype);
    const typeSeries = resultThree.rows.map((item) => parseInt(item.sum));

    // Construct results to be returned back to frontend
    const donationChartData = { donationDate, donationSeries };
    const supportersChartData = { supportersDate, supportersSeries };
    const pieChartData = { typeLegend, typeSeries };

    const results = {
      donations: donationChartData,
      supporters: supportersChartData,
      types: pieChartData,
      totalUsers: resultFive.rows[0],
      totalAmount: resultFour.rows[0],
    };

    return results;
  } catch (error) {
    console.error("Error executing queries:", error);
    throw error;
  }
}

module.exports = {
  getDashboardPageData,
};
