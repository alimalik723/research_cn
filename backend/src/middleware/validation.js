// backend/src/middleware/validation.js
// Validates request body for create/update opportunity endpoints.
'use strict';

const VALID_STATUSES = ['Open', 'Closed'];

/**
 * Middleware: validates POST/PUT body before it reaches the controller.
 * Returns 400 with structured errors on failure.
 */
function validateOpportunity(req, res, next) {
    const errors = [];
    const b = req.body;

    // title
    if (!b.title || typeof b.title !== 'string' || b.title.trim() === '') {
        errors.push({ field: 'title', message: 'Title is required and must not be empty.' });
    } else if (b.title.trim().length > 255) {
        errors.push({ field: 'title', message: 'Title must not exceed 255 characters.' });
    }

    // description
    if (!b.description || typeof b.description !== 'string' || b.description.trim() === '') {
        errors.push({ field: 'description', message: 'Description is required and must not be empty.' });
    }

    // research_area
    if (!b.research_area || typeof b.research_area !== 'string' || b.research_area.trim() === '') {
        errors.push({ field: 'research_area', message: 'Research area is required.' });
    } else if (b.research_area.trim().length > 150) {
        errors.push({ field: 'research_area', message: 'Research area must not exceed 150 characters.' });
    }

    // faculty_name
    if (!b.faculty_name || typeof b.faculty_name !== 'string' || b.faculty_name.trim() === '') {
        errors.push({ field: 'faculty_name', message: 'Faculty name is required.' });
    } else if (b.faculty_name.trim().length > 150) {
        errors.push({ field: 'faculty_name', message: 'Faculty name must not exceed 150 characters.' });
    }

    // department
    if (!b.department || typeof b.department !== 'string' || b.department.trim() === '') {
        errors.push({ field: 'department', message: 'Department is required.' });
    } else if (b.department.trim().length > 150) {
        errors.push({ field: 'department', message: 'Department must not exceed 150 characters.' });
    }

    // required_skills
    if (!b.required_skills || typeof b.required_skills !== 'string' || b.required_skills.trim() === '') {
        errors.push({ field: 'required_skills', message: 'Required skills are required.' });
    }

    // available_positions
    const positions = Number(b.available_positions);
    if (b.available_positions === undefined || b.available_positions === null || b.available_positions === '') {
        errors.push({ field: 'available_positions', message: 'Available positions is required.' });
    } else if (!Number.isInteger(positions) || positions < 1) {
        errors.push({ field: 'available_positions', message: 'Available positions must be a positive integer (minimum 1).' });
    }

    // application_deadline
    if (!b.application_deadline || typeof b.application_deadline !== 'string' || b.application_deadline.trim() === '') {
        errors.push({ field: 'application_deadline', message: 'Application deadline is required.' });
    } else {
        const d = new Date(b.application_deadline);
        if (isNaN(d.getTime())) {
            errors.push({ field: 'application_deadline', message: 'Application deadline must be a valid date (YYYY-MM-DD).' });
        }
    }

    // status
    if (!b.status || typeof b.status !== 'string' || b.status.trim() === '') {
        errors.push({ field: 'status', message: 'Status is required.' });
    } else if (!VALID_STATUSES.includes(b.status.trim())) {
        errors.push({ field: 'status', message: `Status must be one of: ${VALID_STATUSES.join(', ')}.` });
    }

    if (errors.length > 0) {
        return res.status(400).json({
            success: false,
            message: 'Validation failed. Please correct the errors and try again.',
            errors,
        });
    }

    next();
}

module.exports = { validateOpportunity };
