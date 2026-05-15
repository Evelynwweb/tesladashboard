import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Wallet, ArrowUpRight, Clock, Info } from 'lucide-react';
import toast from 'react-hot-toast';

// Helper to get dynamic label and placeholder based on withdrawal method
const getDetailsConfig = (methodName) => {
  const method = methodName?.toLowerCase() || '';
  if (method.includes('zelle')) {
    return {
      label: 'Zelle Details',
      placeholder: 'Enter your Zelle email or phone number',
      example: 'Example: your@email.com or (123) 456-7890',
    };
  }
  if (method.includes('bank transfer')) {
    return {
      label: 'Bank Transfer Details',
      placeholder: 'Bank Name, Account Number, Account Name, Swift Code',
      example: 'Example: Chase, 123456789, John Doe, CHASUS33',
    };
  }
  if (method.includes('usdt') || method.includes('erc20') || method.includes('trc20')) {
    return {
      label: 'Wallet Address (USDT)',
      placeholder: 'Enter your USDT wallet address',
      example: 'Example: 0x742d35Cc6634C0532925a3b844Bc9e7595f0b...',
    };
  }
  if (method.includes('ethereum')) {
    return {
      label: 'Ethereum Wallet Address',
      placeholder: 'Enter your Ethereum address (0x...)',
      example: 'Example: 0x742d35Cc6634C0532925a3b844Bc9e7595f0b...',
    };
  }
  if (method.includes('bitcoin')) {
    return {
      label: 'Bitcoin Wallet Address',
      placeholder: 'Enter your Bitcoin address',
      example: 'Example: 1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
    };
  }
  return {
    label: 'Withdrawal Details',
    placeholder: 'Enter your payment details',
    example: 'Provide the necessary information to receive your funds',
  };
};

