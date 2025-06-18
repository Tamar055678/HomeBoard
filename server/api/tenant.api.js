const express = require('express');
const router = express.Router();
const db = require('../db/db');


/**
 * @swagger
 * /api/tenants.api:
 *   get:
 *     summary: Get all tenants
 *     tags: [Tenants]
 *     responses:
 *       200:
 *         description: List of tenants
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/', (req, res) => {
  console.log('GET tenants');
  db.all('SELECT * FROM tenants', [], (err, rows) => {
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
 * /api/tenants.api/{id}:
 *   get:
 *     summary: Get a tenant by ID
 *     tags: [Tenants]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Tenant ID
 *     responses:
 *       200:
 *         description: Tenant object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 phone:
 *                   type: string
 *                 email:
 *                   type: string
 *                 apartment_id:
 *                   type: integer
 *       404:
 *         description: Tenant not found
 */
router.get('/:id', (req, res) => {
  console.log('GET tenant by ID');
  const { id } = req.params;

  db.get('SELECT * FROM tenants WHERE id = ?', [id], (err, row) => {
    if (err) {
      console.log('GET BY ID error');
      return res.status(500).json({ error: err.message });
    }

    if (!row) {
      console.log('GET BY ID not found');
      return res.status(404).json({ error: 'Tenant not found' });
    }

    console.log('GET BY ID success');
    res.json(row);
  });
});


/**
 * @swagger
 * /api/tenants.api:
 *   post:
 *     summary: Create a new tenant
 *     tags: [Tenants]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - phone
 *               - email
 *               - apartment_id
 *             properties:
 *               name:
 *                 type: string
 *               phone:
 *                 type: string
 *               email:
 *                 type: string
 *               apartment_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Tenant created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 */
router.post('/', (req, res) => {
  console.log('POST tenant');
  const { name, phone, email, apartment_id } = req.body;
  const sql = 'INSERT INTO tenants (name, phone, email, apartment_id) VALUES (?, ?, ?, ?)';
  db.run(sql, [name, phone, email, apartment_id], function (err) {
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
 * /api/tenants.api/{id}:
 *   put:
 *     summary: Update a tenant
 *     tags: [Tenants]
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
 *               phone:
 *                 type: string
 *               email:
 *                 type: string
 *               apartment_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Tenant updated successfully
 */
router.put('/:id', (req, res) => {
  console.log('PUT tenant');
  const { id } = req.params;
  const { name, phone, email, apartment_id } = req.body;
  const sql = 'UPDATE tenants SET name = ?, phone = ?, email = ?, apartment_id = ? WHERE id = ?';
  db.run(sql, [name, phone, email, apartment_id, id], function (err) {
    if (err) {
      console.log('PUT error');
      return res.status(400).json({ error: err.message });
    }
    console.log('PUT success');
    res.json({ message: 'Tenant updated' });
  });
});


/**
 * @swagger
 * /api/tenants.api/{id}:
 *   delete:
 *     summary: Delete a tenant
 *     tags: [Tenants]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Tenant deleted successfully
 */
router.delete('/:id', (req, res) => {
  console.log('DELETE tenant');
  const { id } = req.params;
  db.run('DELETE FROM tenants WHERE id = ?', [id], function (err) {
    if (err) {
      console.log('DELETE error');
      return res.status(500).json({ error: err.message });
    }
    console.log('DELETE success');
    res.json({ message: 'Tenant deleted' });
  });
});


module.exports = router;
