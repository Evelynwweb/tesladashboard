import { useState } from 'react';
import { Wallet } from 'lucide-react';
import toast from 'react-hot-toast';

// Data for the trading bots, extracted from the HTML
const tradingBots = [
  {
    id: 17,
    name: 'Weekly Trading Bot',
    amount: 5000,
    duration: '7 days',
  },
  {
    id: 18,
    name: 'Monthly Trading Bot',
    amount: 10000,
    duration: '30 Days',
  },
  {
    id: 24,
    name: 'Annual Trading Bot',
    amount: 40000,
    duration: '12 Months',
  },
];

// The "Purchase" button SVG icon from the original HTML
const PurchaseButtonIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
    <path
      d="M9.5 13.7502C9.5 14.7202 10.25 15.5002 11.17 15.5002H13.05C13.85 15.5002 14.5 14.8202 14.5 13.9702C14.5 13.0602 14.1 12.7302 13.51 12.5202L10.5 11.4702C9.91 11.2602 9.51 10.9402 9.51 10.0202C9.51 9.18023 10.16 8.49023 10.96 8.49023H12.84C13.76 8.49023 14.51 9.27023 14.51 10.2402"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M12 7.5V16.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const TradingBots = () => {
  const [loading, setLoading] = useState({});

  const handlePurchase = async (bot, e) => {
    e.preventDefault();
    setLoading((prev) => ({ ...prev, [bot.id]: true }));

    // Simulate API call – replace with actual POST to /dashboard/buybot
    setTimeout(() => {
      toast.success(`Successfully purchased ${bot.name}!`);
      setLoading((prev) => ({ ...prev, [bot.id]: false }));
    }, 1000);
  };

  return (
    <div className="p-4 md:p-6 pb-20 md:pb-8 overflow-x-hidden flex-grow">
      {/* Page Header */}
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-3xl -z-10 blur-xl opacity-50" />
        <div className="px-6 py-8 rounded-3xl bg-gradient-to-r from-primary/5 to-secondary/5 backdrop-blur-sm border border-white/10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold dark:text-white text-dark">AI Trading Bots</h1>
              <p className="mt-2 text-base dark:text-gray-300 text-gray-600">
                Grow your wealth with auto-trading AI bots
              </p>
            </div>
            <div>
              <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/10 dark:bg-dark-50/50 backdrop-blur-sm border border-white/20 dark:border-dark-200/50">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/20 text-primary">
                  <Wallet className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs dark:text-gray-400 text-gray-500">Your Balance</p>
                  <p className="text-lg font-semibold dark:text-white text-dark">$0</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 gap-6">
        <div className="space-y-6">
          <div className="rounded-2xl overflow-hidden bg-white dark:bg-dark-50 shadow-xl shadow-primary/5 dark:shadow-primary/10 border border-light-200/50 dark:border-dark-200/50">
            <div className="p-6 border-b border-light-200/50 dark:border-dark-200/50">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <h2 className="text-xl font-semibold dark:text-white text-dark flex items-center">
                  <i className="fas fa-robot mr-2 text-primary"></i>
                  Trading Bots
                </h2>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {tradingBots.map((bot) => (
                  <div
                    key={bot.id}
                    className="text-center bg-white dark:bg-dark-50 rounded-xl shadow-sm border border-light-200 dark:border-dark-200/50 overflow-hidden"
                  >
                    {/* Bot Name Badge */}
                    <div className="p-4 border-b border-light-200 dark:border-dark-200/50 flex justify-center">
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 dark:bg-primary/10">
                        <span className="text-xs font-medium text-primary">{bot.name}</span>
                      </div>
                    </div>

                    {/* Bot Details */}
                    <ul className="my-3 space-y-2">
                      <li className="mb-2">
                        <small className="text-gray-500 dark:text-gray-400">Amount</small>
                        <h6 className="text-base text-dark dark:text-white">
                          ${bot.amount.toLocaleString()}
                        </h6>
                      </li>
                      <li className="mb-0">
                        <small className="text-gray-500 dark:text-gray-400">Trade Duration</small>
                        <h6 className="text-base text-dark dark:text-white">{bot.duration}</h6>
                      </li>
                    </ul>

                    {/* Purchase Form */}
                    <div className="mt-5 px-5 border-t border-light-200 dark:border-dark-200/50 pt-4 pb-5">
                      <form onSubmit={(e) => handlePurchase(bot, e)}>
                        <input type="hidden" name="iamount" value={bot.amount} />
                        <input type="hidden" name="duration" value={bot.duration} />
                        <input type="hidden" name="id" value={bot.id} />
                        <button
                          type="submit"
                          disabled={loading[bot.id]}
                          className="mt-4 mb-5 w-full py-4 px-4 rounded-xl bg-gradient-to-r from-primary to-secondary hover:from-primary-600 hover:to-secondary-600 text-white font-medium flex items-center justify-center gap-2 transform transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <PurchaseButtonIcon />
                          <span>{loading[bot.id] ? 'Processing...' : 'Purchase'}</span>
                        </button>
                      </form>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradingBots;