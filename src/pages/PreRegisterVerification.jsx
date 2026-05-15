import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Shield, Key, CheckCircle, Mail } from 'lucide-react';
import toast from 'react-hot-toast';
import { useTheme } from '../context/ThemeContext';

const PreRegisterVerification = () => {
  const { dark, toggleDark } = useTheme();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const [email, setEmail] = useState('');
  const [codeSent, setCodeSent] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('');
  const [loadingCode, setLoadingCode] = useState(false);

  const requestCode = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }
    setLoadingCode(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/verify-code`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setGeneratedCode(data.devCode);
      setCodeSent(true);
      toast.success('Verification code sent to your email');
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoadingCode(false);
    }
  };

  const onSubmit = async (data) => {
    if (!email) {
      toast.error('Email is missing');
      return;
    }
    try {
      const res = await fetch('http://localhost:5000/api/verify-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code: data.code })
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.message);
      localStorage.setItem('tempToken', result.tempToken);
      toast.success('Code verified! Redirecting to registration...');
      window.location.href = '/register';
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-light-100 dark:bg-dark transition-colors duration-200 flex flex-col items-center justify-center p-4">
      <div className="fixed top-4 right-4 z-50">
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
            <h2 className="text-xl font-bold dark:text-white text-dark">Verification Required</h2>
            <p className="mt-1 text-sm dark:text-gray-400 text-gray-600">Please confirm you are not a robot</p>
          </div>
          <div className="p-6 md:p-8">
            {!codeSent ? (
              <form onSubmit={requestCode} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 dark:text-gray-400 text-gray-500" />
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="block w-full pl-10 pr-3 py-3 dark:bg-dark-100 bg-light-50 border dark:border-dark-200 border-light-300 rounded-lg shadow-sm dark:text-white text-dark focus:outline-none focus:ring-2 focus:ring-primary/50"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={loadingCode}
                  className="w-full flex justify-center items-center px-4 py-3 rounded-lg shadow-md text-white bg-primary hover:bg-primary-600 disabled:opacity-50"
                >
                  {loadingCode ? 'Sending...' : 'Send Verification Code'}
                </button>
              </form>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-2">
                    Verification Code
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={generatedCode}
                      disabled
                      className="block w-full py-3 px-4 text-center font-bold text-lg dark:bg-primary/10 bg-primary/5 border-0 dark:text-primary text-primary rounded-lg shadow-sm"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="code" className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-2">
                    Enter Code <span className="text-red-500">*</span>
                  </label>
                  <div className="relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Key className="h-5 w-5 dark:text-gray-400 text-gray-500" />
                    </div>
                    <input
                      id="code"
                      type="number"
                      {...register('code', { required: 'Verification code is required' })}
                      className="block w-full pl-10 pr-3 py-3 dark:bg-dark-100 bg-light-50 border dark:border-dark-200 border-light-300 rounded-lg shadow-sm dark:text-white text-dark focus:outline-none focus:ring-2 focus:ring-primary/50"
                      placeholder="Enter the code shown above"
                    />
                  </div>
                  {errors.code && <p className="mt-1 text-sm text-red-500">{errors.code.message}</p>}
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex justify-center items-center px-4 py-3 rounded-lg shadow-md text-white bg-primary hover:bg-primary-600"
                >
                  <CheckCircle className="h-5 w-5 mr-2" />
                  <span className="font-medium">Verify Code</span>
                </button>
              </form>
            )}
          </div>
        </div>
        <div className="mt-8 text-center">
          <div className="inline-flex items-center text-xs dark:text-gray-500 text-gray-500">
            <Shield className="h-3 w-3 mr-1" />
            <span>Secure verification – User protection is our priority</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreRegisterVerification;