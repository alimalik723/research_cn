// src/App.jsx
import { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import Dashboard from './pages/Dashboard';
import Opportunities from './pages/Opportunities';
import OpportunityDetailsPage from './pages/OpportunityDetailsPage';
import CreateOpportunity from './pages/CreateOpportunity';
import EditOpportunity from './pages/EditOpportunity';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';

import './styles/global.css';
import './styles/layout.css';
import './styles/components.css';

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="app-shell">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="main-layout">
        <Topbar onMenuClick={() => setSidebarOpen((prev) => !prev)} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/opportunities" element={<Opportunities />} />
            <Route path="/opportunities/create" element={<CreateOpportunity />} />
            <Route path="/opportunities/:id" element={<OpportunityDetailsPage />} />
            <Route path="/opportunities/:id/edit" element={<EditOpportunity />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