const WithdrawFunds = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { method: selectedMethod } = location.state || {};
  const [amount, setAmount] = useState('');
  const [details, setDetails] = useState('');
  const [wcCode, setWcCode] = useState('');
  const [fee, setFee] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [balance, setBalance] = useState(0); // In real app, fetch from user context/API
  const [submitting, setSubmitting] = useState(false);

  const feePercentage = 10; // 10% fee

  useEffect(() => {
    const amt = parseFloat(amount) || 0;
    const calculatedFee = (amt * feePercentage) / 100;
    setFee(calculatedFee);
    setTotalCost(amt + calculatedFee);
  }, [amount]);

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const isExceedingBalance = totalCost > balance;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount || parseFloat(amount) <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }
    if (isExceedingBalance) {
      toast.error('Insufficient balance to cover amount + fee');
      return;
    }
    if (!details.trim()) {
      toast.error('Please provide your withdrawal details');
      return;
    }
    if (!wcCode.trim()) {
      toast.error('WC code is required');
      return;
    }

    setSubmitting(true);
    // Simulate API call – replace with real POST to /dashboard/completewithdrawal
    setTimeout(() => {
      toast.success('Withdrawal request submitted successfully!');
      setSubmitting(false);
      navigate('/dashboard/withdrawals');
    }, 1500);
  };

  // If no method selected, redirect back
  if (!selectedMethod) {
    navigate('/dashboard/withdrawals');
    return null;
  }

  const { label, placeholder, example } = getDetailsConfig(selectedMethod.name);

  return (
    <div className="p-4 md:p-6 pb-20 md:pb-8 overflow-x-hidden flex-grow">
      {/* Page Header */}
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-3xl -z-10 blur-xl opacity-50" />
        <div className="px-6 py-8 rounded-3xl bg-gradient-to-r from-primary/5 to-secondary/5 backdrop-blur-sm border border-white/10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold dark:text-white text-dark">Withdrawal Details</h1>
              <p className="mt-2 text-base dark:text-gray-300 text-gray-600">
                Complete your withdrawal request
              </p>
            </div>
            <div>
              <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/10 dark:bg-dark-50/50 backdrop-blur-sm border border-white/20 dark:border-dark-200/50">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/20 text-primary">
                  <Wallet className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs dark:text-gray-400 text-gray-500">Current Balance</p>
                  <p className="text-lg font-semibold dark:text-white text-dark">
                    ${balance.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Withdrawal Form Card */}
        <div className="bg-white dark:bg-dark-50 rounded-2xl shadow-xl border border-light-200 dark:border-dark-200/50 overflow-hidden">
          {/* Card Header – Payment Method Chip */}
          <div className="border-b border-light-200 dark:border-dark-200/50">
            <div className="flex items-center px-6 py-4">
              <div className="flex items-center px-4 py-2 bg-secondary-50 dark:bg-secondary-900/30 rounded-full">
                <div className="w-6 h-6 rounded-full bg-secondary-100 dark:bg-secondary-900/30 flex items-center justify-center mr-2">
                  {selectedMethod.icon ? (
                    <img
                      src={selectedMethod.icon}
                      alt={selectedMethod.name}
                      className="w-4 h-4 object-contain"
                    />
                  ) : (
                    <ArrowUpRight className="w-4 h-4 text-secondary-600 dark:text-secondary-400" />
                  )}
                </div>
                <span className="text-sm font-medium text-dark dark:text-white">
                  {selectedMethod.name}
                </span>
              </div>
            </div>
          </div>

          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Amount Input */}
              <div className="space-y-2">
                <label htmlFor="amount" className="text-sm font-medium text-dark dark:text-white">
                  Amount to withdraw
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <span className="text-dark-300 dark:text-light-300">$</span>
                  </div>
                  <input
                    id="amount"
                    type="number"
                    step="0.01"
                    min="0"
                    value={amount}
                    onChange={handleAmountChange}
                    className="block w-full pl-10 pr-20 py-3 text-lg rounded-xl bg-light-100 dark:bg-dark-100 border border-light-200 dark:border-dark-200 focus:ring-2 focus:ring-primary focus:border-transparent text-dark dark:text-white transition-all"
                    placeholder="0.00"
                    required
                  />
                </div>
                {amount && (
                  <div className="text-xs text-dark-300 dark:text-light-300 space-y-1">
                    <div className="flex justify-between">
                      <span>Fee ({feePercentage}%):</span>
                      <span>${fee.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-medium">
                      <span>Total cost:</span>
                      <span className={isExceedingBalance ? 'text-danger' : ''}>
                        ${totalCost.toFixed(2)}
                      </span>
                    </div>
                    {isExceedingBalance && (
                      <p className="text-danger">Amount + fee exceeds your available balance</p>
                    )}
                  </div>
                )}
              </div>

              {/* Dynamic Details Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-dark dark:text-white">{label}</label>
                <textarea
                  rows={4}
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  className="block w-full p-4 text-md rounded-xl bg-light-100 dark:bg-dark-100 border border-light-200 dark:border-dark-200 focus:ring-2 focus:ring-primary focus:border-transparent text-dark dark:text-white transition-all"
                  placeholder={placeholder}
                  required
                />
                <div className="p-3 rounded-lg bg-secondary-50 dark:bg-secondary-900/20 border border-secondary-100 dark:border-secondary-800/30">
                  <div className="flex gap-2">
                    <Info className="w-5 h-5 text-secondary-600 dark:text-secondary-400 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-secondary-700 dark:text-secondary-300">
                        Please enter your necessary details required to receive your payment:
                      </p>
                      <p className="text-xs font-medium text-secondary-700 dark:text-secondary-300 mt-1">
                        {example}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* WC Code Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-dark dark:text-white">WC Code</label>
                <input
                  type="text"
                  value={wcCode}
                  onChange={(e) => setWcCode(e.target.value)}
                  className="block w-full pl-4 pr-4 py-3 text-md rounded-xl bg-light-100 dark:bg-dark-100 border border-light-200 dark:border-dark-200 focus:ring-2 focus:ring-primary focus:border-transparent text-dark dark:text-white font-mono transition-all"
                  placeholder="Enter your withdrawal confirmation code"
                  required
                />
                <p className="mt-2 text-xs text-dark-300 dark:text-light-300">
                  Please input your withdrawal confirmation code or contact support to purchase a code.
                </p>
              </div>

              {/* Estimated Processing Time */}
              <div className="flex items-center p-4 rounded-xl bg-light-50 dark:bg-dark-100 border border-light-200 dark:border-dark-200 gap-3">
                <div className="w-10 h-10 rounded-full bg-tertiary-50 dark:bg-tertiary-900/30 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-tertiary-600 dark:text-tertiary-400" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-dark dark:text-white">Estimated processing time</h3>
                  <p className="text-xs text-dark-300 dark:text-light-300">
                    Your withdrawal will be processed within 15–30 minutes.
                  </p>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={submitting || isExceedingBalance || !amount}
                  className="w-full py-4 px-4 rounded-xl bg-gradient-to-r from-primary to-secondary hover:from-primary-600 hover:to-secondary-600 text-white font-medium flex items-center justify-center gap-2 transform transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ArrowUpRight className="w-5 h-5" />
                  <span>{submitting ? 'Submitting...' : 'Complete Withdrawal Request'}</span>
                </button>
                <p className="mt-3 text-center text-xs text-dark-300 dark:text-light-300">
                  By proceeding, you confirm that the provided information is correct
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WithdrawFunds;