import { FeedbackReport } from '../types';

const FEEDBACK_KEY = 'scopeswell_user_feedback_v1';

export function getStoredFeedbackReports(): FeedbackReport[] {
  try {
    const raw = localStorage.getItem(FEEDBACK_KEY);
    if (!raw) {
      return [];
    }
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveFeedbackReport(report: Omit<FeedbackReport, 'id' | 'createdAt' | 'status'>): FeedbackReport {
  const existing = getStoredFeedbackReports();
  const newReport: FeedbackReport = {
    ...report,
    id: `fb-${Date.now()}`,
    createdAt: new Date().toISOString(),
    status: 'Received',
  };
  const updated = [newReport, ...existing];
  try {
    localStorage.setItem(FEEDBACK_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save feedback to localStorage', e);
  }
  return newReport;
}
