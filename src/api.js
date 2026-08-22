// src/api.js — single API client for the dashboard.
// Previously this hardcoded http://localhost:5000/api (so it was dead in
// production) and nothing imported it.
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const getToken = () => localStorage.getItem('token');

let loggingOut = false;

export const logout = (redirect = true) => {
  localStorage.removeItem('token');
  localStorage.removeItem('tempToken');
  if (redirect && !loggingOut && window.location.pathname !== '/login') {
    loggingOut = true; // one redirect even if several requests 401 together
    window.location.href = '/login';
  }
};

const PUBLIC_PATHS = ['/login', '/register', '/verify-email'];

// Most pages still call fetch() directly. Rather than rewrite every call site,
// catch 401s from our own API here so an expired token always ends at the
// login screen instead of leaving the user on a permanently broken page.
export const installAuthInterceptor = () => {
  const nativeFetch = window.fetch.bind(window);
  window.fetch = async (input, init) => {
    const res = await nativeFetch(input, init);
    const url = typeof input === 'string' ? input : input?.url || '';
    if (
      res.status === 401 &&
      url.startsWith(API_BASE) &&
      !PUBLIC_PATHS.includes(window.location.pathname)
    ) {
      logout();
    }
    return res;
  };
};

// The API always answers with JSON now, but a proxy or gateway error can still
// return HTML — don't let that surface as "Unexpected token '<'".
const parseBody = async (res) => {
  const text = await res.text();
  if (!text) return {};
  try {
    return JSON.parse(text);
  } catch {
    return { message: `Unexpected server response (${res.status})` };
  }
};

const request = async (endpoint, { method = 'GET', body, auth = true, raw = false } = {}) => {
  const headers = {};
  if (auth) {
    const token = getToken();
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  let payload;
  if (body instanceof FormData) {
    payload = body; // let the browser set the multipart boundary
  } else if (body !== undefined) {
    headers['Content-Type'] = 'application/json';
    payload = JSON.stringify(body);
  }

  let res;
  try {
    res = await fetch(`${API_BASE}${endpoint}`, { method, headers, body: payload });
  } catch {
    throw new Error('Network error. Please check your connection and try again.');
  }

  // An expired or invalid token used to leave the user stuck on a broken page
  // with only a toast; now the session is cleared and they go back to login.
  if (res.status === 401 && auth) {
    logout();
    throw new Error('Session expired, please log in again');
  }

  if (raw) {
    if (!res.ok) throw new Error((await parseBody(res)).message || 'Request failed');
    return res.blob();
  }

  const data = await parseBody(res);
  if (!res.ok) throw new Error(data.message || 'Request failed');
  return data;
};

export const api = {
  get: (endpoint, options) => request(endpoint, { ...options, method: 'GET' }),
  post: (endpoint, body, options) => request(endpoint, { ...options, method: 'POST', body }),
  put: (endpoint, body, options) => request(endpoint, { ...options, method: 'PUT', body }),
  del: (endpoint, options) => request(endpoint, { ...options, method: 'DELETE' }),
};

export default api;
