const express = require('express');
const router = express.Router();
const db = require('../database');

// Create
router.post('/', (req, res) => {
  const { method, amount, date, notes, receipt_number, issued_by } = req.body;
  const query = `
    INSERT INTO payments (method, amount, date, notes, receipt_number, issued_by)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  db.run(query, [method, amount, date, notes, receipt_number, issued_by], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: this.lastID });
  });
});

// Read All
router.get('/', (req, res) => {
  db.all('SELECT * FROM payments', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Update
router.put('/:id', (req, res) => {
  const { method, amount, date, notes, receipt_number, issued_by } = req.body;
  const query = `
    UPDATE payments SET method=?, amount=?, date=?, notes=?, receipt_number=?, issued_by=?
    WHERE id=?
  `;
  db.run(query, [method, amount, date, notes, receipt_number, issued_by, req.params.id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ changes: this.changes });
  });
});

// Delete
router.delete('/:id', (req, res) => {
  db.run('DELETE FROM payments WHERE id=?', [req.params.id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ deleted: this.changes });
  });
});

module.exports = router;
