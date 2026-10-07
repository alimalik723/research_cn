// src/components/OpportunityTable.jsx
import { useNavigate } from 'react-router-dom';
import { Pencil, Trash2, Eye } from 'lucide-react';
import { formatDate } from '../utils/formatters';
import EmptyState from './EmptyState';
import LoadingState from './LoadingState';

export default function OpportunityTable({
    opportunities,
    isLoading,
    onDelete,
}) {
    const navigate = useNavigate();

    if (isLoading) return <LoadingState message="Loading opportunities…" />;

    if (!opportunities || opportunities.length === 0) {
        return (
            <div className="table-wrapper">
                <EmptyState
                    title="No postings yet"
                    message="You haven't created any research opportunities. Get started by posting your first one."
                    actionLabel="Create Opportunity"
                    onAction={() => navigate('/opportunities/create')}
                />
            </div>
        );
    }

    return (
        <div className="table-wrapper">
            <div className="table-responsive">
                <table className="data-table" aria-label="Research opportunities table">
                    <thead>
                        <tr>
                            <th scope="col">Research Title</th>
                            <th scope="col">Faculty</th>
                            <th scope="col">Department</th>
                            <th scope="col">Positions</th>
                            <th scope="col">Deadline</th>
                            <th scope="col">Status</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {opportunities.map((opp) => (
                            <tr key={opp.id}>
                                <td className="table-cell-title">
                                    <span title={opp.title}>{opp.title}</span>
                                </td>
                                <td>{opp.faculty}</td>
                                <td>{opp.department}</td>
                                <td>{opp.positions}</td>
                                <td>{formatDate(opp.deadline)}</td>
                                <td>
                                    <span className={`badge ${opp.status === 'Open' ? 'badge-open' : 'badge-closed'}`}>
                                        {opp.status}
                                    </span>
                                </td>
                                <td>
                                    <div className="table-actions">
                                        <button
                                            className="btn btn-ghost btn-sm"
                                            onClick={() => navigate(`/opportunities/${opp.id}`)}
                                            aria-label={`View details for ${opp.title}`}
                                            title="View details"
                                        >
                                            <Eye size={15} />
                                        </button>
                                        <button
                                            className="btn btn-secondary btn-sm"
                                            onClick={() => navigate(`/opportunities/${opp.id}/edit`)}
                                            aria-label={`Edit ${opp.title}`}
                                            title="Edit"
                                        >
                                            <Pencil size={15} />
                                        </button>
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => onDelete(opp)}
                                            aria-label={`Delete ${opp.title}`}
                                            title="Delete"
                                        >
                                            <Trash2 size={15} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
