const API_URL = (import.meta.env.VITE_API_URL || 'https://adaa-clothing-production-9222.up.railway.app')
  .replace(/\/api\/?$/, '')
  .replace(/\/$/, '');

export const apiRequest = async (path, options = {}) => {
  const token = localStorage.getItem('token');
  const headers = new Headers(options.headers || {});

  if (options.body && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
  });
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || 'Request failed');
  }

  return data;
};
