const { Client } = require('pg');
require('dotenv').config();

async function setupDatabase() {
  // First, connect to PostgreSQL default database
  const client = new Client({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'postgres' // Connect to default database first
  });

  try {
    await client.connect();
    console.log('✅ Connected to PostgreSQL');

    // Check if our database exists
    const result = await client.query(
      "SELECT datname FROM pg_database WHERE datname = $1",
      [process.env.DB_NAME]
    );

    if (result.rows.length === 0) {
      // Create the database if it doesn't exist
      await client.query(`CREATE DATABASE ${process.env.DB_NAME}`);
      console.log(`✅ Database ${process.env.DB_NAME} created successfully`);
    } else {
      console.log(`✅ Database ${process.env.DB_NAME} already exists`);
    }

  } catch (error) {
    console.error('❌ Database setup error:', error.message);
    if (error.message.includes('password authentication failed')) {
      console.log('\nPossible solutions:');
      console.log('1. Check if PostgreSQL is installed');
      console.log('2. Verify the password in your .env file matches your PostgreSQL password');
      console.log('3. If you forgot your password, you can reset it using:');
      console.log('   - Windows: Run Command Prompt as Administrator');
      console.log('   - Navigate to PostgreSQL bin directory');
      console.log('   - Run: ALTER USER postgres WITH PASSWORD \'new_password\';');
    }
  } finally {
    await client.end();
  }
}

// Run the setup
setupDatabase(); 