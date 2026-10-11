// backend/src/middleware/errorHandler.js
// Global Express error handler — must be registered LAST in app.js.
'use strict';

// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
    // Log technical detail to server console only
    console.error('[Error Handler]', err.stack || err.message);

    // Never expose raw DB/stack errors to the client
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        success: false,
        message: statusCode === 500
            ? 'An unexpected server error occurred. Please try again later.'
            : err.message,
    });
}

module.exports = errorHandler;
