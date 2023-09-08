const pool = require('./database');

async function createTables() {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    // SQL script to create tables
    const sqlScript = `
      CREATE TABLE UserTable (
        UserID SERIAL PRIMARY KEY,
        Username VARCHAR(255) NOT NULL,
        Password VARCHAR(255) NOT NULL,
        Email VARCHAR(255) NOT NULL,
        FirstName VARCHAR(255),
        LastName VARCHAR(255),
      );

      CREATE TABLE EducationalCauseTable (
        CauseID SERIAL PRIMARY KEY,
        CauseName VARCHAR(255) NOT NULL,
        TargetedAmount DECIMAL(10, 2) NOT NULL,
        CurrentAmountDonated DECIMAL(10, 2) DEFAULT 0.00,
        SuppliesDonatedPerDollar DECIMAL(10, 2) NOT NULL,
        TypeID INT REFERENCES CauseTypeTable(TypeID) NOT NULL
      );

      CREATE TABLE DonationTable (
        DonationID SERIAL PRIMARY KEY,
        UserID INT REFERENCES UserTable(UserID) NOT NULL,
        CauseID INT REFERENCES EducationalCauseTable(CauseID) NOT NULL,
        AmountDonated DECIMAL(10, 2) NOT NULL,
        DonationTime TIMESTAMP
      );

      CREATE TABLE CauseTypeTable (
        TypeID SERIAL PRIMARY KEY,
        TypeName VARCHAR(255) NOT NULL
      );

      CREATE TABLE BadgeTable (
        BadgeID SERIAL PRIMARY KEY,
        BadgeName VARCHAR(255) NOT NULL,
        BadgeDescription TEXT
      );

      CREATE TABLE UserBadgeTable (
        UserBadgeID SERIAL PRIMARY KEY,
        UserID INT REFERENCES UserTable(UserID) NOT NULL,
        BadgeID INT REFERENCES BadgeTable(BadgeID) NOT NULL,
        CauseID INT REFERENCES EducationalCauseTable(CauseID) NOT NULL,
        AchievementTime TIMESTAMP
      );
    `;

    await client.query(sqlScript);

    await client.query('COMMIT');
    console.log('Tables created successfully.');
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error creating tables:', error);
  } finally {
    client.release();
  }
}

createTables();