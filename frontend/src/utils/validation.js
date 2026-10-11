// src/utils/validation.js
// Pure validation functions — return { valid: boolean, message: string }

export function validateTitle(value) {
    if (!value || !value.trim()) return { valid: false, message: 'Research title is required.' };
    if (value.trim().length < 5) return { valid: false, message: 'Title must be at least 5 characters.' };
    return { valid: true, message: '' };
}

export function validateDescription(value) {
    if (!value || !value.trim()) return { valid: false, message: 'Description is required.' };
    if (value.trim().length < 20) return { valid: false, message: 'Description must be at least 20 characters.' };
    return { valid: true, message: '' };
}

export function validateArea(value) {
    if (!value || !value.trim()) return { valid: false, message: 'Research area is required.' };
    return { valid: true, message: '' };
}

export function validateFaculty(value) {
    if (!value || !value.trim()) return { valid: false, message: 'Faculty member name is required.' };
    return { valid: true, message: '' };
}

export function validateDepartment(value) {
    if (!value || !value.trim()) return { valid: false, message: 'Department is required.' };
    return { valid: true, message: '' };
}

export function validateSkills(value) {
    if (!value || !value.trim()) return { valid: false, message: 'Required skills are required.' };
    return { valid: true, message: '' };
}

export function validatePositions(value) {
    const num = Number(value);
    if (!value && value !== 0) return { valid: false, message: 'Number of positions is required.' };
    if (!Number.isInteger(num) || num < 1) return { valid: false, message: 'Positions must be a positive integer (≥ 1).' };
    return { valid: true, message: '' };
}

export function validateDeadline(value) {
    if (!value) return { valid: false, message: 'Application deadline is required.' };
    const date = new Date(value);
    if (isNaN(date.getTime())) return { valid: false, message: 'Please enter a valid date.' };
    return { valid: true, message: '' };
}

export function validateStatus(value) {
    if (!value) return { valid: false, message: 'Status is required.' };
    if (!['Open', 'Closed'].includes(value)) return { valid: false, message: 'Status must be Open or Closed.' };
    return { valid: true, message: '' };
}

export function validateOpportunityForm(data) {
    const errors = {};
    const checks = {
        title: validateTitle(data.title),
        description: validateDescription(data.description),
        area: validateArea(data.area),
        faculty: validateFaculty(data.faculty),
        department: validateDepartment(data.department),
        skills: validateSkills(data.skills),
        positions: validatePositions(data.positions),
        deadline: validateDeadline(data.deadline),
        status: validateStatus(data.status),
    };
    let isValid = true;
    for (const [field, result] of Object.entries(checks)) {
        if (!result.valid) {
            errors[field] = result.message;
            isValid = false;
        }
    }
    return { isValid, errors };
}
