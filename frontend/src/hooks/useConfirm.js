// src/hooks/useConfirm.js
import { useState, useCallback } from 'react';

export default function useConfirm() {
    const [confirmState, setConfirmState] = useState(null);

    const confirm = useCallback((options) => {
        return new Promise((resolve) => {
            setConfirmState({ ...options, resolve });
        });
    }, []);

    function handleConfirm() {
        confirmState?.resolve(true);
        setConfirmState(null);
    }

    function handleCancel() {
        confirmState?.resolve(false);
        setConfirmState(null);
    }

    return { confirmState, confirm, handleConfirm, handleCancel };
}
