import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Wallet, Shield, Clock, CheckCircle, CircleCheckBig, History } from 'lucide-react';
import { Link } from 'react-router-dom';

const Deposits = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [selectedMethodObj, setSelectedMethodObj] = useState(null);
  const [userBalance, setUserBalance] = useState(0);
  const [loadingBalance, setLoadingBalance] = useState(true);

  const navigate = useNavigate();

  // Fetch current user balance
  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/dashboard`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        const data = await res.json();
        if (res.ok) {
          setUserBalance(data.user.balance);
        } else {
          toast.error('Could not load balance');
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingBalance(false);
      }
    };
    fetchBalance();
  }, []);

  // Fetch deposit methods from the new user endpoint
  useEffect(() => {
    const fetchMethods = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/user/deposit-methods`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        if (res.ok) {
          const data = await res.json();
          setPaymentMethods(data);
        } else {
          toast.error('Failed to load deposit methods');
        }
      } catch (err) {
        toast.error('Error loading methods');
      }
    };
    fetchMethods();
  }, []);

  const selectMethod = (method) => {
    setSelectedMethod(method.id);
    setSelectedMethodObj(method);
    toast.success(`You have chosen to pay with ${method.name}`);
  };

  const resetMethod = () => {
    setSelectedMethod(null);
    setSelectedMethodObj(null);
  };

  const onSubmit = async (data) => {
    if (!selectedMethod) {
      toast.error('Please choose a payment method');
      return;
    }
    // Navigate to payment details page with method and amount
    navigate('/dashboard/deposit-payment', {
      state: {
        method: selectedMethodObj,   // contains id, name, icon, address, network
        amount: data.amount,
      }
    });
  };

  return (
    <div className="p-4 md:p-6 pb-20 md:pb-8 overflow-x-hidden flex-grow">
      {/* Page Header - unchanged */}
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-3xl -z-10 blur-xl opacity-50" />
        <div className="px-6 py-8 rounded-3xl bg-gradient-to-r from-primary/5 to-secondary/5 backdrop-blur-sm border border-white/10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold dark:text-white text-dark">Fund Your Account</h1>
              <p className="mt-2 text-base dark:text-gray-300 text-gray-600">Add funds to your account to start investing or trading</p>
            </div>
            <div>
              <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/10 dark:bg-dark-50/50 backdrop-blur-sm border border-white/20 dark:border-dark-200/50">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/20 text-primary">
                  <Wallet className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs dark:text-gray-400 text-gray-500">Current Balance</p>
                  <p className="text-lg font-semibold dark:text-white text-dark">
                    {loadingBalance ? '...' : `$${userBalance.toFixed(2)}`}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Deposit Form Card */}
      <div className="mt-6 bg-white dark:bg-dark-50 rounded-xl shadow-sm border border-light-200 dark:border-dark-200/50 overflow-hidden">
        <div className="p-5 border-b border-light-200 dark:border-dark-200/50">
          <h2 className="text-base font-bold dark:text-white text-dark flex items-center">
            <svg className="w-5 h-5 mr-2 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M9.5 13.7502C9.5 14.7202 10.25 15.5002 11.17 15.5002H13.05C13.85 15.5002 14.5 14.8202 14.5 13.9702C14.5 13.0602 14.1 12.7302 13.51 12.5202L10.5 11.4702C9.91 11.2602 9.51 10.9402 9.51 10.0202C9.51 9.18023 10.16 8.49023 10.96 8.49023H12.84C13.76 8.49023 14.51 9.27023 14.51 10.2402" />
              <path d="M12 7.5V16.5" />
              <path d="M22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2" />
            </svg>
            Deposit Details
          </h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          <div className="space-y-2">
            <label htmlFor="amount" className="text-sm font-medium dark:text-white text-dark">Amount to deposit</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <span className="text-dark-300 dark:text-light-300">$</span>
              </div>
              <input
                id="amount"
                type="number"
                step="any"
                min="50"
                {...register('amount', { required: 'Amount is required', min: 50 })}
                className="block w-full pl-10 pr-12 py-3 text-lg rounded-xl bg-light-100 dark:bg-dark-100 border border-light-200 dark:border-dark-200 focus:ring-2 focus:ring-primary focus:border-transparent dark:text-white text-dark transition-all"
                placeholder="0.00"
              />
            </div>
            {errors.amount && <p className="text-sm text-danger">{errors.amount.message}</p>}
          </div>

          {/* Payment Methods Table - dynamic */}
          <div className="bg-white dark:bg-dark-50 rounded-xl shadow-sm border border-light-200 dark:border-dark-200/50 overflow-hidden">
            <div className="p-5 border-b border-light-200 dark:border-dark-200/50">
              <h2 className="text-base font-bold dark:text-white text-dark">Select Deposit Method</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-light-50 dark:bg-dark-100 text-dark-300 dark:text-light-300 text-xs uppercase">
                  <tr>
                    <th className="px-6 py-3 text-left font-medium">Method</th>
                    <th className="px-6 py-3 text-right font-medium">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-light-200 dark:divide-dark-200/50">
                  {paymentMethods.map(method => (
                    <tr key={method.id} className="hover:bg-light-50 dark:hover:bg-dark-100/50 transition-colors text-sm">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          {method.icon && (
                            <div className="w-8 h-8 rounded-lg bg-light-100 dark:bg-dark-200 p-1.5 mr-3 flex items-center justify-center">
                              <img src={method.icon} alt={method.name} className="h-full w-full object-contain" />
                            </div>
                          )}
                          <p className="font-medium dark:text-white text-dark">{method.name}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          type="button"
                          onClick={() => selectMethod(method)}
                          className="px-3 py-1.5 text-xs font-medium rounded-md bg-primary text-white hover:bg-primary-600 transition-colors"
                        >
                          Select
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {paymentMethods.length === 0 && (
                <p className="text-center py-6 text-gray-500">No deposit methods available. Please contact support.</p>
              )}
            </div>
          </div>

          {selectedMethodObj && (
            <div className="p-4 rounded-xl bg-light-50 dark:bg-dark-100 border border-light-200 dark:border-dark-200 flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-lg bg-primary-50 dark:bg-primary-900/30 p-2 mr-3 flex items-center justify-center">
                  {selectedMethodObj.icon && <img src={selectedMethodObj.icon} alt="" className="h-full w-full object-contain" />}
                </div>
                <div>
                  <p className="text-sm text-dark-300 dark:text-light-300">Selected Method</p>
                  <p className="text-base font-medium dark:text-white text-dark">{selectedMethodObj.name}</p>
                </div>
              </div>
              <button type="button" onClick={resetMethod} className="text-xs text-primary dark:text-primary-400 hover:underline">
                Change
              </button>
            </div>
          )}

          <div className="pt-4">
            <button
              type="submit"
              disabled={!selectedMethod}
              className="w-full py-4 px-4 rounded-xl bg-gradient-to-r from-primary to-secondary hover:from-primary-600 hover:to-secondary-600 text-white font-medium flex items-center justify-center gap-2 transform transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M9.5 13.7502C9.5 14.7202 10.25 15.5002 11.17 15.5002H13.05C13.85 15.5002 14.5 14.8202 14.5 13.9702C14.5 13.0602 14.1 12.7302 13.51 12.5202L10.5 11.4702C9.91 11.2602 9.51 10.9402 9.51 10.0202C9.51 9.18023 10.16 8.49023 10.96 8.49023H12.84C13.76 8.49023 14.51 9.27023 14.51 10.2402" />
                <path d="M12 7.5V16.5" />
                <path d="M22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2" />
              </svg>
              <span>Proceed to Payment</span>
            </button>
            <p className="mt-3 text-center text-xs text-dark-300 dark:text-light-300">
              By proceeding, you agree to our terms of service
            </p>
          </div>
        </form>
      </div>

      {/* Info Cards (same as before, keep them) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {/* Deposit Process */}
        <div className="bg-white dark:bg-dark-50 rounded-xl shadow-sm border border-light-200 dark:border-dark-200/50 overflow-hidden">
          <div className="p-4 border-b border-light-200 dark:border-dark-200/50 flex items-center">
            <CheckCircle className="w-5 h-5 text-primary mr-2" />
            <h3 className="text-base font-medium dark:text-white text-dark">Deposit Process</h3>
          </div>
          <div className="p-5">
            <ol className="relative border-l border-light-200 dark:border-dark-200 ml-3 space-y-6">
              <li className="ml-6">
                <span className="absolute flex items-center justify-center w-6 h-6 bg-primary-50 dark:bg-primary-900/30 rounded-full -left-3 ring-4 ring-white dark:ring-dark-50">
                  <span className="text-xs font-bold text-primary-600 dark:text-primary-400">1</span>
                </span>
                <h3 className="font-medium dark:text-white text-dark">Select Method</h3>
                <p className="text-xs text-dark-300 dark:text-light-300 mt-1">Choose your preferred deposit method from the available options.</p>
              </li>
              <li className="ml-6">
                <span className="absolute flex items-center justify-center w-6 h-6 bg-primary-50 dark:bg-primary-900/30 rounded-full -left-3 ring-4 ring-white dark:ring-dark-50">
                  <span className="text-xs font-bold text-primary-600 dark:text-primary-400">2</span>
                </span>
                <h3 className="font-medium dark:text-white text-dark">Enter Amount</h3>
                <p className="text-xs text-dark-300 dark:text-light-300 mt-1">Specify the amount you wish to deposit to your account.</p>
              </li>
              <li className="ml-6">
                <span className="absolute flex items-center justify-center w-6 h-6 bg-primary-50 dark:bg-primary-900/30 rounded-full -left-3 ring-4 ring-white dark:ring-dark-50">
                  <span className="text-xs font-bold text-primary-600 dark:text-primary-400">3</span>
                </span>
                <h3 className="font-medium dark:text-white text-dark">Complete Payment</h3>
                <p className="text-xs text-dark-300 dark:text-light-300 mt-1">Follow the instructions to complete your deposit through the selected method.</p>
              </li>
              <li className="ml-6">
                <span className="absolute flex items-center justify-center w-6 h-6 bg-primary-50 dark:bg-primary-900/30 rounded-full -left-3 ring-4 ring-white dark:ring-dark-50">
                  <span className="text-xs font-bold text-primary-600 dark:text-primary-400">4</span>
                </span>
                <h3 className="font-medium dark:text-white text-dark">Confirmation</h3>
                <p className="text-xs text-dark-300 dark:text-light-300 mt-1">Your deposit will be confirmed and credited to your account.</p>
              </li>
            </ol>
          </div>
        </div>

        {/* Security Tips */}
        <div className="bg-white dark:bg-dark-50 rounded-xl shadow-sm border border-light-200 dark:border-dark-200/50 overflow-hidden">
          <div className="p-4 border-b border-light-200 dark:border-dark-200/50 flex items-center">
            <Shield className="w-5 h-5 text-accent mr-2" />
            <h3 className="text-base font-medium dark:text-white text-dark">Security Tips</h3>
          </div>
          <div className="p-5">
            <ul className="space-y-3">
              <li className="flex">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-accent-50 dark:bg-accent-900/30 flex items-center justify-center mr-3 mt-0.5">
                  <svg className="w-3 h-3 text-accent-600 dark:text-accent-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M6 10L10.2 14.2L18 6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <p className="text-xs text-dark-300 dark:text-light-300">Always verify payment details before confirming transactions.</p>
              </li>
              <li className="flex">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-accent-50 dark:bg-accent-900/30 flex items-center justify-center mr-3 mt-0.5">
                  <svg className="w-3 h-3 text-accent-600 dark:text-accent-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M6 10L10.2 14.2L18 6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <p className="text-xs text-dark-300 dark:text-light-300">Use secure and private internet connections when making deposits.</p>
              </li>
              <li className="flex">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-accent-50 dark:bg-accent-900/30 flex items-center justify-center mr-3 mt-0.5">
                  <svg className="w-3 h-3 text-accent-600 dark:text-accent-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M6 10L10.2 14.2L18 6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <p className="text-xs text-dark-300 dark:text-light-300">For crypto deposits, double-check the network type to avoid loss of funds.</p>
              </li>
              <li className="flex">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-accent-50 dark:bg-accent-900/30 flex items-center justify-center mr-3 mt-0.5">
                  <svg className="w-3 h-3 text-accent-600 dark:text-accent-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M6 10L10.2 14.2L18 6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <p className="text-xs text-dark-300 dark:text-light-300">Never share your payment credentials with anyone.</p>
              </li>
            </ul>
            <div className="mt-5 pt-4 border-t border-light-200 dark:border-dark-200/50">
              <div className="flex items-center p-3 rounded-lg bg-tertiary-50 dark:bg-tertiary-900/20 border border-tertiary-100 dark:border-tertiary-800/30">
                <Clock className="w-5 h-5 text-tertiary-600 dark:text-tertiary-400 mr-3 flex-shrink-0" />
                <p className="text-xs text-tertiary-700 dark:text-tertiary-300">
                  Need help with your deposit? Contact our support team via the help center.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Deposit Stats */}
        <div className="bg-white dark:bg-dark-50 rounded-xl shadow-sm border border-light-200 dark:border-dark-200/50 overflow-hidden">
          <div className="p-6">
            <h3 className="text-lg font-medium dark:text-white text-dark mb-4">Deposit Summary</h3>
            <div className="bg-light-200 dark:bg-dark-100 rounded-lg p-4 mb-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Deposited</p>
                  <p className="text-2xl font-bold dark:text-white text-dark">$0.00</p>
                </div>
                <div className="h-14 w-14 rounded-full bg-tertiary/10 flex items-center justify-center">
                  <CircleCheckBig className="h-6 w-6 text-tertiary" />
                </div>
              </div>
            </div>
            <div className="bg-light-200 dark:bg-dark-100 rounded-lg p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Pending Deposits</p>
                  <p className="text-2xl font-bold dark:text-white text-dark">$0.00</p>
                </div>
                <div className="h-14 w-14 rounded-full bg-tertiary/10 flex items-center justify-center">
                  <History className="h-6 w-6 text-tertiary" />
                </div>
              </div>
            </div>
            <div className="mt-6">
              <Link to="/dashboard/accounthistory" className="flex items-center justify-center py-2 px-4 bg-light-200 dark:bg-dark-100 rounded-lg hover:bg-light-300 dark:hover:bg-dark-200 transition-colors">
                <History className="h-4 w-4 mr-2" />
                <span>View Deposit History</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Deposits;