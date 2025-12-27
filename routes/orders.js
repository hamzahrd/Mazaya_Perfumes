const express = require('express');
const router = express.Router();
const db = require('../config/database');
const jwt = require('jsonwebtoken');

// Create a new order
router.post('/', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Access denied' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret_key');
    const { shippingAddress, items, totalAmount } = req.body;

    // Start a transaction
    const connection = await db.getConnection();
    await connection.beginTransaction();

    try {
      // Insert order
      const orderResult = await connection.query(
        'INSERT INTO orders (user_id, shipping_address, total_amount, status) VALUES (?, ?, ?, ?)',
        [decoded.userId, JSON.stringify(shippingAddress), totalAmount, 'pending']
      );

      const orderId = orderResult.insertId;

      // Insert order items
      for (const item of items) {
        await connection.query(
          'INSERT INTO order_items (order_id, product_id, quantity, unit_price) VALUES (?, ?, ?, ?)',
          [orderId, item.productId, item.quantity, item.price]
        );
      }

      // Handle pack customizations if this is a pack order
      if (items.some(item => item.isPack)) {
        for (const item of items.filter(i => i.isPack)) {
          if (item.packContents) {
            await connection.query(
              'INSERT INTO pack_customizations (order_id, product_id, selected_perfumes) VALUES (?, ?, ?)',
              [orderId, item.productId, JSON.stringify(item.packContents)]
            );
          }
        }
      }

      await connection.commit();
      connection.release();

      res.status(201).json({
        orderId,
        message: 'Order created successfully',
        status: 'pending'
      });
    } catch (error) {
      await connection.rollback();
      connection.release();
      throw error;
    }
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user's orders
router.get('/user', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Access denied' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret_key');

    const [orders] = await db.query(
      'SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC',
      [decoded.userId]
    );

    res.json(orders);
  } catch (error) {
    console.error('Get user orders error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get a specific order by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Access denied' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret_key');

    const [orders] = await db.query(
      'SELECT * FROM orders WHERE id = ? AND user_id = ?',
      [id, decoded.userId]
    );

    if (orders.length === 0) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Get order items
    const [orderItems] = await db.query(
      'SELECT oi.*, p.name, p.images FROM order_items oi JOIN products p ON oi.product_id = p.id WHERE oi.order_id = ?',
      [id]
    );

    // Get pack customizations if any
    const [packCustomizations] = await db.query(
      'SELECT * FROM pack_customizations WHERE order_id = ?',
      [id]
    );

    const order = orders[0];
    order.items = orderItems;
    order.pack_customizations = packCustomizations;

    res.json(order);
  } catch (error) {
    console.error('Get order error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update order status (admin only)
router.put('/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    await db.query('UPDATE orders SET status = ? WHERE id = ?', [status, id]);

    res.json({ message: 'Order status updated successfully' });
  } catch (error) {
    console.error('Update order status error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Track order by order ID (public endpoint)
router.get('/track/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const [orders] = await db.query('SELECT id, status, created_at, updated_at FROM orders WHERE id = ?', [id]);

    if (orders.length === 0) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json(orders[0]);
  } catch (error) {
    console.error('Track order error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;