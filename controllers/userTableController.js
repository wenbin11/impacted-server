const pool = require("../database");

/**
 * Creates a new user in database
 *
 * @param {String} username username
 * @param {String} password password
 * @param {String} email email address
 * @param {String} fname first name
 * @param {String} lname last name
 * @return created user data
 */
async function createUser(username, password, email, fname, lname) {
  const query = `INSERT INTO usertable 
                 (username, password, email, firstname, lastname, date_joined) 
                 VALUES ($1, $2, $3, $4, $5, NOW()) 
                 RETURNING *
                `;

  const values = [username, password, email, fname, lname];

  try {
    const { rows } = await pool.query(query, values);
    return rows[0];
  } catch (error) {
    throw error;
  }
}

async function getAllUsers() {
  const query = ` SELECT 
        userid, username, email, firstname, lastname, date_joined 
      FROM 
        usertable 
      ORDER BY 
        userid 
      ASC;`;
  try {
    const { rows } = await pool.query(query);
    return rows;
  } catch (error) {
    throw error;
  }
}

/**
 * Retrieves a user by UserID from the database
 *
 * @param {number} userId The UserID of the user to retrieve
 * @return {object} The user data
 */
async function getUserByUserId(userId) {
  const query = "SELECT * FROM usertable WHERE userid = $1";
  const values = [userId];

  try {
    const { rows } = await pool.query(query, values);
    return rows[0];
  } catch (error) {
    throw error;
  }
}

/**
 * Retrieves a user by email from the database
 *
 * @param {number} email The email of the user to retrieve
 * @return {object} The user data
 */
async function getUserByEmail(email) {
  const query = "SELECT * FROM usertable WHERE email = $1";
  const values = [email];

  try {
    const { rows } = await pool.query(query, values);
    return rows[0];
  } catch (error) {
    throw error;
  }
}

/**
 * Updates user information in the database by UserID
 *
 * @param {number} userId The UserID of the user to update
 * @param {string} password new password
 * @return {object} The updated user data
 */
async function updatePassword(userId, password) {
  const query = `
    UPDATE usertable 
    SET password = $1
    WHERE userid = $2
    RETURNING *
  `;
  const values = [password, userId];

  try {
    const { rows } = await pool.query(query, values);
    return rows[0];
  } catch (error) {
    throw error;
  }
}

/**
 * Updates user information in the database by UserID
 *
 * @param {number} userId The UserID of the user to update
 * @param {object} updatedUser An object containing the updated user information
 * @return {object} The updated user data
 */
async function updateUserDetails(userId, updatedUser) {
  const { email, fname, lname } = updatedUser;
  const username = fname + " " + lname;

  const query = `
    UPDATE usertable 
    SET username = $1, email = $2, firstname = $3, lastname = $4
    WHERE userid = $5
    RETURNING *
  `;
  const values = [username, email, fname, lname, userId];

  try {
    const { rows } = await pool.query(query, values);
    return rows[0];
  } catch (error) {
    throw error;
  }
}

/**
 * Deletes a user by UserID from the database
 *
 * @param {number} userId The UserID of the user to delete
 * @return {object} The deleted user data
 */
async function deleteUser(userId) {
  const query = "DELETE FROM usertable WHERE userid = $1;";
  const values = [userId];

  try {
    const { rows } = await pool.query(query, values);
    return rows[0];
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createUser,
  getAllUsers,
  getUserByUserId,
  getUserByEmail,
  updatePassword,
  updateUserDetails,
  deleteUser,
};
