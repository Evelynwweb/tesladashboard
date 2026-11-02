import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Copy, CheckCircle, Upload, ArrowLeft, X } from 'lucide-react';
import toast from 'react-hot-toast';

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'application/pdf'];
const MAX_FILE_SIZE = 5 * 1024 * 1024;

const DepositPayment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { method: initialMethod, amount } = location.state || {};

  const [method, setMethod] = useState(initialMethod || null);
  const [amountValue, setAmountValue] = useState(amount ? Number(amount) : null);
  const [proofFile, setProofFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);

  // Redirect if invalid
  useEffect(() => {
    if (!initialMethod || !amount) {
      toast.error('Invalid payment request');
      navigate('/dashboard/deposits', { replace: true });
    }
  }, [initialMethod, amount, navigate]);

  // Re-validate method from the server (state is client-editable / lost on refresh)
  useEffect(() => {
    if (!initialMethod?.id) return;

    let cancelled = false;
    const refetch = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/user/deposit-methods`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        if (!res.ok) return;
        const data = await res.json();
        const fresh = Array.isArray(data)
          ? data.find((m) => String(m.id) === String(initialMethod.id))
          : null;
        if (!cancelled) {
          if (fresh) {
            setMethod(fresh);
            setAmountValue(amount ? Number(amount) : null);
          } else {
            toast.error('This payment method is no longer available');
            navigate('/dashboard/deposits', { replace: true });
          }
        }
      } catch (err) {
        console.error(err);
      }
    };
    refetch();

    return () => { cancelled = true; };
  }, [initialMethod?.id, amount, navigate]);

  if (!initialMethod || !amount) return null;

  const copyToClipboard = async (text) => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success('Address copied!');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error(err);
      toast.error('Failed to copy');
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!ALLOWED_TYPES.includes(file.type)) {
      toast.error('Only JPG, PNG, or PDF files are allowed');
      e.target.value = '';
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      toast.error('File must be less than 5MB');
      e.target.value = '';
      return;
    }
    setProofFile(file);
  };

  const clearFile = () => {
    setProofFile(null);
    const input = document.getElementById('proof-upload');
    if (input) input.value = '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!method) {
      toast.error('Payment method unavailable');
      return;
    }
    if (!proofFile) {
      toast.error('Please upload payment proof');
      return;
    }

    setSubmitting(true);

    const formData = new FormData();
    formData.append('amount', amountValue);
    formData.append('payment_method', method.id);
    formData.append('proof', proofFile);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/deposits`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          // Do NOT set Content-Type — the browser sets multipart boundary
        },
        body: formData,
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok) {
        toast.success('Deposit request submitted!');
        navigate('/dashboard/accounthistory', { replace: true });
      } else {
        toast.error(data.message || `Submission failed (${res.status})`);
      }
    } catch (err) {
      console.error(err);
      toast.error('Network error — please try again');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-4 md:p-6 pb-20 md:pb-8 overflow-x-hidden flex-grow">
      {/* Header */}
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-3xl -z-10 blur-xl opacity-50" />
        <div className="px-6 py-8 rounded-3xl bg-gradient-to-r from-primary/5 to-secondary/5 backdrop-blur-sm border border-white/10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold dark:text-white text-dark">Complete Payment</h1>
              <p className="mt-2 text-base dark:text-gray-300 text-gray-600">
                Send exactly <span className="font-semibold">${Number(amountValue).toFixed(2)}</span> using {method?.name ?? initialMethod.name}
              </p>
            </div>
            <button
              type="button"
              onClick={() => navigate('/dashboard/deposits')}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 dark:bg-dark-50/50 backdrop-blur-sm border border-white/20"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="rounded-2xl overflow-hidden bg-white dark:bg-dark-50 shadow-xl border border-light-200 dark:border-dark-200/50">
          {/* Payment Method Header */}
          <div className="p-6 border-b border-light-200 dark:border-dark-200/50">
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent-100 dark:bg-accent-900/30 flex items-center justify-center">
                {method?.icon && <img src={method.icon} className="w-6 h-6 object-contain" alt="" />}
              </div>
              <div>
                <p className="text-sm text-dark-300 dark:text-light-300">Selected payment method</p>
                <p className="text-lg font-semibold text-dark dark:text-white">{method?.name ?? initialMethod.name}</p>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="mb-8">
              <div className="mb-4 text-center p-4 rounded-xl bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-dark-100 dark:to-dark-200">
                <p className="text-dark dark:text-white">
                  You are to make a payment of{' '}
                  <span className="font-bold">${Number(amountValue).toFixed(2)}</span> using{' '}
                  {method?.name ?? initialMethod.name}.
                </p>
              </div>
              {method?.icon && (
                <div className="my-6 flex justify-center">
                  <div className="p-4 rounded-xl bg-white dark:bg-dark-100 shadow-md inline-block">
                    <img src={method.icon} alt="" className="h-16 object-contain" />
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-6">
              {method?.address ? (
                <div className="space-y-2 mb-6">
                  <h3 className="text-lg font-semibold text-dark dark:text-white">
                    {method.name} Address:
                  </h3>
                  <div className="relative">
                    <input
                      type="text"
                      readOnly
                      value={method.address}
                      className="w-full py-3 pl-4 pr-12 rounded-xl bg-light-100 dark:bg-dark-100 border border-light-200 dark:border-dark-200 text-dark dark:text-white focus:ring-2 focus:ring-primary font-mono text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => copyToClipboard(method.address)}
                      aria-label="Copy address"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-primary/10 dark:bg-primary/20 text-primary hover:bg-primary/20 transition-all"
                    >
                      {copied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </button>
                  </div>
                  {method.network && (
                    <p className="text-sm text-dark-300 dark:text-light-300">
                      <span className="font-semibold">Network:</span> {method.network}
                    </p>
                  )}
                </div>
              ) : (
                <div className="mb-6 p-4 rounded-xl bg-tertiary-50 dark:bg-tertiary-900/20 border border-tertiary-100 dark:border-tertiary-800/30 text-sm text-tertiary-700 dark:text-tertiary-300">
                  Payment instructions for this method will be sent to you. Upload your proof of payment below once complete.
                </div>
              )}
            </div>

            {/* File Upload Section */}
            <div className="mt-8 border-t border-light-200 dark:border-dark-200 pt-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="proof-upload" className="block text-sm font-medium text-dark dark:text-white">
                    Upload payment proof after sending
                  </label>
                  <input
                    id="proof-upload"
                    type="file"
                    name="proof"
                    onChange={handleFileChange}
                    accept={ALLOWED_TYPES.join(',')}
                    className="block w-full text-sm text-dark dark:text-white
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-full file:border-0
                      file:text-sm file:font-semibold
                      file:bg-primary-50 file:text-primary-700
                      dark:file:bg-primary-900/30 dark:file:text-primary-300
                      hover:file:bg-primary-100 dark:hover:file:bg-primary-800/40
                      cursor-pointer focus:outline-none"
                  />
                  {proofFile && (
                    <div className="flex items-center justify-between text-xs px-3 py-2 rounded-lg bg-light-100 dark:bg-dark-100 border border-light-200 dark:border-dark-200">
                      <span className="truncate dark:text-white text-dark">{proofFile.name}</span>
                      <button
                        type="button"
                        onClick={clearFile}
                        aria-label="Remove selected file"
                        className="ml-3 text-dark-300 dark:text-light-300 hover:text-danger flex items-center"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                  <p className="text-xs text-dark-300 dark:text-light-300">
                    Accepted formats: JPG, PNG, PDF (Max 5MB)
                  </p>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={submitting || !proofFile}
                    className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-primary to-secondary hover:from-primary-600 hover:to-secondary-600 text-white font-medium flex items-center justify-center gap-2 transition-all duration-300 hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    {submitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Upload className="h-5 w-5" />
                        Submit Payment
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepositPayment;