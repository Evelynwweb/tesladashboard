import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { User, UserCheck, Mail, Phone, Lock, MapPin, Users, UserPlus, Shield, Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';
import { useTheme } from '../context/ThemeContext';

const countries = [
  { code: 'US', name: 'United States of America' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'CA', name: 'Canada' },
  { code: 'AU', name: 'Australia' },
  { code: 'NG', name: 'Nigeria' },
  // Add all countries from the original list...
];

const Register = () => {
  const { dark, toggleDark } = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm();

  const password = watch('password');

const onSubmit = async (data) => {
  try {
    const res = await fetch('http://localhost:5000/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    const result = await res.json();
    if (res.ok) {
      localStorage.setItem('token', result.token);
      toast.success('Registration successful!');
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
      {/* Left illustration panel (hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 bg-dot-pattern dark:bg-dark-50 bg-light-200 relative overflow-hidden items-center justify-center">
        <div className="absolute top-8 left-8">
          <img src="/logo.png" alt="Logo" className="dark:brightness-0 dark:invert w-32" />
        </div>
        <div className="text-center max-w-md">
          <h1 className="text-3xl font-bold dark:text-white text-dark mb-4">Invest with Confidence</h1>
          <p className="dark:text-gray-300 text-gray-700">
            Take control of your financial future with our transparent and secure investment platform.
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
              <h2 className="text-xl font-bold dark:text-white text-dark">Create an Account</h2>
              <p className="mt-1 text-sm dark:text-gray-400 text-gray-600">Fill in your details to get started</p>
            </div>

            <div className="p-6 md:p-8">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 gap-6">
                  {/* Username */}
                  <div>
                    <label className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-2">
                      Username <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 dark:text-gray-400 text-gray-500" />
                      </div>
                      <input
                        type="text"
                        {...register('username', { required: 'Username is required' })}
                        className="block w-full pl-10 pr-3 py-3 dark:bg-dark-100 bg-light-50 border dark:border-dark-200 border-light-300 rounded-lg shadow-sm dark:text-white text-dark focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                        placeholder="Enter unique username"
                      />
                    </div>
                    {errors.username && <p className="mt-1 text-sm text-red-500">{errors.username.message}</p>}
                  </div>

                  {/* Full Name */}
                  <div>
                    <label className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-2">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <UserCheck className="h-5 w-5 dark:text-gray-400 text-gray-500" />
                      </div>
                      <input
                        type="text"
                        {...register('name', { required: 'Full name is required' })}
                        className="block w-full pl-10 pr-3 py-3 dark:bg-dark-100 bg-light-50 border dark:border-dark-200 border-light-300 rounded-lg shadow-sm dark:text-white text-dark focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                        placeholder="Enter your full name"
                      />
                    </div>
                    {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-2">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 dark:text-gray-400 text-gray-500" />
                      </div>
                      <input
                        type="email"
                        {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' } })}
                        className="block w-full pl-10 pr-3 py-3 dark:bg-dark-100 bg-light-50 border dark:border-dark-200 border-light-300 rounded-lg shadow-sm dark:text-white text-dark focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                        placeholder="name@example.com"
                      />
                    </div>
                    {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-2">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Phone className="h-5 w-5 dark:text-gray-400 text-gray-500" />
                      </div>
                      <input
                        type="tel"
                        {...register('phone', { required: 'Phone number is required' })}
                        className="block w-full pl-10 pr-3 py-3 dark:bg-dark-100 bg-light-50 border dark:border-dark-200 border-light-300 rounded-lg shadow-sm dark:text-white text-dark focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                        placeholder="Enter your phone number"
                      />
                    </div>
                    {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>}
                  </div>

                  {/* Password */}
                  <div>
                    <label className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-2">
                      Password <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 dark:text-gray-400 text-gray-500" />
                      </div>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        {...register('password', { required: 'Password is required', minLength: { value: 8, message: 'Password must be at least 8 characters' } })}
                        className="block w-full pl-10 pr-10 py-3 dark:bg-dark-100 bg-light-50 border dark:border-dark-200 border-light-300 rounded-lg shadow-sm dark:text-white text-dark focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                        placeholder="Create password"
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

                  {/* Confirm Password */}
                  <div>
                    <label className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-2">
                      Confirm Password <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 dark:text-gray-400 text-gray-500" />
                      </div>
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        {...register('password_confirmation', {
                          required: 'Please confirm your password',
                          validate: value => value === password || 'Passwords do not match'
                        })}
                        className="block w-full pl-10 pr-10 py-3 dark:bg-dark-100 bg-light-50 border dark:border-dark-200 border-light-300 rounded-lg shadow-sm dark:text-white text-dark focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                        placeholder="Confirm password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 dark:text-gray-400 hover:text-primary"
                      >
                        {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                    {errors.password_confirmation && <p className="mt-1 text-sm text-red-500">{errors.password_confirmation.message}</p>}
                  </div>

                  {/* Country */}
                  <div>
                    <label className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-2">
                      Country <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MapPin className="h-5 w-5 dark:text-gray-400 text-gray-500" />
                      </div>
                      <select
                        {...register('country', { required: 'Country is required' })}
                        className="block w-full pl-10 pr-10 py-3 dark:bg-dark-100 bg-light-50 border dark:border-dark-200 border-light-300 rounded-lg shadow-sm dark:text-white text-dark appearance-none focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                      >
                        <option value="">Select your country</option>
                        {countries.map(c => (
                          <option key={c.code} value={c.name}>{c.name}</option>
                        ))}
                      </select>
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="m6 9 6 6 6-6" />
                        </svg>
                      </div>
                    </div>
                    {errors.country && <p className="mt-1 text-sm text-red-500">{errors.country.message}</p>}
                  </div>

                  {/* Referral ID (optional) */}
                  <div>
                    <label className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-2">
                      Referral ID (Optional)
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Users className="h-5 w-5 dark:text-gray-400 text-gray-500" />
                      </div>
                      <input
                        type="text"
                        {...register('ref_by')}
                        className="block w-full pl-10 pr-3 py-3 dark:bg-dark-100 bg-light-50 border dark:border-dark-200 border-light-300 rounded-lg shadow-sm dark:text-white text-dark focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                        placeholder="Enter referral ID if you have one"
                      />
                    </div>
                  </div>
                </div>

                {/* reCAPTCHA placeholder */}
                <div>
                  <label className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-2">
                    Captcha <span className="text-red-500">*</span>
                  </label>
                  <div className="g-recaptcha" data-sitekey="YOUR_SITE_KEY"></div>
                  <p className="text-xs text-gray-500 mt-1">reCAPTCHA integration – replace with actual widget</p>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex justify-center items-center px-4 py-3 border border-transparent rounded-lg shadow-md text-white bg-primary hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
                  >
                    <UserPlus className="h-5 w-5 mr-2" />
                    <span className="font-medium">Create Account</span>
                  </button>
                </div>
              </form>

              <div className="mt-8 text-center">
                <p className="text-sm dark:text-gray-400 text-gray-600">
                  Already have an account?{' '}
                  <a href="/login" className="font-medium text-primary hover:text-primary-600 transition-colors">
                    Sign in
                  </a>
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <div className="inline-flex items-center text-xs dark:text-gray-500 text-gray-500">
              <Shield className="h-3 w-3 mr-1" />
              <span>Your information is secure – We respect your privacy</span>
            </div>
          </div>
        </div>
      </div>

      {/* Dot pattern background for left panel – add this to global CSS or use inline */}
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

export default Register;