// src/components/EmptyState.jsx
import { Inbox } from 'lucide-react';

export default function EmptyState({
    title = 'Nothing here yet',
    message = 'No items to display.',
    actionLabel,
    onAction,
    icon: Icon = Inbox,
}) {
    return (
        <div className="empty-state">
            <div className="empty-state-icon" aria-hidden="true">
                <Icon size={28} />
            </div>
            <h3 className="empty-state-title">{title}</h3>
            <p className="empty-state-message">{message}</p>
            {actionLabel && onAction && (
                <button className="btn btn-primary" onClick={onAction}>
                    {actionLabel}
                </button>
            )}
        </div>
    );
}
