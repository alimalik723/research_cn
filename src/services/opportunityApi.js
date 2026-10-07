// src/services/opportunityApi.js
// Adapter layer — switches between mock and real API based on env variable.
// In Phase 2: set VITE_USE_MOCK_API=false and this file routes all calls
// to apiClient.js which talks to the real Node/Express/MySQL backend.

import * as mockApi from './mockOpportunityApi';
import apiClient from './apiClient';

const useMock = import.meta.env.VITE_USE_MOCK_API === 'true';

// ─── Real API wrappers (Phase 2) ──────────────────────────────────────────────
const realApi = {
    getAll: (filters = {}) => {
        const params = {};
        if (filters.search) params.search = filters.search;
        if (filters.area) params.area = filters.area;
        if (filters.department) params.department = filters.department;
        if (filters.status) params.status = filters.status;
        return apiClient.get('/opportunities', { params });
    },
    getById: (id) => apiClient.get(`/opportunities/${id}`),
    create: (payload) => apiClient.post('/opportunities', payload),
    update: (id, payload) => apiClient.put(`/opportunities/${id}`, payload),
    remove: (id) => apiClient.delete(`/opportunities/${id}`),
};

// ─── Public API (components import from here only) ───────────────────────────
const api = useMock ? mockApi : realApi;

export const getOpportunities = (filters) => api.getAll(filters);
export const getOpportunity = (id) => api.getById(id);
export const createOpportunity = (payload) => api.create(payload);
export const updateOpportunity = (id, payload) => api.update(id, payload);
export const deleteOpportunity = (id) => api.remove(id);
