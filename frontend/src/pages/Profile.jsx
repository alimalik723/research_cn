// src/pages/Profile.jsx
import {
    Mail, Phone, Globe, MapPin, BookOpen, Award, Building2
} from 'lucide-react';

const PROFILE = {
    initials: 'FK',
    name: 'Dr. Fatima Khalil',
    title: 'Associate Professor',
    department: 'Computer Science',
    university: 'University of Technology',
    email: 'f.khalil@university.edu',
    phone: '+1 (555) 012-3456',
    office: 'Room 412, Science & Technology Building',
    website: 'https://faculty.university.edu/fkhalil',
    researchInterests: [
        'Natural Language Processing',
        'Machine Learning',
        'Text Mining',
        'Sentiment Analysis',
        'Cross-lingual NLP',
    ],
    bio: 'Dr. Fatima Khalil is an Associate Professor specializing in Natural Language Processing and Machine Learning. She received her PhD from MIT in 2015 and has published over 40 peer-reviewed papers. Her research group actively explores transformer-based models for low-resource and cross-lingual NLP tasks.',
    education: [
        { degree: 'PhD, Computer Science', institution: 'MIT', year: '2015' },
        { degree: 'M.Sc., Artificial Intelligence', institution: 'Stanford University', year: '2011' },
        { degree: 'B.Sc., Computer Science', institution: 'University of Jordan', year: '2009' },
    ],
};

export default function Profile() {
    return (
        <>
            <div className="page-header">
                <h1 className="page-title">Faculty Profile</h1>
                <p className="page-subtitle">Your research portal profile information</p>
            </div>

            <div className="profile-card">
                <div className="profile-banner" aria-hidden="true" />
                <div className="profile-body">
                    <div className="profile-avatar" aria-hidden="true">{PROFILE.initials}</div>
                    <h2 className="profile-name">{PROFILE.name}</h2>
                    <p className="profile-title">
                        {PROFILE.title} — {PROFILE.department}
                    </p>
                    <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', marginTop: '2px' }}>
                        {PROFILE.university}
                    </p>

                    {/* Contact info */}
                    <div className="profile-section">
                        <h3 className="profile-section-title">Contact Information</h3>
                        <div className="profile-info-grid">
                            <div className="profile-info-item">
                                <label><Mail size={12} style={{ display: 'inline', marginRight: 4 }} />Email</label>
                                <span>{PROFILE.email}</span>
                            </div>
                            <div className="profile-info-item">
                                <label><Phone size={12} style={{ display: 'inline', marginRight: 4 }} />Phone</label>
                                <span>{PROFILE.phone}</span>
                            </div>
                            <div className="profile-info-item">
                                <label><MapPin size={12} style={{ display: 'inline', marginRight: 4 }} />Office</label>
                                <span>{PROFILE.office}</span>
                            </div>
                            <div className="profile-info-item">
                                <label><Globe size={12} style={{ display: 'inline', marginRight: 4 }} />Website</label>
                                <span>
                                    <a href={PROFILE.website} target="_blank" rel="noopener noreferrer"
                                        style={{ color: 'var(--color-accent)' }}>
                                        faculty profile
                                    </a>
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Bio */}
                    <div className="profile-section">
                        <h3 className="profile-section-title">Biography</h3>
                        <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
                            {PROFILE.bio}
                        </p>
                    </div>

                    {/* Research interests */}
                    <div className="profile-section">
                        <h3 className="profile-section-title">
                            <BookOpen size={14} style={{ display: 'inline', marginRight: 6 }} />
                            Research Interests
                        </h3>
                        <div className="skills-list">
                            {PROFILE.researchInterests.map((interest) => (
                                <span key={interest} className="skill-tag">{interest}</span>
                            ))}
                        </div>
                    </div>

                    {/* Education */}
                    <div className="profile-section">
                        <h3 className="profile-section-title">
                            <Award size={14} style={{ display: 'inline', marginRight: 6 }} />
                            Education
                        </h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                            {PROFILE.education.map((edu) => (
                                <div key={edu.degree} style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-3)' }}>
                                    <div style={{
                                        width: 8, height: 8, borderRadius: '50%',
                                        background: 'var(--color-accent)',
                                        marginTop: 6, flexShrink: 0
                                    }} />
                                    <div>
                                        <div style={{ fontSize: 'var(--font-size-sm)', fontWeight: 500 }}>{edu.degree}</div>
                                        <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)' }}>
                                            {edu.institution} · {edu.year}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
