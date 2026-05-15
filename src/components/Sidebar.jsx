import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Download, History, Upload, Link, Briefcase, Blocks, CopySlash, Bot, Folder, TrendingUp, Users, Settings, Wallet, Shield } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Sidebar = ({ isOpen, onClose }) => {
  const { dark } = useTheme();
  const [balance, setBalance] = useState(0);

   useEffect(() => {
    const fetchBalance = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/dashboard`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const data = await res.json();
        if (res.ok) {
          setBalance(data.user.balance);
        }
      } catch (err) {
        console.error('Sidebar balance fetch failed', err);
      }
    };
    fetchBalance();
  }, []);

  const navItemsMain = [
    { to: '/dashboard', icon: Home, label: 'Dashboard' },
    { to: '/dashboard/deposits', icon: Download, label: 'Fund Account', active: true },
    { to: '/dashboard/accounthistory', icon: History, label: 'Transactions' },
    { to: '/dashboard/withdrawals', icon: Upload, label: 'Withdraw' },
    { to: '/connect-wallet', icon: Link, label: 'Connect Wallet' },
  ];

  const navInvest = [
    { to: '/dashboard/buy-plan', icon: Briefcase, label: 'Investment Plans' },
    { to: '/dashboard/buy-stocks', icon: Blocks, label: 'Purchase Stocks' },
    { to: '/dashboard/copy-trade', icon: CopySlash, label: 'Copy Trading' },
    { to: '/dashboard/buy-bot', icon: Bot, label: 'AI Trading Bots' },
    { to: '/dashboard/myplans/All', icon: Folder, label: 'My Investments' },
    { to: '/dashboard/tradinghistory', icon: TrendingUp, label: 'Profit History' },
  ];

  const navAccount = [
    { to: '/dashboard/referuser', icon: Users, label: 'Referrals' },
    { to: '/dashboard/account-settings', icon: Settings, label: 'Account Settings' },
  ];

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[10000] md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-[10010] w-72 bg-light-100 dark:bg-dark-50 overflow-y-auto transition-transform duration-300 shadow-2xl ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:relative md:translate-x-0`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex h-16 items-center mt-4 border-b border-light-200 dark:border-dark-100 px-6">
            <img
              src="/logo.png"
              alt="Logo"
              className="h-8 dark:brightness-0 dark:invert"
            />
            <button className="ml-auto md:hidden" onClick={onClose}>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* User profile */}
          <div className="relative mt-6 px-4 mb-6">
            <div className="p-4 rounded-xl bg-light-200/50 dark:bg-dark-100/50 backdrop-blur-sm border border-light-200/40 dark:border-dark-100/40 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-b from-primary/10 to-transparent rounded-full blur-2xl transform translate-x-8 -translate-y-8 group-hover:translate-y-0 transition-transform" />
              <div className="flex flex-col items-center relative">
                <div className="relative mb-3">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-full blur-[1px]" />
                  <div className="relative bg-primary h-16 w-16 rounded-full flex items-center justify-center text-xl font-bold border-2 border-light-300/80 dark:border-dark/80">
                    Lo
                  </div>
                  <div className="absolute bottom-0 right-0 h-4 w-4 bg-secondary rounded-full border-2 border-light-300 dark:border-dark" />
                </div>
                <h5 className="font-medium dark:text-white text-dark mb-0.5">Low Income</h5>
                <span className="text-xs text-gray-600 dark:text-gray-400 mb-3 bg-light-200/50 dark:bg-dark-50/50 px-2 py-0.5 rounded-full">online</span>
                <div className="bg-gradient-to-r from-light-100 to-light-200 dark:from-dark-50 dark:to-dark-100 p-3 rounded-lg w-full flex items-center gap-2 border border-light-200/60 dark:border-dark-100/60 relative overflow-hidden">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Wallet className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <span className="text-xs text-gray-600 dark:text-gray-400 block">Balance</span>
                    <span className="text-sm font-medium dark:text-white text-dark">
                      ${balance.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation sections */}
          <div className="flex-1 px-3 py-2 space-y-6">
            {/* Main */}
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase px-3 mb-2">Main</p>
              <nav className="space-y-1">
                {navItemsMain.map(item => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) =>
                      `flex items-center gap-3 rounded-lg px-3 py-2 transition-colors ${
                        isActive
                          ? 'bg-primary/10 text-primary'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-light-200/60 dark:hover:bg-dark-100/60'
                      }`
                    }
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </NavLink>
                ))}
              </nav>
            </div>
            {/* Investments */}
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase px-3 mb-2">Investments</p>
              <nav className="space-y-1">
                {navInvest.map(item => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) =>
                      `flex items-center gap-3 rounded-lg px-3 py-2 transition-colors ${
                        isActive
                          ? 'bg-primary/10 text-primary'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-light-200/60 dark:hover:bg-dark-100/60'
                      }`
                    }
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </NavLink>
                ))}
              </nav>
            </div>
            {/* Account */}
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase px-3 mb-2">Account</p>
              <nav className="space-y-1">
                {navAccount.map(item => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) =>
                      `flex items-center gap-3 rounded-lg px-3 py-2 transition-colors ${
                        isActive
                          ? 'bg-primary/10 text-primary'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-light-200/60 dark:hover:bg-dark-100/60'
                      }`
                    }
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </NavLink>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;