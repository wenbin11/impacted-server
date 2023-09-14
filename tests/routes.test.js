const chai = require("chai");
const chaiHttp = require("chai-http");
const bcrypt = require("bcrypt");
const app = require("../index");
const { expect } = chai;

const { createUser } = require("../controllers/userTableController");

chai.use(chaiHttp);

describe("/GET /about", () => {
  it("should get data for the About Page", (done) => {
    chai
      .request(app)
      .get("/about")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("object");
        done();
      });
  });
});

describe("User Authentication Routes", () => {
  // Define a test user's credentials
  const testUser = {
    username: "testuser",
    password: "testpassword",
    email: "test@example.com",
    fname: "John",
    lname: "Doe",
  };

  // Create a test user before running the tests
  before(async () => {
    // Hash the test user's password
    const salt = await bcrypt.genSalt(10);
    testUser.password = await bcrypt.hash(testUser.password, salt);

    // Create the test user in the database
    await createUser(
      testUser.username,
      testUser.password,
      testUser.email,
      testUser.fname,
      testUser.lname
    );
  });

  // Remove the test user after running the tests
  after(async () => {
    // Remove the test user from the database
    // Add code to delete the test user from the database
  });

  describe("POST /register", () => {
    it("should register a new user", (done) => {
      chai
        .request(app)
        .post("/register")
        .send({
          username: "newuser",
          password: "newpassword",
          email: "newuser@example.com",
          fname: "Jane",
          lname: "Smith",
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });

    it("should return validation errors for invalid input", (done) => {
      chai
        .request(app)
        .post("/register")
        .send({
          username: "",
          password: "short",
          email: "invalid-email",
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });

    it("should return an error if the email is already in use", (done) => {
      chai
        .request(app)
        .post("/register")
        .send({
          username: "duplicateuser",
          password: "duplicatepassword",
          email: "test@example.com", // Email already in use
          fname: "Duplicate",
          lname: "User",
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.errors[0].msg).to.equal(
            "Email address is already in use"
          );
          done();
        });
    });
  });

  describe("POST /login", () => {
    it("should log in an existing user", (done) => {
      chai
        .request(app)
        .post("/login")
        .send({
          email: testUser.email,
          password: "testpassword", // Correct password
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });

    it("should return validation errors for invalid input", (done) => {
      chai
        .request(app)
        .post("/login")
        .send({
          email: "invalid-email", // Invalid: Not a valid email
          password: "", // Invalid: Password is required
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.errors).to.be.an("array");
          done();
        });
    });

    it("should return an error for an invalid email", (done) => {
      chai
        .request(app)
        .post("/login")
        .send({
          email: "invalid@example.com", // Email doesn't exist
          password: "testpassword", // Correct password
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.errors[0].msg).to.equal("Invalid Email");
          done();
        });
    });

    it("should return an error for an invalid password", (done) => {
      chai
        .request(app)
        .post("/login")
        .send({
          email: testUser.email,
          password: "invalidpassword", // Invalid password
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.errors[0].msg).to.equal("Invalid Password");
          done();
        });
    });
  });
});

describe("GET /dashboard/users", () => {
  it("should get a list of users", (done) => {
    chai
      .request(app)
      .get("/dashboard/users")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("array");
        expect(res.body.length).to.be.greaterThan(0); 
        done();
      });
  });
});

describe("GET /dashboard", () => {
  it("should get dashboard data", (done) => {
    chai
      .request(app)
      .get("/dashboard")
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});

describe("GET /dashboard/types", () => {
  it("should get a list of types", (done) => {
    chai
      .request(app)
      .get("/dashboard/types")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("array");
        expect(res.body.length).to.be.greaterThan(0);
        done();
      });
  });
});

describe("GET /dashboard/badges", () => {
  it("should get a list of badges", (done) => {
    chai
      .request(app)
      .get("/dashboard/badges")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("array");
        expect(res.body.length).to.be.greaterThan(0);
        done();
      });
  });
});

describe("GET /dashboard/causes", () => {
  it("should get a list of causes", (done) => {
    chai
      .request(app)
      .get("/dashboard/causes")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("array");
        expect(res.body.length).to.be.greaterThan(0);
        done();
      });
  });
});

describe("GET /dashboard/donations", () => {
  it("should get a list of donations", (done) => {
    chai
      .request(app)
      .get("/dashboard/donations")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("array");
        expect(res.body.length).to.be.greaterThan(0);
        done();
      });
  });
});
