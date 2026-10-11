// backend/src/app.js
// Express application configuration — middleware, CORS, routes, error handler.
'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const opportunityRoutes = require('./routes/opportunityRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// ─── CORS ─────────────────────────────────────────────────────
const allowedOrigin = process.env.FRONTEND_ORIGIN || 'http://localhost:5173';
app.use(cors({
    origin: allowedOrigin,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

// ─── Body Parsing ─────────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─── Health Check ─────────────────────────────────────────────
app.get('/api/health', (req, res) => {
    res.status(200).json({ success: true, message: 'UniResearch API is running.' });
});

// ─── API Routes ───────────────────────────────────────────────
app.use('/api/opportunities', opportunityRoutes);

// ─── 404 Handler (unmatched routes) ──────────────────────────
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: `Route ${req.method} ${req.originalUrl} not found.`,
    });
});

// ─── Global Error Handler (must be last) ─────────────────────
app.use(errorHandler);

module.exports = app;
