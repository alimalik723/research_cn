// src/components/OpportunityCard.jsx
import { useNavigate } from 'react-router-dom';
import { User, Building2, Users, Calendar, Tag, ArrowRight } from 'lucide-react';
import { formatDate, formatRelativeDeadline, truncate } from '../utils/formatters';

export default function OpportunityCard({ opportunity }) {
    const navigate = useNavigate();
    const { id, title, area, description, faculty, department, positions, deadline, status } = opportunity;

    const isOpen = status === 'Open';
    const relativeDeadline = formatRelativeDeadline(deadline);

    return (
        <article className="card" aria-label={`Opportunity: ${title}`}>
            <div className="card-header">
                <div style={{ flex: 1, minWidth: 0 }}>
                    <h3 className="card-title">{title}</h3>
                    {area && (
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', marginTop: '4px', fontSize: 'var(--font-size-xs)', color: 'var(--color-accent)', fontWeight: 500 }}>
                            <Tag size={12} />
                            {area}
                        </span>
                    )}
                </div>
                <span className={`badge ${isOpen ? 'badge-open' : 'badge-closed'}`}>
                    {status}
                </span>
            </div>

            <p className="card-description">{truncate(description, 130)}</p>

            <div className="card-meta">
                <span className="card-meta-item">
                    <User size={12} />
                    {faculty}
                </span>
                <span className="card-meta-item">
                    <Building2 size={12} />
                    {department}
                </span>
                <span className="card-meta-item">
                    <Users size={12} />
                    {positions} position{positions !== 1 ? 's' : ''}
                </span>
                <span className="card-meta-item">
                    <Calendar size={12} />
                    {relativeDeadline || formatDate(deadline)}
                </span>
            </div>

            <div className="card-footer">
                <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>
                    Deadline: {formatDate(deadline)}
                </span>
                <button
                    className="btn btn-primary btn-sm"
                    onClick={() => navigate(`/opportunities/${id}`)}
                    aria-label={`View details for ${title}`}
                >
                    View Details
                    <ArrowRight size={13} />
                </button>
            </div>
        </article>
    );
}
