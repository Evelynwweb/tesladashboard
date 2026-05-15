import { useState } from 'react';
import { Wallet } from 'lucide-react';
import toast from 'react-hot-toast';

const traders = [
  {
    id: 20,
    name: 'TheGoldHuntFx',
    avatar: 'https://account.teslastockspacex.com/storage/app/public/photos/L5IxVcyEhGHhxCNTycibTkdmxvMcotrSorB8BwEL.jpg',
    minCapital: 5000,
    maxCapital: 20000,
    duration: '14 Days',
    winPercent: 72.79,
    followers: 2.6,
    activeTrades: 73,
  },
  {
    id: 22,
    name: 'George Crypto',
    avatar: 'https://account.teslastockspacex.com/storage/app/public/photos/j7bvsNW5AaBpwGSGpmoZFOw7NCBi0UTcwyWRgmU9.jpg',
    minCapital: 1000,
    maxCapital: 5000,
    duration: '30 Days',
    winPercent: 60.8,
    followers: 1.3,
    activeTrades: 24,
  },
  {
    id: 23,
    name: 'Mary Beth Christine',
    avatar: 'https://account.teslastockspacex.com/storage/app/public/photos/bOTzYHx3x7kOqyPwgYADHms5Kd2n8ijHizWw99ub.jpg',
    minCapital: 5000,
    maxCapital: 20000,
    duration: '14 Days',
    winPercent: 72.68,
    followers: 2.7,
    activeTrades: 48,
  },
  {
    id: 31,
    name: 'Robert Wu',
    avatar: 'https://account.teslastockspacex.com/storage/app/public/photos/mwRrDWK2CGK68IsrcQz1H6zR65suIgIixnluJ9Qr.jpg',
    minCapital: 10000,
    maxCapital: 500000,
    duration: '30 Days',
    winPercent: 97.85,
    followers: 52.1,
    activeTrades: 1300,
  },
  {
    id: 32,
    name: 'Stephen FX',
    avatar: 'https://account.teslastockspacex.com/storage/app/public/photos/GSudE4YTBj6KmMltg19cjSRdKJqsit9sDjBArPrt.jpg',
    minCapital: 20000,
    maxCapital: 1000000,
    duration: '60 Days',
    winPercent: 98.9,
    followers: 121.6,
    activeTrades: 84,
  },
  {
    id: 33,
    name: 'Kristy Young',
    avatar: 'https://account.teslastockspacex.com/storage/app/public/photos/WEt7FGYyV9pbZYJaosz2pnWyNbrfZlnzar056Pd1.jpg',
    minCapital: 50000,
    maxCapital: 1000000,
    duration: '60 Days',
    winPercent: 98.2,
    followers: 85.4,
    activeTrades: 96,
  },
];

const InvestButtonIcon = () => (
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

const CopyTrade = () => {
  const [amounts, setAmounts] = useState({});
  const [loading, setLoading] = useState({});

  const handleAmountChange = (id, value) => {
    setAmounts((prev) => ({ ...prev, [id]: value }));
  };

  const handleInvest = async (trader, e) => {
    e.preventDefault();
    const amount = amounts[trader.id];

    if (!amount || amount < trader.minCapital || amount > trader.maxCapital) {
      toast.error(
        `Amount must be between $${trader.minCapital.toLocaleString()} and $${trader.maxCapital.toLocaleString()}`
      );
      return;
    }

    setLoading((prev) => ({ ...prev, [trader.id]: true }));

    // Simulate API call – replace with actual POST to /dashboard/copytrader
    setTimeout(() => {
      toast.success(`Successfully invested $${amount} in ${trader.name}`);
      setLoading((prev) => ({ ...prev, [trader.id]: false }));
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
              <h1 className="text-3xl font-bold dark:text-white text-dark">Copy Trading</h1>
              <p className="mt-2 text-base dark:text-gray-300 text-gray-600">
                Grow your wealth by automatically copying trades of expert traders
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
                  Expert Traders
                </h2>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {traders.map((trader) => (
                  <div
                    key={trader.id}
                    className="text-center bg-white dark:bg-dark-50 rounded-xl shadow-sm border border-light-200 dark:border-dark-200/50 overflow-hidden"
                  >
                    {/* Trader Avatar & Name */}
                    <div className="p-4 border-b border-light-200 dark:border-dark-200/50 flex justify-center">
                      <div className="flex flex-col items-center justify-center">
                        <img
                          src={trader.avatar}
                          alt={trader.name}
                          className="mb-3 rounded-full w-20 h-20 object-cover object-center"
                        />
                        <div className="text-xs font-medium text-primary">{trader.name}</div>
                      </div>
                    </div>

                    {/* Statistics Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 p-4">
                      <div className="px-3 py-3 rounded-xl bg-light-100 dark:bg-dark-100 text-dark dark:text-white transition-all">
                        <small className="text-gray-500 dark:text-gray-400">Min. Capital</small>
                        <h6 className="text-base text-dark dark:text-white">
                          ${trader.minCapital.toLocaleString()}
                        </h6>
                      </div>
                      <div className="px-3 py-3 rounded-xl bg-light-100 dark:bg-dark-100 text-dark dark:text-white transition-all">
                        <small className="text-gray-500 dark:text-gray-400">Max. Capital</small>
                        <h6 className="text-base text-dark dark:text-white">
                          ${trader.maxCapital.toLocaleString()}
                        </h6>
                      </div>
                      <div className="px-3 py-3 rounded-xl bg-light-100 dark:bg-dark-100 text-dark dark:text-white transition-all">
                        <small className="text-gray-500 dark:text-gray-400">Duration</small>
                        <h6 className="text-base text-dark dark:text-white">{trader.duration}</h6>
                      </div>
                      <div className="px-3 py-3 rounded-xl bg-light-100 dark:bg-dark-100 text-dark dark:text-white transition-all">
                        <small className="text-gray-500 dark:text-gray-400">Win Percent</small>
                        <h6 className="text-base text-dark dark:text-white">{trader.winPercent}%</h6>
                      </div>
                      <div className="px-3 py-3 rounded-xl bg-light-100 dark:bg-dark-100 text-dark dark:text-white transition-all">
                        <small className="text-gray-500 dark:text-gray-400">Followers</small>
                        <h6 className="text-base text-dark dark:text-white">
                          {trader.followers}
                          {trader.followers >= 1000 ? 'k' : ''}
                        </h6>
                      </div>
                      <div className="px-3 py-3 rounded-xl bg-light-100 dark:bg-dark-100 text-dark dark:text-white transition-all">
                        <small className="text-gray-500 dark:text-gray-400">Active Trades</small>
                        <h6 className="text-base text-dark dark:text-white">
                          {trader.activeTrades >= 1000
                            ? `${(trader.activeTrades / 1000).toFixed(1)}k`
                            : trader.activeTrades}
                        </h6>
                      </div>
                    </div>

                    {/* Investment Form */}
                    <div className="mt-2 px-5 border-t border-light-200 dark:border-dark-200/50 pt-4 pb-5">
                      <form onSubmit={(e) => handleInvest(trader, e)}>
                        <label htmlFor={`amount-${trader.id}`} className="text-sm font-medium text-dark dark:text-white mb-8">
                          Amount to Invest
                        </label>
                        <div className="relative mt-3">
                          <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                            <span className="text-dark-300 dark:text-light-300">$</span>
                          </div>
                          <input
                            id={`amount-${trader.id}`}
                            type="number"
                            step="any"
                            min={trader.minCapital}
                            max={trader.maxCapital}
                            value={amounts[trader.id] || ''}
                            onChange={(e) => handleAmountChange(trader.id, e.target.value)}
                            className="block w-full pl-10 pr-10 py-3 text-lg rounded-xl bg-light-100 dark:bg-dark-100 border border-light-200 dark:border-dark-200 focus:ring-2 focus:ring-primary focus:border-transparent text-dark dark:text-white transition-all"
                            placeholder="0.00"
                            required
                          />
                        </div>
                        <input type="hidden" name="duration" value={trader.duration} />
                        <input type="hidden" name="id" value={trader.id} />
                        <button
                          type="submit"
                          disabled={loading[trader.id]}
                          className="mt-4 mb-5 w-full py-4 px-4 rounded-xl bg-gradient-to-r from-primary to-secondary hover:from-primary-600 hover:to-secondary-600 text-white font-medium flex items-center justify-center gap-2 transform transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <InvestButtonIcon />
                          <span>{loading[trader.id] ? 'Processing...' : 'Invest'}</span>
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

export default CopyTrade;