// src/pages/OpportunityDetailsPage.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import OpportunityDetails from '../components/OpportunityDetails';
import LoadingState from '../components/LoadingState';
import EmptyState from '../components/EmptyState';
import Notification from '../components/Notification';
import { getOpportunity } from '../services/opportunityApi';
import useNotification from '../hooks/useNotification';
import { FileX } from 'lucide-react';

export default function OpportunityDetailsPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { notifications, dismissNotification, showError } = useNotification();
    const [opportunity, setOpportunity] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        let cancelled = false;
        async function load() {
            setIsLoading(true);
            try {
                const res = await getOpportunity(id);
                if (!cancelled) setOpportunity(res.data);
            } catch (err) {
                if (!cancelled) {
                    setNotFound(true);
                    showError(err.message, 'Opportunity not found');
                }
            } finally {
                if (!cancelled) setIsLoading(false);
            }
        }
        load();
        return () => { cancelled = true; };
    }, [id]);

    return (
        <>
            <Notification notifications={notifications} onDismiss={dismissNotification} />

            <div className="page-header">
                <h1 className="page-title">Opportunity Details</h1>
            </div>

            {isLoading && <LoadingState message="Loading opportunity…" />}

            {!isLoading && notFound && (
                <EmptyState
                    icon={FileX}
                    title="Opportunity not found"
                    message={`No research opportunity found with ID "${id}". It may have been deleted.`}
                    actionLabel="Back to Opportunities"
                    onAction={() => navigate('/opportunities')}
                />
            )}

            {!isLoading && opportunity && (
                <OpportunityDetails
                    opportunity={opportunity}
                    onEdit={() => navigate(`/opportunities/${id}/edit`)}
                />
            )}
        </>
    );
}
