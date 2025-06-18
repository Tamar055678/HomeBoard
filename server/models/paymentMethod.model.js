const db = require('../db/db');

db.run(`
  CREATE TABLE IF NOT EXISTS paymentMethods (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL
  )
`);
