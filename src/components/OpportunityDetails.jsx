// src/components/OpportunityDetails.jsx
import { useNavigate } from 'react-router-dom';
import {
    ArrowLeft, Hash, User, Building2, Users, Calendar,
    Tag, Wrench, BookOpen, Pencil
} from 'lucide-react';
import { formatDate } from '../utils/formatters';

export default function OpportunityDetails({ opportunity, onEdit }) {
    const navigate = useNavigate();

    if (!opportunity) return null;

    const {
        id, title, description, area, faculty, department,
        skills, positions, deadline, status
    } = opportunity;

    const skillsList = skills
        ? skills.split(',').map((s) => s.trim()).filter(Boolean)
        : [];

    return (
        <div className="detail-page">
            <button
                className="back-link"
                onClick={() => navigate(-1)}
                aria-label="Go back"
            >
                <ArrowLeft size={16} />
                Back to Opportunities
            </button>

            <div className="detail-card">
                <div className="detail-card-header">
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                <span className="id-tag"><Hash size={11} />ID {id}</span>
                                <span className={`badge ${status === 'Open' ? 'badge-open' : 'badge-closed'}`}>{status}</span>
                            </div>
                            <h1 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 700, color: 'var(--color-text)', lineHeight: 1.3 }}>
                                {title}
                            </h1>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '6px', fontSize: 'var(--font-size-sm)', color: 'var(--color-accent)', fontWeight: 500 }}>
                                <Tag size={13} />
                                {area}
                            </div>
                        </div>
                        {onEdit && (
                            <button
                                className="btn btn-secondary"
                                onClick={onEdit}
                                aria-label="Edit this opportunity"
                            >
                                <Pencil size={15} />
                                Edit
                            </button>
                        )}
                    </div>
                </div>

                <div className="detail-card-body">
                    {/* Description */}
                    <div style={{ marginBottom: 'var(--space-6)' }}>
                        <div className="detail-field-label" style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 8 }}>
                            <BookOpen size={13} />
                            Research Description
                        </div>
                        <p className="detail-description">{description}</p>
                    </div>

                    <div className="divider" />

                    {/* Key details grid */}
                    <div className="detail-grid" style={{ marginTop: 'var(--space-5)' }}>
                        <div>
                            <div className="detail-field-label">
                                <User size={12} style={{ display: 'inline', marginRight: 4 }} />
                                Faculty Member
                            </div>
                            <div className="detail-field-value">{faculty}</div>
                        </div>
                        <div>
                            <div className="detail-field-label">
                                <Building2 size={12} style={{ display: 'inline', marginRight: 4 }} />
                                Department
                            </div>
                            <div className="detail-field-value">{department}</div>
                        </div>
                        <div>
                            <div className="detail-field-label">
                                <Users size={12} style={{ display: 'inline', marginRight: 4 }} />
                                Available Positions
                            </div>
                            <div className="detail-field-value">{positions} position{positions !== 1 ? 's' : ''}</div>
                        </div>
                        <div>
                            <div className="detail-field-label">
                                <Calendar size={12} style={{ display: 'inline', marginRight: 4 }} />
                                Application Deadline
                            </div>
                            <div className="detail-field-value">{formatDate(deadline)}</div>
                        </div>

                        {/* Skills (full width) */}
                        <div className="detail-field-full">
                            <div className="detail-field-label">
                                <Wrench size={12} style={{ display: 'inline', marginRight: 4 }} />
                                Required Skills
                            </div>
                            {skillsList.length > 0 ? (
                                <div className="skills-list">
                                    {skillsList.map((skill) => (
                                        <span key={skill} className="skill-tag">{skill}</span>
                                    ))}
                                </div>
                            ) : (
                                <div className="detail-field-value">{skills || '—'}</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
