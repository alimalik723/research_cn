// src/utils/formatters.js

export function formatDate(isoString) {
    if (!isoString) return 'N/A';
    const date = new Date(isoString);
    if (isNaN(date.getTime())) return isoString;
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
}

export function formatRelativeDeadline(isoString) {
    if (!isoString) return '';
    const deadline = new Date(isoString);
    const now = new Date();
    if (isNaN(deadline.getTime())) return '';
    const diffMs = deadline - now;
    const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
    if (diffDays < 0) return 'Expired';
    if (diffDays === 0) return 'Due today';
    if (diffDays === 1) return '1 day left';
    if (diffDays <= 7) return `${diffDays} days left`;
    if (diffDays <= 30) return `${Math.ceil(diffDays / 7)} weeks left`;
    return formatDate(isoString);
}

export function truncate(str, maxLength = 120) {
    if (!str) return '';
    return str.length > maxLength ? str.slice(0, maxLength).trimEnd() + '…' : str;
}
