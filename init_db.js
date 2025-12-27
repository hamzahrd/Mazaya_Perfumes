const mysql = require('mysql2/promise');
require('dotenv').config();

async function initDatabase() {
  let connection;
  
  try {
    console.log('Connecting to MySQL server...');
    
    // Connect without specifying database first
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
    });
    
    console.log('Connected to MySQL server');
    
    // Check if database exists
    const [databases] = await connection.execute("SHOW DATABASES LIKE ?", [process.env.DB_NAME || 'mazaya_perfumes']);
    
    if (databases.length === 0) {
      console.log(`Database ${process.env.DB_NAME || 'mazaya_perfumes'} does not exist. Creating it...`);
      await connection.execute(`CREATE DATABASE \`${process.env.DB_NAME || 'mazaya_perfumes'}\``);
      console.log(`Database created successfully`);
    } else {
      console.log(`Database ${process.env.DB_NAME || 'mazaya_perfumes'} already exists`);
    }
    
    // Use the database
    await connection.execute(`USE \`${process.env.DB_NAME || 'mazaya_perfumes'}\``);
    
    // SQL statements for creating tables
    const createTablesSQL = [
      `CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        shipping_address JSON,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )`,
      
      `CREATE TABLE IF NOT EXISTS products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        price DECIMAL(10, 2) NOT NULL,
        category ENUM('Parfum Homme', 'Parfum Femme', 'Parfum Unisexe', 'Packs Exclusifs') NOT NULL,
        sizes JSON, -- JSON array of available sizes
        images JSON, -- JSON array of image URLs
        fragrance_notes JSON, -- JSON object with top, heart, base notes
        stock_quantity INT DEFAULT 0,
        is_active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )`,
      
      `CREATE TABLE IF NOT EXISTS orders (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        shipping_address JSON NOT NULL,
        total_amount DECIMAL(10, 2) NOT NULL,
        status ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )`,
      
      `CREATE TABLE IF NOT EXISTS order_items (
        id INT AUTO_INCREMENT PRIMARY KEY,
        order_id INT NOT NULL,
        product_id INT NOT NULL,
        quantity INT NOT NULL,
        unit_price DECIMAL(10, 2) NOT NULL,
        FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
        FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
      )`,
      
      `CREATE TABLE IF NOT EXISTS cart_items (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        product_id INT NOT NULL,
        quantity INT NOT NULL DEFAULT 1,
        size VARCHAR(50),
        pack_contents JSON, -- For pack of 5 perfumes selections
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
      )`,
      
      `CREATE TABLE IF NOT EXISTS pack_customizations (
        id INT AUTO_INCREMENT PRIMARY KEY,
        order_id INT NOT NULL,
        product_id INT NOT NULL,
        selected_perfumes JSON NOT NULL, -- JSON array of selected perfume IDs for the pack
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
        FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
      )`,
      
      `CREATE INDEX IF NOT EXISTS idx_products_category ON products(category)`,
      `CREATE INDEX IF NOT EXISTS idx_products_name ON products(name)`,
      `CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id)`,
      `CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status)`,
      `CREATE INDEX IF NOT EXISTS idx_cart_user_id ON cart_items(user_id)`
    ];
    
    console.log('Creating tables if they don\'t exist...');
    
    for (const sql of createTablesSQL) {
      try {
        await connection.execute(sql);
      } catch (err) {
        console.error('Error executing SQL:', sql.substring(0, 50) + '...');
        console.error('Error details:', err.message);
      }
    }
    
    console.log('Database initialization completed successfully');
    
    // Check existing tables
    const [tables] = await connection.execute('SHOW TABLES;');
    console.log('Tables in database:', tables);
    
    await connection.end();
    console.log('Connection closed');
  } catch (error) {
    console.error('Error during database initialization:', error);
    if (connection) {
      await connection.end();
    }
  }
}

initDatabase();