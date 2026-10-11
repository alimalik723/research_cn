// src/components/ConfirmDialog.jsx
import { Trash2, X } from 'lucide-react';

export default function ConfirmDialog({
    title = 'Confirm Deletion',
    message = 'Are you sure you want to delete this item? This action cannot be undone.',
    confirmLabel = 'Delete',
    cancelLabel = 'Cancel',
    onConfirm,
    onCancel,
    isLoading = false,
}) {
    return (
        <div
            className="modal-backdrop"
            role="dialog"
            aria-modal="true"
            aria-labelledby="confirm-dialog-title"
            onClick={(e) => { if (e.target === e.currentTarget) onCancel(); }}
        >
            <div className="modal-box">
                <div className="modal-icon" aria-hidden="true">
                    <Trash2 size={22} />
                </div>
                <h2 className="modal-title" id="confirm-dialog-title">{title}</h2>
                <p className="modal-message">{message}</p>
                <div className="modal-actions">
                    <button
                        className="btn btn-secondary"
                        onClick={onCancel}
                        disabled={isLoading}
                        autoFocus
                    >
                        <X size={15} />
                        {cancelLabel}
                    </button>
                    <button
                        className="btn btn-danger"
                        onClick={onConfirm}
                        disabled={isLoading}
                    >
                        <Trash2 size={15} />
                        {isLoading ? 'Deleting…' : confirmLabel}
                    </button>
                </div>
            </div>
        </div>
    );
}
