const sqlite3 = require('sqlite3').verbose();
const db = require('../database');

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS payments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      method TEXT,
      amount REAL,
      date TEXT,
      notes TEXT,
      receipt_number TEXT,
      issued_by TEXT
    )
  `);
});

module.exports = db;
