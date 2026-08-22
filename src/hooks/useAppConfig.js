import { useEffect, useState } from 'react';
import api from '../api';

// Mirrors the API's REQUIRE_EMAIL_VERIFICATION setting so the signup entry
// point follows the backend instead of needing its own flag.
export const useAppConfig = () => {
  const [config, setConfig] = useState(null);

  useEffect(() => {
    let cancelled = false;
    api.get('/config', { auth: false })
      .then((data) => { if (!cancelled) setConfig(data); })
      // If it can't be read, fall back to no verification: that matches the
      // API's own behaviour when the flag is off and never strands a signup.
      .catch(() => { if (!cancelled) setConfig({ requireEmailVerification: false }); });
    return () => { cancelled = true; };
  }, []);

  return config;
};

export default useAppConfig;
