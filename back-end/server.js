// back-end/server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { createClient } = require('@clickhouse/client');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// ClickHouse client configuration
const clickhouseClient = createClient({
    url: process.env.CLICKHOUSE_HOST, // Changed from "host" to "url"
    username: process.env.CLICKHOUSE_USERNAME,
    password: process.env.CLICKHOUSE_PASSWORD,
    database: process.env.CLICKHOUSE_DATABASE,
  });

// Initialize database (create table if not exists)
async function initDatabase() {
  try {
    await clickhouseClient.exec({
      query: `
        CREATE TABLE IF NOT EXISTS users (
          id UUID DEFAULT generateUUIDv4(),
          firstName String,
          lastName String,
          address String,
          zipCode String,
          phoneNumber String,
          createdAt DateTime DEFAULT now()
        ) ENGINE = MergeTree()
        ORDER BY createdAt
      `,
      clickhouse_settings: { wait_end_of_query: 1 },
    });
    console.log('Table "users" created or already exists.');
  } catch (error) {
    console.error('Error creating table:', error);
  }
}

// Call initDatabase when the server starts
initDatabase();

// Route to handle form submission
app.post('/submit-form', async (req, res) => {
  const { firstName, lastName, address, zipCode, phoneNumber } = req.body;

  // Basic validation
  if (!firstName || !lastName || !address || !zipCode || !phoneNumber) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    await clickhouseClient.insert({
      table: 'users',
      values: [{ firstName, lastName, address, zipCode, phoneNumber }],
      format: 'JSONEachRow',
    });
    res.json({ message: 'Form data saved successfully' });
  } catch (error) {
    console.error('Error inserting data:', error);
    res.status(500).json({ error: 'Failed to save form data' });
  }
});

// Test route to verify server is running
app.get('/', (req, res) => {
  res.send('Backend server is running');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});