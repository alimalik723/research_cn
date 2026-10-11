// backend/src/models/opportunityModel.js
// Data access layer — all SQL lives here. Parameterized queries only.
'use strict';

const db = require('../config/db');

/**
 * Insert a new opportunity record.
 * @param {object} data  Validated fields
 * @returns {object} Inserted row
 */
async function createOpportunity(data) {
    const sql = `
    INSERT INTO opportunities
      (title, description, research_area, faculty_name, department,
       required_skills, available_positions, application_deadline, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
    const values = [
        data.title,
        data.description,
        data.research_area,
        data.faculty_name,
        data.department,
        data.required_skills,
        data.available_positions,
        data.application_deadline,
        data.status,
    ];
    const [result] = await db.execute(sql, values);
    return getOpportunityById(result.insertId);
}

/**
 * Fetch all opportunities ordered by newest first.
 */
async function getAllOpportunities() {
    const [rows] = await db.execute(
        'SELECT * FROM opportunities ORDER BY created_at DESC'
    );
    return rows;
}

/**
 * Fetch a single opportunity by primary key.
 * Returns null if not found.
 */
async function getOpportunityById(id) {
    const [rows] = await db.execute(
        'SELECT * FROM opportunities WHERE id = ?',
        [id]
    );
    return rows[0] || null;
}

/**
 * Update an existing opportunity.
 * Returns updated row or null if id not found.
 */
async function updateOpportunity(id, data) {
    const sql = `
    UPDATE opportunities SET
      title                = ?,
      description          = ?,
      research_area        = ?,
      faculty_name         = ?,
      department           = ?,
      required_skills      = ?,
      available_positions  = ?,
      application_deadline = ?,
      status               = ?
    WHERE id = ?
  `;
    const values = [
        data.title,
        data.description,
        data.research_area,
        data.faculty_name,
        data.department,
        data.required_skills,
        data.available_positions,
        data.application_deadline,
        data.status,
        id,
    ];
    const [result] = await db.execute(sql, values);
    if (result.affectedRows === 0) return null;
    return getOpportunityById(id);
}

/**
 * Delete an opportunity by id.
 * Returns true if deleted, false if not found.
 */
async function deleteOpportunity(id) {
    const [result] = await db.execute(
        'DELETE FROM opportunities WHERE id = ?',
        [id]
    );
    return result.affectedRows > 0;
}

module.exports = {
    createOpportunity,
    getAllOpportunities,
    getOpportunityById,
    updateOpportunity,
    deleteOpportunity,
};
