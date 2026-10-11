// backend/src/config/db.js
// Centralized MySQL connection pool using mysql2 + dotenv
'use strict';

const mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'research_opportunity_portal',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    charset: 'utf8mb4',
});

// Test connection on startup (non-fatal, logs only)
pool.getConnection((err, connection) => {
    if (err) {
        console.error('[DB] Connection pool error:', err.message);
        return;
    }
    console.log('[DB] MySQL connection pool established successfully.');
    connection.release();
});

// Export promise-based pool
module.exports = pool.promise();
