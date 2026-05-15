// src/api.js
const API_BASE = 'http://localhost:5000/api';

const api = async (endpoint, method = 'GET', body = null, requiresAuth = true) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  if (requiresAuth) {
    const token = localStorage.getItem('token');
    if (token) headers['Authorization'] = `Bearer ${token}`;
  }
  const config = { method, headers };
  if (body) config.body = JSON.stringify(body);

  const res = await fetch(`${API_BASE}${endpoint}`, config);
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Request failed');
  return data;
};

export default api;