// pages/DepositPayment.jsx
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Wallet, Copy, CheckCircle, Upload, AlertCircle, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';

// You should fetch real wallet addresses from your backend based on methodId
// For demo, we use a mapping (replace with actual API call)
const methodWalletMap = {
  '22': { address: '0xcd68e1adf3725725d4e8b6018a0cd325c49188a2', network: 'ERC20' },
  '17': { address: 'TXhhjkhjkdhjkdhjkhjkdhjkdhjkdhjkd', network: 'TRC20' },
  '2': { address: '0x742d35Cc6634C0532925a3b844Bc9e7595f0b', network: 'ERC20' },
  '1': { address: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa', network: 'Bitcoin' },
};

const DepositPayment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { methodId, methodName, amount, methodIcon } = location.state || {};
  const [proofFile, setProofFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!methodId || !amount) {
      toast.error('Invalid payment request');
      navigate('/dashboard/deposits');
    }
  }, [methodId, amount, navigate]);

  const walletInfo = methodWalletMap[methodId] || { address: 'Please contact support', network: 'N/A' };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success('Address copied!');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error('Failed to copy');
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      toast.error('File must be less than 5MB');
      return;
    }
    const allowed = ['image/jpeg', 'image/png', 'application/pdf'];
    if (!allowed.includes(file.type)) {
      toast.error('Only JPG, PNG, or PDF');
      return;
    }
    setProofFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!proofFile) {
      toast.error('Please upload payment proof');
      return;
    }
    setSubmitting(true);
    const formData = new FormData();
    formData.append('amount', amount);
    formData.append('payment_method_id', methodId);
    formData.append('proof', proofFile);
    // Add CSRF token if needed
    // formData.append('_token', csrfToken);

    try {
      const res = await fetch('http://localhost:5000/api/deposits', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          // Do NOT set Content-Type when using FormData, browser will set boundary
        },
        body: formData,
      });
      const data = await res.json();
      if (res.ok) {
        toast.success('Deposit request submitted!');
        navigate('/dashboard/accounthistory');
      } else {
        toast.error(data.message || 'Submission failed');
      }
    } catch (err) {
      toast.error('Network error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-4 md:p-6 pb-20 md:pb-8 overflow-x-hidden flex-grow">
      {/* Header similar to Deposits page */}
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-3xl -z-10 blur-xl opacity-50" />
        <div className="px-6 py-8 rounded-3xl bg-gradient-to-r from-primary/5 to-secondary/5 backdrop-blur-sm border border-white/10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold dark:text-white text-dark">Complete Payment</h1>
              <p className="mt-2 text-base dark:text-gray-300 text-gray-600">
                Send exactly <span className="font-semibold">${amount}</span> using {methodName}
              </p>
            </div>
            <button
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
                {methodIcon && <img src={methodIcon} className="w-6 h-6 object-contain" alt="" />}
              </div>
              <div>
                <p className="text-sm text-dark-300 dark:text-light-300">Selected payment method</p>
                <p className="text-lg font-semibold text-dark dark:text-white">{methodName}</p>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="mb-8">
              <div className="mb-4 text-center p-4 rounded-xl bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-dark-100 dark:to-dark-200">
                <p className="text-dark dark:text-white">
                  You are to make a payment of <span className="font-bold">${amount}</span> using {methodName}.
                </p>
              </div>
              <div className="my-6 flex justify-center">
                <div className="p-4 rounded-xl bg-white dark:bg-dark-100 shadow-md inline-block">
                  <img src={methodIcon || '/images/usdt.png'} alt={methodName} className="h-16 object-contain" />
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-2 mb-6">
                <h3 className="text-lg font-semibold text-dark dark:text-white">
                  {methodName} Address:
                </h3>
                <div className="relative">
                  <input
                    type="text"
                    readOnly
                    value={walletInfo.address}
                    className="w-full py-3 pl-4 pr-12 rounded-xl bg-light-100 dark:bg-dark-100 border border-light-200 dark:border-dark-200 text-dark dark:text-white focus:ring-2 focus:ring-primary font-mono text-sm"
                  />
                  <button
                    onClick={() => copyToClipboard(walletInfo.address)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-primary/10 dark:bg-primary/20 text-primary hover:bg-primary/20 transition-all"
                  >
                    {copied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </button>
                </div>
                <p className="text-sm text-dark-300 dark:text-light-300">
                  <span className="font-semibold">Network:</span> {walletInfo.network}
                </p>
              </div>
            </div>

            {/* File Upload Section */}
            <div className="mt-8 border-t border-light-200 dark:border-dark-200 pt-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-dark dark:text-white">
                    Upload payment proof after sending
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      name="proof"
                      onChange={handleFileChange}
                      accept="image/jpeg,image/png,application/pdf"
                      className="block w-full text-sm text-dark dark:text-white
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-full file:border-0
                        file:text-sm file:font-semibold
                        file:bg-primary-50 file:text-primary-700
                        dark:file:bg-primary-900/30 dark:file:text-primary-300
                        hover:file:bg-primary-100 dark:hover:file:bg-primary-800/40
                        cursor-pointer focus:outline-none"
                      required
                    />
                  </div>
                  <p className="text-xs text-dark-300 dark:text-light-300">
                    Accepted formats: JPG, PNG, PDF (Max 5MB)
                  </p>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-primary to-secondary hover:from-primary-600 hover:to-secondary-600 text-white font-medium flex items-center justify-center gap-2 transition-all duration-300 hover:scale-105 shadow-lg disabled:opacity-50"
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