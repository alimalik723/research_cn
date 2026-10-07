
// src/components/Sidebar.jsx
import { NavLink } from 'react-router-dom';
import {
    LayoutDashboard, BookOpen, User, GraduationCap, Plus
} from 'lucide-react';

const NAV_ITEMS = [
    { to: '/', label: 'Dashboard', icon: LayoutDashboard, end: true },
    { to: '/opportunities', label: 'Opportunities', icon: BookOpen },
    { to: '/profile', label: 'Profile', icon: User },
];

export default function Sidebar({ isOpen, onClose }) {
    const handleNavClick = () => {
        if (window.innerWidth < 1024) onClose();
    };

    return (
        <>
            {/* Mobile overlay */}
            <div
                className={`sidebar-overlay ${isOpen ? 'overlay-open' : ''}`}
                onClick={onClose}
                aria-hidden="true"
            />

            <aside className={`sidebar ${isOpen ? 'sidebar-open' : ''}`} aria-label="Main navigation">
                {/* Header */}
                <div className="sidebar-header">
                    <div className="sidebar-logo" aria-hidden="true">
                        <GraduationCap size={20} />
                    </div>
                    <div>
                        <div className="sidebar-title">UniResearch</div>
                        <div className="sidebar-subtitle">Research Portal</div>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="sidebar-nav" role="navigation">
                    <div className="sidebar-section-label">Menu</div>
                    {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
                        <NavLink
                            key={to}
                            to={to}
                            end={end}
                            className={({ isActive }) =>
                                `sidebar-nav-item ${isActive ? 'active' : ''}`
                            }
                            onClick={handleNavClick}
                        >
                            <Icon size={18} className="sidebar-nav-icon" />
                            {label}
                        </NavLink>
                    ))}

                    <div className="sidebar-section-label" style={{ marginTop: '1rem' }}>Management</div>
                    <NavLink
                        to="/opportunities/create"
                        className={({ isActive }) =>
                            `sidebar-nav-item ${isActive ? 'active' : ''}`
                        }
                        onClick={handleNavClick}
                    >
                        <Plus size={18} className="sidebar-nav-icon" />
                        Post Opportunity
                    </NavLink>
                </nav>

                {/* Footer user */}
                <div className="sidebar-footer">
                    <div className="sidebar-user">
                        <div className="sidebar-avatar" aria-hidden="true">FK</div>
                        <div className="sidebar-user-info">
                            <div className="sidebar-user-name">Dr. Fatima Khalil</div>
                            <div className="sidebar-user-role">Faculty Member</div>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
}
