const pool = require("../database");

async function getDashboardPageData() {
  try {
    // Query One: Fetch user badge details based on their userid
    const queryOne = `
            SELECT 
                DATE_TRUNC('day', donationtime) AS Date,
                SUM(amountDonated) AS total
            FROM
                donationtable
            GROUP BY
                Date;
        `;

    // Query Two: Get the user past donation details
    const queryTwo = `
            SELECT 
                DATE_TRUNC('day', date_joined) AS Date,
                COUNT(DISTINCT userid) AS total
            FROM
                usertable
            GROUP BY
                Date;
        `;

    const queryThree = `
        SELECT 
            ct.typename AS causeType,
            SUM(ec.currentamountdonated)
        FROM causetypetable ct
        JOIN educationalcausetable ec ON ct.typeid = ec.typeid
        GROUP BY ct.typeid;
    `;

    const queryFour = `
        SELECT 
            SUM(amountDonated) AS total
        FROM
            donationtable;
    `;

    const queryFive = `
        SELECT 
            Count(Distinct userid) AS total
        FROM
            usertable;
    `;

    const resultOne = await pool.query(queryOne);
    const resultTwo = await pool.query(queryTwo);
    const resultThree = await pool.query(queryThree);
    const resultFour = await pool.query(queryFour);
    const resultFive = await pool.query(queryFive);

    const donationDate = resultOne.rows.map((item) => item.date);
    const donationSeries = resultOne.rows.map((item) => item.total);

    const supportersDate = resultTwo.rows.map((item) => item.date);
    const supportersSeries = resultTwo.rows.map((item) => item.total);

    const typeLegend = resultThree.rows.map((item) => item.causetype);
    const typeSeries = resultThree.rows.map((item) => parseInt(item.sum));

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
