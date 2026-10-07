// src/pages/CreateOpportunity.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import OpportunityForm from '../components/OpportunityForm';
import Notification from '../components/Notification';
import { createOpportunity } from '../services/opportunityApi';
import useNotification from '../hooks/useNotification';

export default function CreateOpportunity() {
    const navigate = useNavigate();
    const { notifications, dismissNotification, showSuccess, showError } = useNotification();
    const [isLoading, setIsLoading] = useState(false);

    async function handleSubmit(formData) {
        setIsLoading(true);
        try {
            await createOpportunity(formData);
            showSuccess(`"${formData.title}" has been created successfully.`, 'Opportunity Created');
            // Brief delay so the user sees the notification before redirect
            setTimeout(() => navigate('/'), 1200);
        } catch (err) {
            showError(err.message, 'Creation Failed');
            setIsLoading(false);
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
                <h1 className="page-title">Create Research Opportunity</h1>
                <p className="page-subtitle">Fill in the details below to post a new research opportunity.</p>
            </div>

            <div className="form-page-wrapper">
                <div className="form-card">
                    <OpportunityForm
                        onSubmit={handleSubmit}
                        onCancel={() => navigate(-1)}
                        isLoading={isLoading}
                        submitLabel="Create Opportunity"
                    />
                </div>
            </div>
        </>
    );
}
