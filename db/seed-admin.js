import 'dotenv/config';
import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';
import crypto from 'node:crypto';

const email = process.env.ADMIN_EMAIL;
const password = process.env.ADMIN_PASSWORD;
const fullName = process.env.ADMIN_FULL_NAME || 'Infinity AI Admin';

if (!email || !password) {
  console.error('Set ADMIN_EMAIL and ADMIN_PASSWORD before running this script.');
  process.exit(1);
}

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

try {
  const passwordHash = await bcrypt.hash(password, 12);
  const id = crypto.randomUUID();
  await pool.query(
    `INSERT INTO admins (id, email, password_hash, full_name, role, status)
     VALUES (?, ?, ?, ?, 'super_admin', 'Active')
     ON DUPLICATE KEY UPDATE password_hash = VALUES(password_hash), full_name = VALUES(full_name), status = 'Active'`,
    [id, email.trim().toLowerCase(), passwordHash, fullName]
  );
  console.log(`Admin ready: ${email.trim().toLowerCase()}`);
} finally {
  await pool.end();
}
