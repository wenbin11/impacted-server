const { expect } = require("chai");
const request = require("supertest");
const sinon = require("sinon");
const app = require("../index");

// Import your controller functions
const {
  createUser,
  getAllUsers,
  getUserByUserId,
  getUserByEmail,
  updatePassword,
  updateUserDetails,
  deleteUser,
} = require("../controllers/userTableController");

describe("User Controller", () => {
  // Assuming you have an Express app, you can use supertest to test your API endpoints
  // Create a new user
  it("API endpoint should work", async () => {
    const newUser = {
      username: "testuser",
      password: "testpassword",
      email: "test@example.com",
      fname: "John",
      lname: "Doe",
    };

    const response = await request(app).post("/register").send(newUser);

    expect(response.status).to.equal(400);
  });

  it("should create a user in the database", async () => {
    // Mock the request data
    const username = "testuser";
    const password = "password123";
    const email = "test@example.com";
    const fname = "John";
    const lname = "Doe";

    // Call the createUser function with mock data and the mocked pool
    const createdUser = await createUser(
      username,
      password,
      email,
      fname,
      lname
    );

    // Assert that the pool.query method was called with the correct SQL query and values
    expect(createdUser).to.not.be.null;
    expect(createdUser).to.have.property("userid");
    expect(createdUser.username).to.equal(username);
    expect(createdUser.email).to.equal(email);
  });

  it("should get a user by userId in the database", async () => {
    // Call the createUser function with mock data and the mocked pool
    const userId = 3;

    const userData = await getUserByUserId(3);

    // Assert that the array is not empty
    expect(userData).to.not.be.null;
    expect(userData.userid).to.equal(userId);
    expect(userData).to.have.property("email");
    expect(userData).to.have.property("lastname");
    expect(userData).to.have.property("username");
  });

  it("should get a user by email in the database", async () => {
    // Call the createUser function with mock data and the mocked pool
    const email = "admin@example.com";

    const userData = await getUserByEmail(email);

    // Assert that the array is not empty
    expect(userData).to.not.be.null;
    expect(userData.email).to.equal(email);
    expect(userData).to.have.property("userid");
    expect(userData).to.have.property("lastname");
    expect(userData).to.have.property("username");
  });

  it("should get all users in the database", async () => {
    // Call the createUser function with mock data and the mocked pool
    const allUsers = await getAllUsers();

    // Assert that the result is an array
    expect(allUsers).to.be.an("array");

    // Assert that the array is not empty
    expect(allUsers).to.not.be.empty;

    // Assert that each user object has the expected properties
    allUsers.forEach((user) => {
      expect(user).to.have.property("userid");
      expect(user).to.have.property("username");
      expect(user).to.have.property("email");
      expect(user).to.have.property("firstname");
      expect(user).to.have.property("lastname");
      expect(user).to.have.property("date_joined");
    });
  });

  it("should get update a user in the database", async () => {
    // Call the createUser function with mock data and the mocked pool

    const userId = 3;
    const updatedData = {
      email: "newuser@example.com",
      fname: "new",
      lname: "user",
    };

    const updatedUser = await updateUserDetails(userId, updatedData);

    expect(updatedUser).to.not.be.null;
    expect(updatedUser.email).to.equal(updatedData.email);
    expect(updatedUser.firstname).to.equal(updatedData.fname);
    expect(updatedUser.lastname).to.equal(updatedData.lname);
  });

  it("should get update password in the database", async () => {
    // Call the createUser function with mock data and the mocked pool

    const userId = 3;
    const newPassword = "secret";

    const updatedUser = await updatePassword(userId, newPassword);

    expect(updatedUser).to.not.be.null;
    expect(newPassword).to.equal(updatedUser.password);
    expect(userId).to.equal(updatedUser.userid);
  });
});
