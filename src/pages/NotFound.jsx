// src/pages/NotFound.jsx
import { useNavigate } from 'react-router-dom';
import { Home, AlertTriangle } from 'lucide-react';

export default function NotFound() {
    const navigate = useNavigate();

    return (
        <div style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            justifyContent: 'center', minHeight: '60vh', textAlign: 'center',
            padding: 'var(--space-8)', gap: 'var(--space-4)',
        }}>
            <div style={{
                width: 64, height: 64, borderRadius: '50%',
                background: 'var(--color-warning-bg)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--color-warning)',
            }}>
                <AlertTriangle size={30} />
            </div>
            <div>
                <h1 style={{ fontSize: '4rem', fontWeight: 800, color: 'var(--color-text)', lineHeight: 1 }}>404</h1>
                <h2 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 600, color: 'var(--color-text)', marginTop: 'var(--space-2)' }}>
                    Page Not Found
                </h2>
                <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', marginTop: 'var(--space-2)', maxWidth: 320 }}>
                    The page you're looking for doesn't exist or has been moved.
                </p>
            </div>
            <button className="btn btn-primary" onClick={() => navigate('/')}>
                <Home size={16} />
                Back to Dashboard
            </button>
        </div>
    );
}
