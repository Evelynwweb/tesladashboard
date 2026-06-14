import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Mail, Lock, Loader2, LogIn, Shield, Eye, EyeOff } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { useTheme } from '../context/ThemeContext';

const Login = () => {
  const { dark, toggleDark } = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

  const onSubmit = async (data) => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: data.email, password: data.password })
    });
    const result = await res.json();
    if (res.ok) {
      localStorage.setItem('token', result.token);
      toast.success('Login successful!');
      window.location.href = '/dashboard';
    } else {
      toast.error(result.message);
    }
  } catch (err) {
    toast.error(err.message);
  }
};

  return (
    <div className="min-h-screen bg-light-100 dark:bg-dark transition-colors duration-200 flex flex-col lg:flex-row">
        <Toaster position="top-right" />
      {/* Left illustration panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-dot-pattern dark:bg-dark-50 bg-light-200 relative overflow-hidden items-center justify-center">
        <div className="absolute top-8 left-8">
          <img src="/logo.png" alt="Logo" className="dark:brightness-0 dark:invert w-32" />
        </div>
        <div className="text-center max-w-md">
          <h1 className="text-3xl font-bold dark:text-white text-dark mb-4">Welcome to Tesla Stock SpaceX</h1>
          <p className="dark:text-gray-300 text-gray-700">
            Our platform offers secure trading, real‑time market data, and expert insights to help you achieve your financial goals.
          </p>
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="fixed top-4 right-4 z-50 lg:block">
          <button onClick={toggleDark} className="p-2 rounded-full bg-light-200 dark:bg-dark-100 shadow-sm">
            {dark ? (
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-dark" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401" />
              </svg>
            )}
          </button>
        </div>

        <div className="w-full max-w-md">
          <div className="dark:bg-dark-50 bg-white rounded-xl shadow-lg border dark:border-dark-200/30 border-light-300/30 overflow-hidden">
            <div className="dark:bg-dark-100/50 bg-light-100/50 p-6 border-b dark:border-dark-200/50 border-light-200/50">
              <h2 className="text-xl font-bold dark:text-white text-dark text-center">User Login</h2>
              <p className="mt-1 text-sm dark:text-gray-400 text-gray-600 text-center">Sign in to your account to continue</p>
            </div>

            <div className="p-6 md:p-8">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-2">
                    Username or Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 dark:text-gray-400 text-gray-500" />
                    </div>
                    <input
                      id="email"
                      type="text"
                      {...register('email', { required: 'Email or username is required' })}
                      className="block w-full pl-10 pr-3 py-3 dark:bg-dark-100 bg-light-50 border dark:border-dark-200 border-light-300 rounded-lg shadow-sm dark:text-white text-dark focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                      placeholder="you@example.com or username"
                    />
                  </div>
                  {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 dark:text-gray-400 text-gray-500" />
                    </div>
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      {...register('password', { required: 'Password is required' })}
                      className="block w-full pl-10 pr-10 py-3 dark:bg-dark-100 bg-light-50 border dark:border-dark-200 border-light-300 rounded-lg shadow-sm dark:text-white text-dark focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 dark:text-gray-400 hover:text-primary"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="remember"
                      {...register('remember')}
                      className="h-4 w-4 dark:bg-dark-100 bg-light-50 dark:border-dark-200 border-light-300 rounded focus:ring-primary"
                    />
                    <label htmlFor="remember" className="ml-2 block text-sm dark:text-gray-300 text-gray-700">
                      Remember me
                    </label>
                  </div>
                  <a href="/forgot-password" className="text-sm font-medium text-primary hover:text-primary-600 transition-colors">
                    Forgot password?
                  </a>
                </div>

                <div>
                 <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex justify-center items-center px-4 py-3 border border-transparent rounded-lg shadow-md text-white bg-primary hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                      <span className="font-medium">Signing in...</span>
                    </>
                  ) : (
                    <>
                      <LogIn className="h-5 w-5 mr-2" />
                      <span className="font-medium">Sign In</span>
                    </>
                  )}
                </button>
                </div>
              </form>

              <div className="mt-8 text-center">
                <p className="text-sm dark:text-gray-400 text-gray-600">
                  Don't have an account?{' '}
                  {/* CHANGED: /verify → /register */}
                  <a href="/register" className="font-medium text-primary hover:text-primary-600 transition-colors">
                    Sign up now
                  </a>
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <div className="inline-flex items-center text-xs dark:text-gray-500 text-gray-500">
              <Shield className="h-3 w-3 mr-1" />
              <span>Secure login – Your data is protected</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .bg-dot-pattern {
          background-image: radial-gradient(circle, rgba(0,0,0,0.1) 1px, transparent 1px);
          background-size: 20px 20px;
        }
        .dark .bg-dot-pattern {
          background-image: radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px);
        }
      `}</style>
    </div>
  );
};

export default Login;