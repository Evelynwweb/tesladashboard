import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Lock, Eye, EyeOff, ShieldCheck, Info } from 'lucide-react';
import toast from 'react-hot-toast';

const ConfirmPassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!password.trim()) {
    toast.error('Please enter your password');
    return;
  }

  setIsLoading(true);
  setTimeout(() => {
    setIsLoading(false);
    toast.success('Identity confirmed. Redirecting...');
    sessionStorage.setItem('withdraw_password_confirmed', 'true');
    const from = location.state?.from || '/dashboard/withdrawals';
    navigate(from);
  }, 800);
};

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        {/* Card Header with Badge */}
        <div className="text-center mb-8">
          <div className="security-badge inline-flex items-center justify-center h-20 w-20 rounded-full dark:bg-dark-100 bg-light-200 mb-4 mx-auto relative">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/30 to-secondary/30 blur-md"></div>
            <div className="absolute inset-0 rounded-full animate-spin-slow opacity-40" style={{ border: '1px dashed currentColor' }}></div>
            <div className="relative">
              <Shield className="h-10 w-10 text-primary" />
            </div>
          </div>
          <h2 className="text-2xl font-extrabold dark:text-white text-dark">Secure Area</h2>
          <p className="mt-2 text-sm dark:text-gray-300 text-gray-700">
            Please confirm your password before continuing
          </p>
        </div>

        {/* Main Card */}
        <div className="relative overflow-hidden rounded-2xl shadow-xl transition-all">
          {/* Animated Background (optional – use CSS classes from global) */}
          <div className="absolute inset-0 animated-bg -z-10 opacity-25"></div>

          {/* Security Pattern Overlay */}
          <div className="absolute inset-0 -z-10 opacity-5">
            <svg width="100%" height="100%">
              <pattern id="securityPattern" width="32" height="32" patternUnits="userSpaceOnUse">
                <path d="M0 16 L32 16 M16 0 L16 32" stroke="currentColor" strokeWidth="0.5" />
                <circle cx="16" cy="16" r="1.5" fill="currentColor" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#securityPattern)" />
            </svg>
          </div>

          {/* Glass Morphism Card */}
          <div className="dark:bg-dark-50/80 bg-light-100/80 backdrop-blur-sm border dark:border-dark-100 border-light-200 rounded-2xl p-8 relative z-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Password Field */}
              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium dark:text-gray-300 text-gray-700">
                  Enter Password <span className="text-primary">*</span>
                </label>
                <div className="relative mt-1 rounded-md shadow-sm">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <Lock className="h-5 w-5 dark:text-gray-400 text-gray-500" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    autoComplete="current-password"
                    autoFocus
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-10 py-3 dark:bg-dark-100 bg-light-200 border-0 dark:border-dark-100 border-light-200 dark:text-white text-dark rounded-lg focus:ring-2 focus:ring-primary dark:focus:border-primary focus:border-primary security-input pulse-focus transition-all"
                    placeholder="••••••••••"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center">
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="pr-3 dark:text-gray-400 text-gray-600 hover:text-primary dark:hover:text-primary focus:outline-none"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="group relative flex w-full justify-center py-3 px-4 border border-transparent rounded-lg text-white font-medium shadow-sm transition-all overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-90 group-hover:opacity-100 transition-opacity"></span>
                  <span className="relative flex items-center justify-center">
                    {isLoading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Verifying...
                      </>
                    ) : (
                      <>
                        <ShieldCheck className="h-5 w-5 mr-2 animate-pulse" />
                        Confirm Identity
                      </>
                    )}
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Bottom Security Info */}
        <div className="mt-8 text-center">
          <p className="text-xs dark:text-gray-400 text-gray-600 flex items-center justify-center">
            <Info className="h-3 w-3 mr-1" />
            This extra security step helps protect your account
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConfirmPassword;