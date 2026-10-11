// backend/src/controllers/opportunityController.js
// Express route handlers — delegate persistence to the model layer.
'use strict';

const model = require('../models/opportunityModel');

// ─── POST /api/opportunities ──────────────────────────────────
async function createOpportunity(req, res, next) {
    try {
        const payload = sanitize(req.body);
        const opportunity = await model.createOpportunity(payload);
        return res.status(201).json({
            success: true,
            message: 'Research opportunity created successfully.',
            data: opportunity,
        });
    } catch (err) {
        next(err);
    }
}

// ─── GET /api/opportunities ───────────────────────────────────
async function getAllOpportunities(req, res, next) {
    try {
        const opportunities = await model.getAllOpportunities();
        return res.status(200).json({
            success: true,
            count: opportunities.length,
            data: opportunities,
        });
    } catch (err) {
        next(err);
    }
}

// ─── GET /api/opportunities/:id ───────────────────────────────
async function getOpportunityById(req, res, next) {
    try {
        const opportunity = await model.getOpportunityById(req.params.id);
        if (!opportunity) {
            return res.status(404).json({
                success: false,
                message: `Research opportunity not found.`,
            });
        }
        return res.status(200).json({
            success: true,
            data: opportunity,
        });
    } catch (err) {
        next(err);
    }
}

// ─── PUT /api/opportunities/:id ───────────────────────────────
async function updateOpportunity(req, res, next) {
    try {
        const payload = sanitize(req.body);
        const opportunity = await model.updateOpportunity(req.params.id, payload);
        if (!opportunity) {
            return res.status(404).json({
                success: false,
                message: `Research opportunity not found.`,
            });
        }
        return res.status(200).json({
            success: true,
            message: 'Research opportunity updated successfully.',
            data: opportunity,
        });
    } catch (err) {
        next(err);
    }
}

// ─── DELETE /api/opportunities/:id ───────────────────────────
async function deleteOpportunity(req, res, next) {
    try {
        const deleted = await model.deleteOpportunity(req.params.id);
        if (!deleted) {
            return res.status(404).json({
                success: false,
                message: `Research opportunity not found.`,
            });
        }
        return res.status(200).json({
            success: true,
            message: `Research opportunity deleted successfully.`,
        });
    } catch (err) {
        next(err);
    }
}

// ─── Helper: strip and cast fields from validated body ────────
function sanitize(body) {
    return {
        title: body.title.trim(),
        description: body.description.trim(),
        research_area: body.research_area.trim(),
        faculty_name: body.faculty_name.trim(),
        department: body.department.trim(),
        required_skills: body.required_skills.trim(),
        available_positions: parseInt(body.available_positions, 10),
        application_deadline: body.application_deadline.trim(),
        status: body.status.trim(),
    };
}

module.exports = {
    createOpportunity,
    getAllOpportunities,
    getOpportunityById,
    updateOpportunity,
    deleteOpportunity,
};
