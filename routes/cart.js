const express = require('express');
const router = express.Router();
const db = require('../config/database');
const jwt = require('jsonwebtoken');

// Get user's cart
router.get('/', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Access denied' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret_key');

    // Get cart items for the user
    const [cartItems] = await db.query(
      `SELECT ci.*, p.name, p.price, p.images, p.category
       FROM cart_items ci
       JOIN products p ON ci.product_id = p.id
       WHERE ci.user_id = ?`,
      [decoded.userId]
    );

    res.json(cartItems);
  } catch (error) {
    console.error('Get cart error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add item to cart
router.post('/', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Access denied' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret_key');
    const { productId, quantity, size, packContents } = req.body;

    // Check if item already exists in cart
    let [existingItems] = await db.query(
      'SELECT id, quantity FROM cart_items WHERE user_id = ? AND product_id = ? AND size = ?',
      [decoded.userId, productId, size || null]
    );

    if (existingItems.length > 0) {
      // Update quantity if item exists
      const newQuantity = existingItems[0].quantity + (quantity || 1);
      await db.query(
        'UPDATE cart_items SET quantity = ? WHERE id = ?',
        [newQuantity, existingItems[0].id]
      );
      res.json({ message: 'Cart updated successfully', cartItemId: existingItems[0].id });
    } else {
      // Insert new cart item
      const result = await db.query(
        'INSERT INTO cart_items (user_id, product_id, quantity, size, pack_contents) VALUES (?, ?, ?, ?, ?)',
        [decoded.userId, productId, quantity || 1, size || null, packContents ? JSON.stringify(packContents) : null]
      );
      res.status(201).json({ message: 'Item added to cart', cartItemId: result.insertId });
    }
  } catch (error) {
    console.error('Add to cart error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update cart item quantity
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Access denied' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret_key');

    await db.query(
      'UPDATE cart_items SET quantity = ? WHERE id = ? AND user_id = ?',
      [quantity, id, decoded.userId]
    );

    res.json({ message: 'Cart item updated successfully' });
  } catch (error) {
    console.error('Update cart item error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Remove item from cart
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Access denied' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret_key');

    await db.query(
      'DELETE FROM cart_items WHERE id = ? AND user_id = ?',
      [id, decoded.userId]
    );

    res.json({ message: 'Item removed from cart' });
  } catch (error) {
    console.error('Remove from cart error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Clear user's cart
router.delete('/', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Access denied' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret_key');

    await db.query(
      'DELETE FROM cart_items WHERE user_id = ?',
      [decoded.userId]
    );

    res.json({ message: 'Cart cleared' });
  } catch (error) {
    console.error('Clear cart error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;