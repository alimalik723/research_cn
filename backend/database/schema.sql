-- =============================================================
-- UniResearch Portal — Database Schema
-- Run: mysql -u root -p < schema.sql
-- =============================================================

CREATE DATABASE IF NOT EXISTS research_opportunity_portal
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE research_opportunity_portal;

-- ─── Opportunities Table ──────────────────────────────────────
CREATE TABLE IF NOT EXISTS opportunities (
  id                  INT AUTO_INCREMENT PRIMARY KEY,
  title               VARCHAR(255)              NOT NULL,
  description         TEXT                      NOT NULL,
  research_area       VARCHAR(150)              NOT NULL,
  faculty_name        VARCHAR(150)              NOT NULL,
  department          VARCHAR(150)              NOT NULL,
  required_skills     TEXT                      NOT NULL,
  available_positions INT                       NOT NULL CHECK (available_positions > 0),
  application_deadline DATE                     NOT NULL,
  status              ENUM('Open', 'Closed')    NOT NULL DEFAULT 'Open',
  created_at          TIMESTAMP                 DEFAULT CURRENT_TIMESTAMP,
  updated_at          TIMESTAMP                 DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ─── Indexes ──────────────────────────────────────────────────
CREATE INDEX idx_status           ON opportunities (status);
CREATE INDEX idx_research_area    ON opportunities (research_area);
CREATE INDEX idx_department       ON opportunities (department);
CREATE INDEX idx_application_deadline ON opportunities (application_deadline);

-- ─── Sample Development Data ──────────────────────────────────
INSERT INTO opportunities
  (title, description, research_area, faculty_name, department, required_skills, available_positions, application_deadline, status)
VALUES
(
  'Machine Learning for Medical Image Analysis',
  'Develop and evaluate deep learning models for automated detection of anomalies in medical imaging datasets (MRI, CT scans). Students will work with PyTorch and real-world clinical datasets in a privacy-compliant research environment.',
  'Artificial Intelligence',
  'Dr. Sarah Mitchell',
  'Computer Science',
  'Python, PyTorch, NumPy, Basic Statistics, Medical Imaging Basics',
  3,
  '2026-12-01',
  'Open'
),
(
  'Blockchain-Based Supply Chain Transparency',
  'Investigate the use of smart contracts and distributed ledgers to improve traceability in global supply chains. Research involves Ethereum, Solidity, and integration with enterprise ERP systems.',
  'Distributed Systems',
  'Prof. James Okafor',
  'Information Systems',
  'Solidity, JavaScript, Node.js, REST APIs, Ethereum',
  2,
  '2026-11-15',
  'Open'
),
(
  'Natural Language Processing for Sentiment Analysis',
  'Build and benchmark transformer-based NLP pipelines for multi-lingual sentiment analysis on social media corpora. The project involves fine-tuning pre-trained BERT variants and evaluating on public datasets.',
  'Natural Language Processing',
  'Dr. Fatima Khalil',
  'Computer Science',
  'Python, HuggingFace Transformers, NLTK, pandas, Machine Learning',
  4,
  '2026-10-30',
  'Open'
);
