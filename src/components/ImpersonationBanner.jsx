import { ShieldAlert, X } from 'lucide-react';
import { useUser } from '../context/UserContext';

// An impersonated session must never be invisible: without this an admin can
// forget which account they are in and act on a real user's money by mistake.
const ImpersonationBanner = () => {
  const { user } = useUser();

  if (!user?.impersonated) return null;

  const endSession = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('impersonating');
    window.location.replace('/login');
  };

  return (
    <div className="sticky top-0 z-[10001] flex items-center justify-center gap-3 bg-amber-500 px-4 py-2 text-sm font-medium text-amber-950">
      <ShieldAlert className="h-4 w-4 shrink-0" />
      <span className="text-center">
        Admin support session — you are acting as{' '}
        <strong>{user.name || user.username}</strong> ({user.email}). Everything you do here is recorded.
      </span>
      <button
        onClick={endSession}
        className="inline-flex shrink-0 items-center gap-1 rounded-md bg-amber-950/15 px-2 py-1 text-xs font-semibold hover:bg-amber-950/25"
      >
        <X className="h-3 w-3" /> End session
      </button>
    </div>
  );
};

export default ImpersonationBanner;
