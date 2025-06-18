const express = require('express');
const router = express.Router();
const db = require('../db/db');


/**
 * @swagger
 * /api/landlords:
 *   get:
 *     summary: Get all landlords
 *     tags: [Landlords]
 *     responses:
 *       200:
 *         description: List of landlords
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/', (req, res) => {
  console.log('GET landlords');
  db.all('SELECT * FROM landlords', [], (err, rows) => {
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
 * /api/landlords/{id}:
 *   get:
 *     summary: Get a landlord by ID
 *     tags: [Landlords]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Landlord ID
 *     responses:
 *       200:
 *         description: Landlord object
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
 *               
 *       404:
 *         description: Landlord not found
 */
router.get('/:id', (req, res) => {
  console.log('GET landlord by ID');
  const { id } = req.params;

  db.get('SELECT * FROM landlords WHERE id = ?', [id], (err, row) => {
    if (err) {
      console.log('GET BY ID error');
      return res.status(500).json({ error: err.message });
    }

    if (!row) {
      console.log('GET BY ID not found');
      return res.status(404).json({ error: 'Landlord not found' });
    }

    console.log('GET BY ID success');
    res.json(row);
  });
});


/**
 * @swagger
 * /api/landlords:
 *   post:
 *     summary: Create a new landlord
 *     tags: [Landlords]
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
 *             properties:
 *               name:
 *                 type: string
 *               phone:
 *                 type: string
 *               email:
 *                 type: string
 *             
 *     responses:
 *       200:
 *         description: Landlord created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 */
router.post('/', (req, res) => {
  console.log('POST landlord');
  const { name, phone, email } = req.body;
  const sql = 'INSERT INTO landlords (name, phone, email) VALUES (?, ?, ?)';
  db.run(sql, [name, phone, email], function (err) {
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
 * /api/landlords/{id}:
 *   put:
 *     summary: Update a landlord
 *     tags: [Landlords]
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
 *              
 *     responses:
 *       200:
 *         description: Landlord updated successfully
 */
router.put('/:id', (req, res) => {
  console.log('PUT landlord');
  const { id } = req.params;
  const { name, phone, email } = req.body;
  const sql = 'UPDATE landlords SET name = ?, phone = ?, email = ? WHERE id = ?';
  db.run(sql, [name, phone, email, id], function (err) {
    if (err) {
      console.log('PUT error');
      return res.status(400).json({ error: err.message });
    }
    console.log('PUT success');
    res.json({ message: 'Landlord updated' });
  });
});


/**
 * @swagger
 * /api/landlords/{id}:
 *   delete:
 *     summary: Delete a landlord
 *     tags: [Landlords]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Landlord deleted successfully
 */
router.delete('/:id', (req, res) => {
  console.log('DELETE landlord');
  const { id } = req.params;
  db.run('DELETE FROM landlords WHERE id = ?', [id], function (err) {
    if (err) {
      console.log('DELETE error');
      return res.status(500).json({ error: err.message });
    }
    console.log('DELETE success');
    res.json({ message: 'Landlord deleted' });
  });
});


module.exports = router;
