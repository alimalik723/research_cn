// src/pages/EditOpportunity.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import OpportunityForm from '../components/OpportunityForm';
import LoadingState from '../components/LoadingState';
import EmptyState from '../components/EmptyState';
import Notification from '../components/Notification';
import { getOpportunity, updateOpportunity } from '../services/opportunityApi';
import useNotification from '../hooks/useNotification';
import { FileX } from 'lucide-react';

export default function EditOpportunity() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { notifications, dismissNotification, showSuccess, showError } = useNotification();
    const [opportunity, setOpportunity] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        let cancelled = false;
        async function load() {
            setIsLoading(true);
            try {
                const res = await getOpportunity(id);
                if (!cancelled) setOpportunity(res.data);
            } catch {
                if (!cancelled) setNotFound(true);
            } finally {
                if (!cancelled) setIsLoading(false);
            }
        }
        load();
        return () => { cancelled = true; };
    }, [id]);

    async function handleSubmit(formData) {
        setIsSaving(true);
        try {
            const res = await updateOpportunity(id, formData);
            setOpportunity(res.data);
            showSuccess(`"${formData.title}" has been updated successfully.`, 'Opportunity Updated');
            setTimeout(() => navigate(`/opportunities/${id}`), 1200);
        } catch (err) {
            showError(err.message, 'Update Failed');
            setIsSaving(false);
        }
    }

    return (
        <>
            <Notification notifications={notifications} onDismiss={dismissNotification} />

            <div className="page-header">
                <button className="back-link" onClick={() => navigate(-1)}>
                    <ArrowLeft size={16} />
                    Back
                </button>
                <h1 className="page-title">Edit Opportunity</h1>
                <p className="page-subtitle">Update the details of this research opportunity.</p>
            </div>

            {isLoading && <LoadingState message="Loading opportunity data…" />}

            {!isLoading && notFound && (
                <EmptyState
                    icon={FileX}
                    title="Opportunity not found"
                    message={`No record found with ID "${id}".`}
                    actionLabel="Back to Opportunities"
                    onAction={() => navigate('/opportunities')}
                />
            )}

            {!isLoading && opportunity && (
                <div className="form-page-wrapper">
                    <div className="form-card">
                        <OpportunityForm
                            initialData={opportunity}
                            onSubmit={handleSubmit}
                            onCancel={() => navigate(`/opportunities/${id}`)}
                            isLoading={isSaving}
                            submitLabel="Save Changes"
                        />
                    </div>
                </div>
            )}
        </>
    );
}
