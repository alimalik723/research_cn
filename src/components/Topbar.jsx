// src/components/Topbar.jsx
import { Menu, Bell, ChevronRight } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const BREADCRUMBS = {
    '/': 'Dashboard',
    '/opportunities': 'Opportunities',
    '/opportunities/create': 'Create Opportunity',
    '/profile': 'Profile',
};

function getBreadcrumb(pathname) {
    if (BREADCRUMBS[pathname]) return BREADCRUMBS[pathname];
    if (pathname.includes('/edit')) return 'Edit Opportunity';
    if (pathname.match(/^\/opportunities\/\d+$/)) return 'Opportunity Details';
    return 'Page';
}

export default function Topbar({ onMenuClick }) {
    const { pathname } = useLocation();
    const current = getBreadcrumb(pathname);
    const isHome = pathname === '/';

    return (
        <header className="topbar" role="banner">
            <div className="topbar-left">
                <button
                    className="topbar-hamburger"
                    onClick={onMenuClick}
                    aria-label="Toggle navigation menu"
                >
                    <Menu size={20} />
                </button>
                <nav className="topbar-breadcrumb" aria-label="Breadcrumb">
                    <span>UniResearch Portal</span>
                    {!isHome && (
                        <>
                            <ChevronRight size={14} />
                            <span className="topbar-breadcrumb-current">{current}</span>
                        </>
                    )}
                </nav>
            </div>

            <div className="topbar-right">
                <button className="topbar-icon-btn" aria-label="Notifications">
                    <Bell size={16} />
                    <span className="notification-dot" aria-hidden="true" />
                </button>

                <div className="topbar-profile" role="button" tabIndex={0} aria-label="User profile">
                    <div className="topbar-profile-avatar" aria-hidden="true">FK</div>
                    <span className="topbar-profile-name">Dr. Fatima Khalil</span>
                </div>
            </div>
        </header>
    );
}
