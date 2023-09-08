const pool = require('../database');

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
                 (username, password, email, firstname, lastname) 
                 VALUES ($1, $2, $3, $4, $5) 
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

/**
 * Retrieves a user by UserID from the database
 * 
 * @param {number} userId The UserID of the user to retrieve
 * @return {object} The user data
 */
async function getUserByUserId(userId) {
  const query = 'SELECT * FROM usertable WHERE userid = $1';
  const values = [userId];

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
async function updateUser(userId, updatedUser) {
  const { username, password, email, fname, lname } = updatedUser;
  const query = `
    UPDATE usertable 
    SET username = $1, password = $2, email = $3, firstname = $4, lastname = $5
    WHERE userid = $6
    RETURNING *
  `;
  const values = [username, password, email, fname, lname, userId];

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
  const query = 'DELETE FROM usertable WHERE userid = $1 RETURNING *';
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
  getUserByUserId,
  updateUser,
  deleteUser
};