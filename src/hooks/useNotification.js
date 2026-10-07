// src/hooks/useNotification.js
import { useState, useCallback } from 'react';

let idCounter = 0;

export default function useNotification() {
    const [notifications, setNotifications] = useState([]);

    const addNotification = useCallback(({ type = 'info', title, message }) => {
        const id = ++idCounter;
        setNotifications((prev) => [...prev, { id, type, title, message }]);
    }, []);

    const dismissNotification = useCallback((id) => {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, []);

    const showSuccess = useCallback((message, title) =>
        addNotification({ type: 'success', title: title || 'Success', message }), [addNotification]);

    const showError = useCallback((message, title) =>
        addNotification({ type: 'error', title: title || 'Error', message }), [addNotification]);

    const showInfo = useCallback((message, title) =>
        addNotification({ type: 'info', title, message }), [addNotification]);

    return { notifications, dismissNotification, showSuccess, showError, showInfo };
}
