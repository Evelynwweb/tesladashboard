import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import api, { getToken } from '../api';

// Several components used to render a hardcoded name and email address
// (a real person's, left over from the original template). They now all read
// the signed-in user from here, fetched once and shared.
const UserContext = createContext({ user: null, loading: true, refresh: () => {} });

// Resolves to the signed-in user, or null (no token / request failed).
// api.get already redirects to /login on a 401.
const loadUser = () =>
  getToken() ? api.get('/users/me').catch(() => null) : Promise.resolve(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(() => Boolean(getToken()));

  const refresh = useCallback(async () => {
    const next = await loadUser();
    setUser(next);
    setLoading(false);
  }, []);

  useEffect(() => {
    let cancelled = false;
    loadUser().then((next) => {
      if (cancelled) return;
      setUser(next);
      setLoading(false);
    });
    return () => { cancelled = true; };
  }, []);

  return (
    <UserContext.Provider value={{ user, loading, refresh, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useUser = () => useContext(UserContext);

// "Ada Lovelace" -> "AL", "alice" -> "AL"
// eslint-disable-next-line react-refresh/only-export-components
export const initialsOf = (user) => {
  if (!user) return '';
  const source = (user.name || user.username || '').trim();
  if (!source) return '';
  const parts = source.split(/\s+/);
  if (parts.length > 1) return (parts[0][0] + parts[1][0]).toUpperCase();
  return source.slice(0, 2).toUpperCase();
};

export default UserContext;
