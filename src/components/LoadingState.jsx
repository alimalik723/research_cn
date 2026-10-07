// src/components/LoadingState.jsx

export default function LoadingState({ message = 'Loading…' }) {
    return (
        <div className="loading-state" role="status" aria-live="polite">
            <div className="spinner" aria-hidden="true" />
            <p className="loading-text">{message}</p>
        </div>
    );
}
