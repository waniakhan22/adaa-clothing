const API_BASE_URL = (import.meta.env.VITE_API_URL || 'https://adaa-clothing-production-9222.up.railway.app/api')
  .replace(/\/$/, '')
  .replace(/\/api$/, '');

export const apiUrl = (path) => `${API_BASE_URL}/api${path}`;
