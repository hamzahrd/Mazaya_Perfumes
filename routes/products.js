const express = require('express');
const router = express.Router();
const db = require('../config/database');

// Get all products with optional category filter
router.get('/', async (req, res) => {
  try {
    const { category, search, limit, offset } = req.query;
    let query = 'SELECT * FROM products WHERE 1=1';
    let params = [];

    if (category) {
      query += ' AND category = ?';
      params.push(category);
    }

    if (search) {
      query += ' AND (name LIKE ? OR description LIKE ?)';
      params.push(`%${search}%`, `%${search}%`);
    }

    query += ' ORDER BY created_at DESC';

    if (limit) {
      query += ' LIMIT ?';
      params.push(parseInt(limit));
      if (offset) {
        query += ' OFFSET ?';
        params.push(parseInt(offset));
      }
    }

    const [products] = await db.query(query, params);
    res.json(products);
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get a single product by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [products] = await db.query('SELECT * FROM products WHERE id = ?', [id]);
    
    if (products.length === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.json(products[0]);
  } catch (error) {
    console.error('Get product error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get products by category
router.get('/category/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const [products] = await db.query(
      'SELECT * FROM products WHERE category = ? ORDER BY created_at DESC',
      [category]
    );
    
    res.json(products);
  } catch (error) {
    console.error('Get products by category error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create a new product (admin only)
router.post('/', async (req, res) => {
  try {
    const { name, description, price, category, sizes, images, fragrance_notes } = req.body;
    
    const result = await db.query(
      'INSERT INTO products (name, description, price, category, sizes, images, fragrance_notes) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, description, price, category, JSON.stringify(sizes), JSON.stringify(images), JSON.stringify(fragrance_notes)]
    );
    
    res.status(201).json({
      id: result.insertId,
      message: 'Product created successfully'
    });
  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update a product (admin only)
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, category, sizes, images, fragrance_notes } = req.body;
    
    await db.query(
      'UPDATE products SET name = ?, description = ?, price = ?, category = ?, sizes = ?, images = ?, fragrance_notes = ? WHERE id = ?',
      [name, description, price, category, JSON.stringify(sizes), JSON.stringify(images), JSON.stringify(fragrance_notes), id]
    );
    
    res.json({ message: 'Product updated successfully' });
  } catch (error) {
    console.error('Update product error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a product (admin only)
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    await db.query('DELETE FROM products WHERE id = ?', [id]);
    
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get best selling products
router.get('/best-selling', async (req, res) => {
  try {
    const [products] = await db.query(`
      SELECT p.*, COUNT(oi.product_id) as order_count
      FROM products p
      LEFT JOIN order_items oi ON p.id = oi.product_id
      GROUP BY p.id
      ORDER BY order_count DESC
      LIMIT 10
    `);
    
    res.json(products);
  } catch (error) {
    console.error('Get best selling products error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;