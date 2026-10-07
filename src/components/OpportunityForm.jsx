// src/components/OpportunityForm.jsx
import { useState } from 'react';
import { AlertCircle } from 'lucide-react';
import { validateOpportunityForm } from '../utils/validation';

const RESEARCH_AREAS = [
    'Artificial Intelligence',
    'Machine Learning',
    'Natural Language Processing',
    'Computer Vision',
    'Cybersecurity',
    'Distributed Systems',
    'Internet of Things',
    'Software Engineering',
    'Data Science',
    'Human-Computer Interaction',
    'Bioinformatics',
    'Robotics',
    'Cloud Computing',
    'Networking',
    'Other',
];

const DEPARTMENTS = [
    'Computer Science',
    'Information Systems',
    'Electrical Engineering',
    'Mechanical Engineering',
    'Mathematics',
    'Physics',
    'Biomedical Engineering',
    'Civil Engineering',
    'Business Technology',
    'Other',
];

const EMPTY_FORM = {
    title: '',
    description: '',
    area: '',
    faculty: '',
    department: '',
    skills: '',
    positions: '',
    deadline: '',
    status: 'Open',
};

function FieldError({ message }) {
    if (!message) return null;
    return (
        <span className="form-error" role="alert">
            <AlertCircle size={13} />
            {message}
        </span>
    );
}

export default function OpportunityForm({
    initialData,
    onSubmit,
    onCancel,
    isLoading,
    submitLabel = 'Create Opportunity',
}) {
    const [formData, setFormData] = useState(() => ({
        ...EMPTY_FORM,
        ...(initialData || {}),
        // ensure positions is a string for controlled input
        positions: initialData?.positions !== undefined ? String(initialData.positions) : '',
    }));
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        // Clear error as user types
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: undefined }));
        }
    }

    function handleBlur(e) {
        setTouched((prev) => ({ ...prev, [e.target.name]: true }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        // Mark all as touched
        setTouched(Object.keys(formData).reduce((acc, k) => ({ ...acc, [k]: true }), {}));

        const { isValid, errors: validationErrors } = validateOpportunityForm(formData);
        if (!isValid) {
            setErrors(validationErrors);
            // Focus first invalid field
            const firstError = document.querySelector('.form-input.invalid, .form-textarea.invalid, .form-select.invalid');
            firstError?.focus();
            return;
        }

        const payload = {
            ...formData,
            positions: parseInt(formData.positions, 10),
        };
        onSubmit(payload);
    }

    function getInputClass(field, base = 'form-input') {
        return `${base}${touched[field] && errors[field] ? ' invalid' : ''}`;
    }

    return (
        <form onSubmit={handleSubmit} noValidate aria-label="Opportunity form">
            {/* Title */}
            <div className="form-group">
                <label className="form-label" htmlFor="title">
                    Research Title <span className="required">*</span>
                </label>
                <input
                    id="title"
                    name="title"
                    type="text"
                    className={getInputClass('title')}
                    value={formData.title}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="e.g., Machine Learning for Medical Image Analysis"
                    autoComplete="off"
                />
                <FieldError message={touched.title && errors.title} />
            </div>

            {/* Description */}
            <div className="form-group">
                <label className="form-label" htmlFor="description">
                    Research Description <span className="required">*</span>
                </label>
                <textarea
                    id="description"
                    name="description"
                    className={getInputClass('description', 'form-textarea')}
                    value={formData.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Provide a detailed description of the research project, methods, and expected outcomes."
                    rows={5}
                />
                <FieldError message={touched.description && errors.description} />
            </div>

            {/* Area + Faculty (2 col) */}
            <div className="form-row">
                <div className="form-group">
                    <label className="form-label" htmlFor="area">
                        Research Area <span className="required">*</span>
                    </label>
                    <select
                        id="area"
                        name="area"
                        className={getInputClass('area', 'form-select')}
                        value={formData.area}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    >
                        <option value="">Select research area</option>
                        {RESEARCH_AREAS.map((a) => (
                            <option key={a} value={a}>{a}</option>
                        ))}
                    </select>
                    <FieldError message={touched.area && errors.area} />
                </div>

                <div className="form-group">
                    <label className="form-label" htmlFor="faculty">
                        Faculty Member <span className="required">*</span>
                    </label>
                    <input
                        id="faculty"
                        name="faculty"
                        type="text"
                        className={getInputClass('faculty')}
                        value={formData.faculty}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="e.g., Dr. Sarah Mitchell"
                    />
                    <FieldError message={touched.faculty && errors.faculty} />
                </div>
            </div>

            {/* Department + Positions (2 col) */}
            <div className="form-row">
                <div className="form-group">
                    <label className="form-label" htmlFor="department">
                        Department <span className="required">*</span>
                    </label>
                    <select
                        id="department"
                        name="department"
                        className={getInputClass('department', 'form-select')}
                        value={formData.department}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    >
                        <option value="">Select department</option>
                        {DEPARTMENTS.map((d) => (
                            <option key={d} value={d}>{d}</option>
                        ))}
                    </select>
                    <FieldError message={touched.department && errors.department} />
                </div>

                <div className="form-group">
                    <label className="form-label" htmlFor="positions">
                        Available Positions <span className="required">*</span>
                    </label>
                    <input
                        id="positions"
                        name="positions"
                        type="number"
                        min="1"
                        step="1"
                        className={getInputClass('positions')}
                        value={formData.positions}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="e.g., 3"
                    />
                    <FieldError message={touched.positions && errors.positions} />
                </div>
            </div>

            {/* Deadline + Status (2 col) */}
            <div className="form-row">
                <div className="form-group">
                    <label className="form-label" htmlFor="deadline">
                        Application Deadline <span className="required">*</span>
                    </label>
                    <input
                        id="deadline"
                        name="deadline"
                        type="date"
                        className={getInputClass('deadline')}
                        value={formData.deadline}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <FieldError message={touched.deadline && errors.deadline} />
                </div>

                <div className="form-group">
                    <label className="form-label" htmlFor="status">
                        Status <span className="required">*</span>
                    </label>
                    <select
                        id="status"
                        name="status"
                        className={getInputClass('status', 'form-select')}
                        value={formData.status}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    >
                        <option value="Open">Open</option>
                        <option value="Closed">Closed</option>
                    </select>
                    <FieldError message={touched.status && errors.status} />
                </div>
            </div>

            {/* Required Skills */}
            <div className="form-group">
                <label className="form-label" htmlFor="skills">
                    Required Skills <span className="required">*</span>
                </label>
                <input
                    id="skills"
                    name="skills"
                    type="text"
                    className={getInputClass('skills')}
                    value={formData.skills}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="e.g., Python, PyTorch, Machine Learning (comma-separated)"
                />
                <span className="form-hint">Separate skills with commas.</span>
                <FieldError message={touched.skills && errors.skills} />
            </div>

            {/* Actions */}
            <div className="form-actions">
                <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={onCancel}
                    disabled={isLoading}
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isLoading}
                >
                    {isLoading ? 'Saving…' : submitLabel}
                </button>
            </div>
        </form>
    );
}
