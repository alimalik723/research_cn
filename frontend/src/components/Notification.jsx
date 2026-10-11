// src/components/Notification.jsx
import { useEffect } from 'react';
import { CheckCircle, XCircle, Info, X } from 'lucide-react';

const ICONS = {
    success: CheckCircle,
    error: XCircle,
    info: Info,
};

const TITLES = {
    success: 'Success',
    error: 'Error',
    info: 'Information',
};

function NotificationItem({ notification, onDismiss }) {
    const Icon = ICONS[notification.type] || Info;

    useEffect(() => {
        const timer = setTimeout(() => onDismiss(notification.id), 4000);
        return () => clearTimeout(timer);
    }, [notification.id, onDismiss]);

    return (
        <div
            className={`notification notification-${notification.type}`}
            role="alert"
            aria-live="polite"
        >
            <div className="notification-icon">
                <Icon size={18} />
            </div>
            <div className="notification-body">
                <div className="notification-title">
                    {notification.title || TITLES[notification.type]}
                </div>
                {notification.message && (
                    <div className="notification-message">{notification.message}</div>
                )}
            </div>
            <button
                className="notification-close"
                onClick={() => onDismiss(notification.id)}
                aria-label="Dismiss notification"
            >
                <X size={16} />
            </button>
        </div>
    );
}

export default function Notification({ notifications, onDismiss }) {
    if (!notifications || notifications.length === 0) return null;

    return (
        <div className="notification-container" aria-live="polite" aria-atomic="false">
            {notifications.map((n) => (
                <NotificationItem key={n.id} notification={n} onDismiss={onDismiss} />
            ))}
        </div>
    );
}
