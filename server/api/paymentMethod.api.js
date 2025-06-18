const express = require('express');
const router = express.Router();
const db = require('../db/db');

/**
 * @swagger
 * /api/payment-methods:
 *   get:
 *     summary: Get all payment methods
 *     tags: [PaymentMethods]
 *     responses:
 *       200:
 *         description: List of payment methods
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/', (req, res) => {
  console.log('GET payment methods');
  db.all('SELECT * FROM paymentMethods', [], (err, rows) => {
    if (err) {
      console.log('GET error');
      return res.status(500).json({ error: err.message });
    }
    console.log('GET success');
    res.json(rows);
  });
});

/**
 * @swagger
 * /api/payment-methods/{id}:
 *   get:
 *     summary: Get a payment method by ID
 *     tags: [PaymentMethods]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Payment method ID
 *     responses:
 *       200:
 *         description: Payment method object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *       404:
 *         description: Payment method not found
 */
router.get('/:id', (req, res) => {
  console.log('GET payment method by ID');
  const { id } = req.params;

  db.get('SELECT * FROM paymentMethods WHERE id = ?', [id], (err, row) => {
    if (err) {
      console.log('GET BY ID error');
      return res.status(500).json({ error: err.message });
    }

    if (!row) {
      console.log('GET BY ID not found');
      return res.status(404).json({ error: 'Payment method not found' });
    }

    console.log('GET BY ID success');
    res.json(row);
  });
});

/**
 * @swagger
 * /api/payment-methods:
 *   post:
 *     summary: Create a new payment method
 *     tags: [PaymentMethods]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Payment method created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 */
router.post('/', (req, res) => {
  console.log('POST payment method');
  const { name } = req.body;
  const sql = 'INSERT INTO paymentMethods (name) VALUES (?)';
  db.run(sql, [name], function (err) {
    if (err) {
      console.log('POST error');
      return res.status(400).json({ error: err.message });
    }
    console.log('POST success');
    res.json({ id: this.lastID });
  });
});

/**
 * @swagger
 * /api/payment-methods/{id}:
 *   put:
 *     summary: Update a payment method
 *     tags: [PaymentMethods]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Payment method updated successfully
 */
router.put('/:id', (req, res) => {
  console.log('PUT payment method');
  const { id } = req.params;
  const { name } = req.body;
  const sql = 'UPDATE paymentMethods SET name = ? WHERE id = ?';
  db.run(sql, [name, id], function (err) {
    if (err) {
      console.log('PUT error');
      return res.status(400).json({ error: err.message });
    }
    console.log('PUT success');
    res.json({ message: 'Payment method updated' });
  });
});

/**
 * @swagger
 * /api/payment-methods/{id}:
 *   delete:
 *     summary: Delete a payment method
 *     tags: [PaymentMethods]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Payment method deleted successfully
 */
router.delete('/:id', (req, res) => {
  console.log('DELETE payment method');
  const { id } = req.params;
  db.run('DELETE FROM paymentMethods WHERE id = ?', [id], function (err) {
    if (err) {
      console.log('DELETE error');
      return res.status(500).json({ error: err.message });
    }
    console.log('DELETE success');
    res.json({ message: 'Payment method deleted' });
  });
});

module.exports = router;
