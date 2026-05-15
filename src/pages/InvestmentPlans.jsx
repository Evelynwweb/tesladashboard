import { useState, useEffect } from 'react';
import { Wallet } from 'lucide-react';
import toast from 'react-hot-toast';

// SVG icon for the "Invest" button (copied directly from the original HTML)
const InvestButtonIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
    <path d="M9.5 13.7502C9.5 14.7202 10.25 15.5002 11.17 15.5002H13.05C13.85 15.5002 14.5 14.8202 14.5 13.9702C14.5 13.0602 14.1 12.7302 13.51 12.5202L10.5 11.4702C9.91 11.2602 9.51 10.9402 9.51 10.0202C9.51 9.18023 10.16 8.49023 10.96 8.49023H12.84C13.76 8.49023 14.51 9.27023 14.51 10.2402" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 7.5V16.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Investment plans data extracted from the original HTML
const InvestmentPlans = () => {
  const [plans, setPlans] = useState([]);
  const [amounts, setAmounts] = useState({});
  const [loading, setLoading] = useState({});
  const [plansLoading, setPlansLoading] = useState(true);
  const [userBalance, setUserBalance] = useState(0);

  const API_URL = import.meta.env.VITE_API_URL; // from .env

  // Fetch plans and balance on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch investment plans
        const plansRes = await fetch(`${API_URL}/investment-plans`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        const plansData = await plansRes.json();
        if (plansRes.ok) {
          setPlans(plansData);
        } else {
          toast.error('Could not load investment plans');
        }

        // Fetch user balance (reuse same endpoint as dashboard)
        const balanceRes = await fetch(`${API_URL}/dashboard`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        const balanceData = await balanceRes.json();
        if (balanceRes.ok) {
          setUserBalance(balanceData.user.balance);
        }
      } catch (err) {
        console.error(err);
        toast.error('Failed to load data');
      } finally {
        setPlansLoading(false);
      }
    };
    fetchData();
  }, [API_URL]);

  const handleAmountChange = (planId, value) => {
    setAmounts(prev => ({ ...prev, [planId]: value }));
  };

  const handleInvest = async (plan, e) => {
    e.preventDefault();
    const amount = amounts[plan.id];
    if (!amount || amount < plan.min_amount || amount > plan.max_amount) {
      toast.error(`Amount must be between $${plan.min_amount.toLocaleString()} and $${plan.max_amount.toLocaleString()}`);
      return;
    }
    if (amount > userBalance) {
      toast.error('Insufficient balance. Please deposit first.');
      return;
    }

    setLoading(prev => ({ ...prev, [plan.id]: true }));
    try {
      const res = await fetch(`${API_URL}/join-plan`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          planId: plan.id,       
          planName: plan.name,
          amount: amount,
          duration: plan.duration
        })
      });
      const data = await res.json();
      if (res.ok) {
        toast.success(`Successfully invested $${amount} in ${plan.name}`);
        // Update balance after investment
        setUserBalance(prev => prev - amount);
        setAmounts(prev => ({ ...prev, [plan.id]: '' }));
      } else {
        toast.error(data.message || 'Investment failed');
      }
    } catch (err) {
      toast.error('Network error');
    } finally {
      setLoading(prev => ({ ...prev, [plan.id]: false }));
    }
  };

  if (plansLoading) {
    return (
      <div className="p-4 md:p-6 flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 pb-20 md:pb-8 overflow-x-hidden flex-grow">
      {/* Page Header – similar to original but with real balance */}
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-3xl -z-10 blur-xl opacity-50" />
        <div className="px-6 py-8 rounded-3xl bg-gradient-to-r from-primary/5 to-secondary/5 backdrop-blur-sm border border-white/10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold dark:text-white text-dark">Investment Hub</h1>
              <p className="mt-2 text-base dark:text-gray-300 text-gray-600">
                Grow your wealth with our curated investment plans
              </p>
            </div>
            <div>
              <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/10 dark:bg-dark-50/50 backdrop-blur-sm border border-white/20 dark:border-dark-200/50">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/20 text-primary">
                  <Wallet className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs dark:text-gray-400 text-gray-500">Your Balance</p>
                  <p className="text-lg font-semibold dark:text-white text-dark">
                    ${userBalance.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Plans Grid – now using fetched plans */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div key={plan.id} className="text-center bg-white dark:bg-dark-50 rounded-xl shadow-sm border border-light-200 dark:border-dark-200/50 overflow-hidden">
            <div className="p-4 border-b border-light-200 dark:border-dark-200/50 flex justify-center">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 dark:bg-primary/10">
                <span className="text-xs font-medium text-primary">{plan.name}</span>
              </div>
            </div>
            <ul className="my-3 space-y-2">
              <li className="mb-2">
                <small className="text-gray-500 dark:text-gray-400">Min. Investment</small>
                <h6 className="text-base text-dark dark:text-white">${plan.min_amount.toLocaleString()}</h6>
              </li>
              <li className="mb-2">
                <small className="text-gray-500 dark:text-gray-400">Max. Investment</small>
                <h6 className="text-base text-dark dark:text-white">${plan.max_amount.toLocaleString()}</h6>
              </li>
              <li className="mb-0">
                <small className="text-gray-500 dark:text-gray-400">Duration</small>
                <h6 className="text-base text-dark dark:text-white">{plan.duration}</h6>
              </li>
            </ul>
            <div className="mt-5 px-5 border-t border-light-200 dark:border-dark-200/50 pt-4 pb-5">
              <form onSubmit={(e) => handleInvest(plan, e)}>
                <label className="text-sm font-medium text-dark dark:text-white">Amount to Invest</label>
                <div className="relative mt-3">
                  <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                    <span className="text-dark-300 dark:text-light-300">$</span>
                  </div>
                  <input
                    type="number"
                    step="any"
                    min={plan.min_amount}
                    max={plan.max_amount}
                    value={amounts[plan.id] || ''}
                    onChange={(e) => handleAmountChange(plan.id, e.target.value)}
                    className="block w-full pl-10 pr-10 py-3 text-lg rounded-xl bg-light-100 dark:bg-dark-100 border border-light-200 dark:border-dark-200 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="0.00"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading[plan.id]}
                  className="mt-4 mb-0 w-full py-4 px-4 rounded-xl bg-gradient-to-r from-primary to-secondary hover:from-primary-600 hover:to-secondary-600 text-white font-medium flex items-center justify-center gap-2 transform transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <InvestButtonIcon />
                  <span>{loading[plan.id] ? 'Processing...' : 'Invest'}</span>
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InvestmentPlans;