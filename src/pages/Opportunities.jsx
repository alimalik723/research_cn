// src/pages/Opportunities.jsx
import { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, SlidersHorizontal } from 'lucide-react';
import OpportunityCard from '../components/OpportunityCard';
import LoadingState from '../components/LoadingState';
import EmptyState from '../components/EmptyState';
import Notification from '../components/Notification';
import { getOpportunities } from '../services/opportunityApi';
import useNotification from '../hooks/useNotification';

const ALL_AREAS = [
    'Artificial Intelligence', 'Machine Learning', 'Natural Language Processing',
    'Computer Vision', 'Cybersecurity', 'Distributed Systems', 'Internet of Things',
    'Software Engineering', 'Data Science', 'Human-Computer Interaction',
    'Bioinformatics', 'Robotics', 'Cloud Computing', 'Networking', 'Other',
];

const ALL_DEPARTMENTS = [
    'Computer Science', 'Information Systems', 'Electrical Engineering',
    'Mechanical Engineering', 'Mathematics', 'Physics',
    'Biomedical Engineering', 'Civil Engineering', 'Business Technology', 'Other',
];

export default function Opportunities() {
    const navigate = useNavigate();
    const { notifications, dismissNotification, showError } = useNotification();
    const [allOpportunities, setAllOpportunities] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [filterArea, setFilterArea] = useState('');
    const [filterDept, setFilterDept] = useState('');
    const [filterStatus, setFilterStatus] = useState('');

    const load = useCallback(async () => {
        setIsLoading(true);
        try {
            const res = await getOpportunities();
            setAllOpportunities(res.data || []);
        } catch (err) {
            showError(err.message, 'Failed to load opportunities');
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => { load(); }, [load]);

    // Client-side filtering (mock API also supports server-side query params for Phase 2)
    const filtered = useMemo(() => {
        return allOpportunities.filter((opp) => {
            if (search && !opp.title.toLowerCase().includes(search.toLowerCase())) return false;
            if (filterArea && opp.area !== filterArea) return false;
            if (filterDept && opp.department !== filterDept) return false;
            if (filterStatus && opp.status !== filterStatus) return false;
            return true;
        });
    }, [allOpportunities, search, filterArea, filterDept, filterStatus]);

    function clearFilters() {
        setSearch('');
        setFilterArea('');
        setFilterDept('');
        setFilterStatus('');
    }

    const hasFilters = search || filterArea || filterDept || filterStatus;

    return (
        <>
            <Notification notifications={notifications} onDismiss={dismissNotification} />

            <div className="page-header">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                    <div>
                        <h1 className="page-title">Research Opportunities</h1>
                        <p className="page-subtitle">Browse and discover available research projects</p>
                    </div>
                    <button className="btn btn-primary" onClick={() => navigate('/opportunities/create')}>
                        <Plus size={16} />
                        Post Opportunity
                    </button>
                </div>
            </div>

            {/* Filter bar */}
            <div className="filter-bar" role="search" aria-label="Filter opportunities">
                <div className="search-input-wrapper">
                    <Search size={15} aria-hidden="true" />
                    <input
                        className="search-input"
                        type="search"
                        placeholder="Search by title…"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        aria-label="Search by research title"
                    />
                </div>

                <select
                    className="filter-select"
                    value={filterArea}
                    onChange={(e) => setFilterArea(e.target.value)}
                    aria-label="Filter by research area"
                >
                    <option value="">All Areas</option>
                    {ALL_AREAS.map((a) => <option key={a} value={a}>{a}</option>)}
                </select>

                <select
                    className="filter-select"
                    value={filterDept}
                    onChange={(e) => setFilterDept(e.target.value)}
                    aria-label="Filter by department"
                >
                    <option value="">All Departments</option>
                    {ALL_DEPARTMENTS.map((d) => <option key={d} value={d}>{d}</option>)}
                </select>

                <select
                    className="filter-select"
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    aria-label="Filter by status"
                >
                    <option value="">All Statuses</option>
                    <option value="Open">Open</option>
                    <option value="Closed">Closed</option>
                </select>

                {hasFilters && (
                    <button className="btn btn-ghost btn-sm" onClick={clearFilters} aria-label="Clear all filters">
                        <SlidersHorizontal size={14} />
                        Clear
                    </button>
                )}

                {!isLoading && (
                    <div className="filter-results-count" aria-live="polite">
                        {filtered.length} result{filtered.length !== 1 ? 's' : ''}
                    </div>
                )}
            </div>

            {/* Results */}
            {isLoading ? (
                <LoadingState message="Loading opportunities…" />
            ) : filtered.length === 0 ? (
                <EmptyState
                    title={hasFilters ? 'No matching opportunities' : 'No opportunities yet'}
                    message={
                        hasFilters
                            ? 'Try adjusting your search or filters to find what you\'re looking for.'
                            : 'No research opportunities have been posted yet. Be the first to create one!'
                    }
                    actionLabel={hasFilters ? 'Clear Filters' : 'Create Opportunity'}
                    onAction={hasFilters ? clearFilters : () => navigate('/opportunities/create')}
                />
            ) : (
                <div className="card-grid">
                    {filtered.map((opp) => (
                        <OpportunityCard key={opp.id} opportunity={opp} />
                    ))}
                </div>
            )}
        </>
    );
}
