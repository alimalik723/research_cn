// src/pages/Dashboard.jsx
import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, BookOpen, CheckCircle, Clock, Archive } from 'lucide-react';
import OpportunityCard from '../components/OpportunityCard';
import OpportunityTable from '../components/OpportunityTable';
import ConfirmDialog from '../components/ConfirmDialog';
import LoadingState from '../components/LoadingState';
import EmptyState from '../components/EmptyState';
import { getOpportunities, deleteOpportunity } from '../services/opportunityApi';
import useNotification from '../hooks/useNotification';
import useConfirm from '../hooks/useConfirm';
import Notification from '../components/Notification';

export default function Dashboard() {
    const navigate = useNavigate();
    const { notifications, dismissNotification, showSuccess, showError } = useNotification();
    const { confirmState, confirm, handleConfirm: rawHandleConfirm, handleCancel } = useConfirm();
    const [opportunities, setOpportunities] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isDeleting, setIsDeleting] = useState(false);

    const load = useCallback(async () => {
        setIsLoading(true);
        try {
            const res = await getOpportunities();
            setOpportunities(res.data || []);
        } catch (err) {
            showError(err.message, 'Failed to load opportunities');
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => { load(); }, [load]);

    async function handleDelete(opp) {
        const confirmed = await confirm({
            title: 'Delete Opportunity',
            message: `Are you sure you want to delete "${opp.title}"? This action cannot be undone.`,
        });
        if (!confirmed) return;
        setIsDeleting(true);
        try {
            await deleteOpportunity(opp.id);
            setOpportunities((prev) => prev.filter((o) => o.id !== opp.id));
            showSuccess(`"${opp.title}" has been deleted.`);
        } catch (err) {
            showError(err.message, 'Delete failed');
        } finally {
            setIsDeleting(false);
        }
    }

    async function handleConfirm() {
        setIsDeleting(true);
        rawHandleConfirm();
    }

    const openCount = opportunities.filter((o) => o.status === 'Open').length;
    const closedCount = opportunities.filter((o) => o.status === 'Closed').length;
    const recommendations = opportunities.filter((o) => o.status === 'Open').slice(0, 3);

    return (
        <>
            <Notification notifications={notifications} onDismiss={dismissNotification} />
            {confirmState && (
                <ConfirmDialog
                    title={confirmState.title}
                    message={confirmState.message}
                    onConfirm={handleConfirm}
                    onCancel={handleCancel}
                    isLoading={isDeleting}
                />
            )}

            {/* Page header */}
            <div className="page-header">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                    <div>
                        <h1 className="page-title">Research Dashboard</h1>
                        <p className="page-subtitle">Welcome back, Dr. Fatima Khalil</p>
                    </div>
                    <button className="btn btn-primary" onClick={() => navigate('/opportunities/create')}>
                        <Plus size={16} />
                        Post Opportunity
                    </button>
                </div>
            </div>

            {/* Stats row */}
            <div className="stats-row">
                <div className="stat-card">
                    <div className="stat-icon stat-icon-blue"><BookOpen size={20} /></div>
                    <div>
                        <div className="stat-value">{isLoading ? '—' : opportunities.length}</div>
                        <div className="stat-label">Total Postings</div>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon stat-icon-green"><CheckCircle size={20} /></div>
                    <div>
                        <div className="stat-value">{isLoading ? '—' : openCount}</div>
                        <div className="stat-label">Open</div>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon stat-icon-orange"><Clock size={20} /></div>
                    <div>
                        <div className="stat-value">{isLoading ? '—' : closedCount}</div>
                        <div className="stat-label">Closed</div>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon stat-icon-purple"><Archive size={20} /></div>
                    <div>
                        <div className="stat-value">
                            {isLoading ? '—' : opportunities.reduce((sum, o) => sum + (Number(o.positions) || 0), 0)}
                        </div>
                        <div className="stat-label">Total Positions</div>
                    </div>
                </div>
            </div>

            {/* Recommendations section */}
            <section aria-labelledby="recommendations-heading" style={{ marginBottom: 'var(--space-8)' }}>
                <div className="section-header">
                    <div>
                        <h2 className="section-title" id="recommendations-heading">Personalized Recommendations</h2>
                        <p className="section-subtitle">Open opportunities matching your research profile</p>
                    </div>
                    <button className="btn btn-secondary" onClick={() => navigate('/opportunities')}>
                        View All
                    </button>
                </div>

                {isLoading ? (
                    <LoadingState message="Loading recommendations…" />
                ) : recommendations.length === 0 ? (
                    <div className="card">
                        <EmptyState
                            title="No open opportunities"
                            message="There are currently no open research opportunities. Create one to get started."
                            actionLabel="Create Opportunity"
                            onAction={() => navigate('/opportunities/create')}
                        />
                    </div>
                ) : (
                    <div className="card-grid">
                        {recommendations.map((opp) => (
                            <OpportunityCard key={opp.id} opportunity={opp} />
                        ))}
                    </div>
                )}
            </section>

            {/* Manage postings section */}
            <section aria-labelledby="postings-heading">
                <div className="section-header">
                    <div>
                        <h2 className="section-title" id="postings-heading">Manage My Postings</h2>
                        <p className="section-subtitle">Edit, update status, or remove your research opportunities</p>
                    </div>
                    <button className="btn btn-primary" onClick={() => navigate('/opportunities/create')}>
                        <Plus size={15} />
                        New Posting
                    </button>
                </div>
                <OpportunityTable
                    opportunities={opportunities}
                    isLoading={isLoading}
                    onDelete={handleDelete}
                />
            </section>
        </>
    );
}
