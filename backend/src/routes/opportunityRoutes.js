// backend/src/routes/opportunityRoutes.js
// Route definitions — routing only, no business logic.
'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/opportunityController');
const { validateOpportunity } = require('../middleware/validation');

// POST   /api/opportunities
router.post('/', validateOpportunity, controller.createOpportunity);

// GET    /api/opportunities
router.get('/', controller.getAllOpportunities);

// GET    /api/opportunities/:id
router.get('/:id', controller.getOpportunityById);

// PUT    /api/opportunities/:id
router.put('/:id', validateOpportunity, controller.updateOpportunity);

// DELETE /api/opportunities/:id
router.delete('/:id', controller.deleteOpportunity);

module.exports = router;
