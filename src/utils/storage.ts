import { BusinessRegistration, CreatorRegistration } from '../types';
import { INITIAL_BUSINESSES, INITIAL_CREATORS } from '../data/initialData';

const CREATORS_KEY = 'scopeswell_creators_v1';
const BUSINESSES_KEY = 'scopeswell_businesses_v1';

export function getStoredCreators(): CreatorRegistration[] {
  try {
    const raw = localStorage.getItem(CREATORS_KEY);
    if (!raw) {
      localStorage.setItem(CREATORS_KEY, JSON.stringify(INITIAL_CREATORS));
      return INITIAL_CREATORS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_CREATORS;
  }
}

export function saveCreator(creator: Omit<CreatorRegistration, 'id' | 'createdAt' | 'queueNumber'>): CreatorRegistration {
  const existing = getStoredCreators();
  const newCreator: CreatorRegistration = {
    ...creator,
    id: `cr-${Date.now()}`,
    createdAt: new Date().toISOString(),
    queueNumber: existing.length + 1420,
  };
  const updated = [newCreator, ...existing];
  try {
    localStorage.setItem(CREATORS_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save creator to localStorage', e);
  }
  return newCreator;
}

export function getStoredBusinesses(): BusinessRegistration[] {
  try {
    const raw = localStorage.getItem(BUSINESSES_KEY);
    if (!raw) {
      localStorage.setItem(BUSINESSES_KEY, JSON.stringify(INITIAL_BUSINESSES));
      return INITIAL_BUSINESSES;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_BUSINESSES;
  }
}

export function saveBusiness(biz: Omit<BusinessRegistration, 'id' | 'createdAt' | 'pilotPriority'>): BusinessRegistration {
  const existing = getStoredBusinesses();
  const newBiz: BusinessRegistration = {
    ...biz,
    id: `biz-${Date.now()}`,
    createdAt: new Date().toISOString(),
    pilotPriority: 'VIP Fast-Track',
  };
  const updated = [newBiz, ...existing];
  try {
    localStorage.setItem(BUSINESSES_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save business to localStorage', e);
  }
  return newBiz;
}

export function resetToSeedData() {
  localStorage.setItem(CREATORS_KEY, JSON.stringify(INITIAL_CREATORS));
  localStorage.setItem(BUSINESSES_KEY, JSON.stringify(INITIAL_BUSINESSES));
}
