const pool = require('../database');

async function getAboutPageData() {
    try {
        // Query One
        const resultOne = await pool.query(`
            SELECT 
                SUM(currentamountdonated * suppliesdonatedperdollar) 
                AS 
                result 
            FROM educationalcausetable;
        `);
        
        // Query Two
        const resultTwo = await pool.query(`
            SELECT 
                DATE_TRUNC('day', dt.donationtime) AS latestDay,
                SUM(ec.currentamountdonated * ec.suppliesdonatedperdollar) AS donationValue,
                DATE_PART('day', NOW() - DATE_TRUNC('day', dt.donationtime)) AS daysDifference
            FROM donationtable dt 
            JOIN educationalcausetable ec ON dt.causeid = ec.causeid
            GROUP BY latestDay
            ORDER BY latestDay DESC
            LIMIT 1;
        `);

        // Query Three
        const resultThree = await pool.query(`
            SELECT COUNT(DISTINCT userid) AS totalsupporters 
            FROM donationtable;
        `);

        // Query Four
        const resultFour = await pool.query(`
            SELECT 
                DATE_TRUNC('day', dt.donationtime) AS latestDay,
                COUNT(DISTINCT dt.userid) AS usersjoin,
                DATE_PART('day', NOW() - DATE_TRUNC('day', dt.donationtime)) AS daysDifference
            FROM donationtable dt 
            GROUP BY latestDay
            ORDER BY latestDay DESC
            LIMIT 1;
        `);

        // Query Five
        const resultFive = await pool.query(`
            SELECT 
                COUNT(causename) AS goalsReached
            FROM educationalcausetable
            WHERE currentamountdonated >= targetedamount;
        `);

        // Query Six
        const resultSix = await pool.query(`
            WITH LatestDonation AS (
                SELECT
                    ec.causeid,
                    MAX(dt.donationtime) AS latestDonationTime
                FROM donationtable dt
                JOIN educationalcausetable ec ON dt.causeid = ec.causeid
                WHERE ec.currentamountdonated >= ec.targetedamount
                GROUP BY ec.causeid
            )

            SELECT 
                ec.causename AS causename,
                DATE_TRUNC('day', dt.donationtime) AS latestDay,
                DATE_PART('day', NOW() - DATE_TRUNC('day', dt.donationtime)) AS daysDifference
            FROM donationtable dt 
            JOIN educationalcausetable ec ON dt.causeid = ec.causeid
            JOIN LatestDonation ld ON dt.causeid = ld.causeid AND dt.donationtime = ld.latestDonationTime
            ORDER BY latestDay DESC
            ;
        `);

        // Query Seven
        const resultSeven = await pool.query(`
            SELECT 
              ct.typename AS causeType,
              SUM(ec.currentamountdonated)
            FROM causetypetable ct
            JOIN educationalcausetable ec ON ct.typeid = ec.typeid
            GROUP BY ct.typeid;
        `);

        const legend = resultSeven.rows.map(item => item.causetype);
        const data = resultSeven.rows.map(item => parseInt(item.sum));
        const pieChartData = { legend, data };

        result = {
            learningResources: {
                count: parseInt(resultOne.rows[0].result),
                incremented: parseInt(resultTwo.rows[0].donationvalue),
                daysDifference: resultTwo.rows[0].daysdifference,
            },
            supporters: {
                count: resultThree.rows[0].totalsupporters,
                incremented: parseInt(resultFour.rows[0].usersjoin),
                daysDifference: resultFour.rows[0].daysdifference,
            },
            goals: {
                count: resultFive.rows[0].goalsreached,
                incremented: resultSix.rows.length,
                daysDifference: resultSix.rows[0].daysdifference,
            },
            pieChartData,
        }

        return result;
    } catch (error) {
        console.error("Error executing queries:", error);
    }
}

async function getDonationPageData() {
    try {
        // Query One
        const resultOne = await pool.query(`
            SELECT
                ec.causeid AS causeid,
                ec.causename AS causename,
                SUM(ec.targetedamount * ec.suppliesdonatedperdollar) AS targetSupplies,
                SUM(ec.currentamountdonated * ec.suppliesdonatedperdollar) AS currentSupplies,
                COUNT(DISTINCT dt.userid) AS totalsupporters,
                ct.typename AS typename,
                ec.image_path AS image_path
            FROM
                educationalcausetable ec
            JOIN
                donationtable dt ON ec.causeid = dt.causeid
            JOIN 
                causetypetable ct ON ec.typeid = ct.typeid
            WHERE
                ec.currentamountdonated < ec.targetedamount
            GROUP BY
                ec.causename,
                ct.typename,
                ec.causeid;
        `);

        return resultOne.rows;

    } catch (error) {
        console.error("Error executing queries:", error);
    }
}

module.exports = {
  getAboutPageData,
  getDonationPageData,
};
