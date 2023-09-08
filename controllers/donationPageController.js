const pool = require('../database');

/**
 * Fetches data for the Donation Page.
 *
 * This function retrieves data about educational causes that have not yet reached
 * their funding targets. It includes cause names, target supplies, current supplies,
 * total supporters, cause types, and image paths.
 *
 * @returns {Array} An array of objects containing information about educational causes.
 * @throws {Error} If an error occurs while executing the database queries.
 */
async function getDonationPageData() {
    try {
        // Query One: Fetch data for educational causes that haven't reached their targets.
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
        throw error;
    }
}

module.exports = {
    getDonationPageData
}