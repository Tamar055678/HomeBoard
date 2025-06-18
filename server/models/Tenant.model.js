const db = require('../db/db');

db.run(`
  CREATE TABLE IF NOT EXISTS tenants (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    phone TEXT,
    email TEXT,
    apartment_id INTEGER,
    FOREIGN KEY (apartment_id) REFERENCES apartments(id)
  )
`);
