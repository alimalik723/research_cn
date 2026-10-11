// backend/src/server.js
// HTTP server entry point — starts the server and verifies DB connectivity.
'use strict';

require('dotenv').config();
const app = require('./app');

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log('╔════════════════════════════════════════╗');
    console.log(`║  UniResearch API listening on :${PORT}   ║`);
    console.log(`║  Base URL: http://localhost:${PORT}/api   ║`);
    console.log('╚════════════════════════════════════════╝');
});
