import { useEffect } from 'react';

// Landing page for the admin "Log in as" button. The admin panel opens
// /impersonate#token=<jwt>; the token arrives in the hash fragment, which
// browsers never send to a server, so it stays out of access logs.
const readToken = () =>
  new URLSearchParams(window.location.hash.replace(/^#/, '')).get('token');

const Impersonate = () => {
  const token = readToken();

  useEffect(() => {
    if (!token) return;
    localStorage.setItem('token', token);
    localStorage.setItem('impersonating', 'true');
    // Drop the token from the address bar before handing control to the app.
    window.history.replaceState(null, '', '/dashboard');
    window.location.replace('/dashboard');
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-light-100 dark:bg-dark p-4">
      <div className="text-center">
        {token ? (
          <p className="text-sm text-gray-500">Opening the account...</p>
        ) : (
          <>
            <h1 className="text-lg font-semibold dark:text-white text-dark">Could not start the session</h1>
            <p className="mt-2 text-sm text-gray-500">
              No session token was supplied. Open this from the admin panel.
            </p>
            <a href="/login" className="mt-4 inline-block text-sm font-medium text-primary hover:underline">
              Go to login
            </a>
          </>
        )}
      </div>
    </div>
  );
};

export default Impersonate;
