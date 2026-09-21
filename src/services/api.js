const API_BASE = (import.meta.env.VITE_API_BASE_URL || '/api').replace(/\/$/, '');

async function request(path, options) {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(options?.headers || {}) },
    ...options
  });
  const body = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(body.error || `Request failed (${response.status})`);
  return body;
}

export const api = {
  health: () => request('/health'),
  wards: () => request('/wards'),
  weather: wardId => request(`/weather/${encodeURIComponent(wardId)}`),
  forecast: wardId => request(`/forecast/${encodeURIComponent(wardId)}`),
  risk: profile => request('/risk', { method: 'POST', body: JSON.stringify(profile) }),
  sendAlert: alert => request('/alerts', { method: 'POST', body: JSON.stringify(alert) }),
  executeHap: wardId => request(`/hap/${encodeURIComponent(wardId)}`, { method: 'POST' }),
  actions: () => request('/actions')
};
