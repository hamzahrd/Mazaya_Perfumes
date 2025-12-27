const mysql = require('mysql2/promise');
require('dotenv').config();

// No need to create a connection object here

async function testConnection() {
  try {
    console.log('Testing database connection...');
    
    // Connect to the database
    const [conn] = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'mazaya_perfumes',
    });
    
    // Check if tables exist
    const [rows] = await conn.execute('SHOW TABLES;');
    console.log('Tables in database:', rows);
    
    // Check if users table exists
    try {
      const [userRows] = await conn.execute('SELECT * FROM users LIMIT 1;');
      console.log('Users table exists and has data');
    } catch (err) {
      console.log('Users table does not exist or is empty');
    }
    
    // Check if products table exists
    try {
      const [productRows] = await conn.execute('SELECT * FROM products LIMIT 1;');
      console.log('Products table exists and has data');
    } catch (err) {
      console.log('Products table does not exist or is empty');
    }
    
    conn.end();
    console.log('Database connection test completed');
  } catch (error) {
    console.error('Error connecting to database:', error);
  }
}

testConnection();