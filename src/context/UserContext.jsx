import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import api, { getToken } from '../api';

// Several components used to render a hardcoded name and email address
// (a real person's, left over from the original template). They now all read
// the signed-in user from here, fetched once and shared.
const UserContext = createContext({ user: null, loading: true, refresh: () => {} });

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    if (!getToken()) {
      setUser(null);
      setLoading(false);
      return;
    }
    try {
      setUser(await api.get('/users/me'));
    } catch {
      // api.get already redirects to /login on a 401; nothing to show here.
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  return (
    <UserContext.Provider value={{ user, loading, refresh, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

// "Ada Lovelace" -> "AL", "alice" -> "AL"
export const initialsOf = (user) => {
  if (!user) return '';
  const source = (user.name || user.username || '').trim();
  if (!source) return '';
  const parts = source.split(/\s+/);
  if (parts.length > 1) return (parts[0][0] + parts[1][0]).toUpperCase();
  return source.slice(0, 2).toUpperCase();
};

export default UserContext;
