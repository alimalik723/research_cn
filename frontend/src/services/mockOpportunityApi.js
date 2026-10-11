// src/services/mockOpportunityApi.js
// In-memory mock store that simulates the Phase 2 REST API.
// This file is the ONLY place mock data lives.
// To integrate the real backend: set VITE_USE_MOCK_API=false in .env

let nextId = 4;

const delay = (ms = 300) => new Promise((res) => setTimeout(res, ms));

// ─── Seed data (3+ realistic records) ────────────────────────────────────────
let store = [
    {
        id: 1,
        title: 'Machine Learning for Medical Image Analysis',
        description:
            'Develop and evaluate deep learning models for automated detection of anomalies in medical imaging datasets (MRI, CT scans). Students will work with PyTorch and real-world clinical datasets in a privacy-compliant research environment.',
        area: 'Artificial Intelligence',
        faculty: 'Dr. Sarah Mitchell',
        department: 'Computer Science',
        skills: 'Python, PyTorch, NumPy, Basic Statistics, Medical Imaging Basics',
        positions: 3,
        deadline: '2026-12-01',
        status: 'Open',
    },
    {
        id: 2,
        title: 'Blockchain-Based Supply Chain Transparency',
        description:
            'Investigate the use of smart contracts and distributed ledgers to improve traceability in global supply chains. Research involves Ethereum, Solidity, and integration with enterprise ERP systems.',
        area: 'Distributed Systems',
        faculty: 'Prof. James Okafor',
        department: 'Information Systems',
        skills: 'Solidity, JavaScript, Node.js, REST APIs, Ethereum',
        positions: 2,
        deadline: '2026-11-15',
        status: 'Open',
    },
    {
        id: 3,
        title: 'Natural Language Processing for Sentiment Analysis',
        description:
            'Build and benchmark transformer-based NLP pipelines for multi-lingual sentiment analysis on social media corpora. The project involves fine-tuning pre-trained BERT variants and evaluating on public datasets.',
        area: 'Natural Language Processing',
        faculty: 'Dr. Fatima Khalil',
        department: 'Computer Science',
        skills: 'Python, HuggingFace Transformers, NLTK, pandas, Machine Learning',
        positions: 4,
        deadline: '2026-10-30',
        status: 'Open',
    },
    {
        id: 4,
        title: 'IoT-Enabled Smart Campus Energy Management',
        description:
            'Design and prototype a real-time energy monitoring system for campus buildings using IoT sensors, MQTT, and a cloud-based dashboard. Closed for new applications but viewable as a reference project.',
        area: 'Internet of Things',
        faculty: 'Dr. Liam Chen',
        department: 'Electrical Engineering',
        skills: 'Arduino, MQTT, Node.js, React, Cloud Platforms',
        positions: 2,
        deadline: '2026-09-01',
        status: 'Closed',
    },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
function applyFilters(items, { search, area, department, status }) {
    return items.filter((item) => {
        if (search && !item.title.toLowerCase().includes(search.toLowerCase()))
            return false;
        if (area && item.area !== area) return false;
        if (department && item.department !== department) return false;
        if (status && item.status !== status) return false;
        return true;
    });
}

// ─── Mock API methods ─────────────────────────────────────────────────────────

export async function getAll(filters = {}) {
    await delay();
    return { data: applyFilters(store, filters) };
}

export async function getById(id) {
    await delay();
    const item = store.find((o) => o.id === Number(id));
    if (!item) throw new Error(`Opportunity with id ${id} not found`);
    return { data: item };
}

export async function create(payload) {
    await delay(500);
    const newItem = { ...payload, id: nextId++ };
    store = [...store, newItem];
    return { data: newItem, message: 'Opportunity created successfully' };
}

export async function update(id, payload) {
    await delay(500);
    const index = store.findIndex((o) => o.id === Number(id));
    if (index === -1) throw new Error(`Opportunity with id ${id} not found`);
    store[index] = { ...store[index], ...payload };
    return { data: store[index], message: 'Opportunity updated successfully' };
}

export async function remove(id) {
    await delay(400);
    const index = store.findIndex((o) => o.id === Number(id));
    if (index === -1) throw new Error(`Opportunity with id ${id} not found`);
    store = store.filter((o) => o.id !== Number(id));
    return { message: 'Opportunity deleted successfully' };
}
