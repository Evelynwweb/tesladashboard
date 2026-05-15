import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Home, Download, History, User, Zap, X, ArrowDown, TrendingUp, Upload, Headphones } from 'lucide-react';

const MobileNav = () => {
  const [fabOpen, setFabOpen] = useState(false);

  const actions = [
    { to: '/dashboard/deposits', icon: ArrowDown, label: 'Fund', color: 'tertiary' },
    { to: '/dashboard/buy-plan', icon: TrendingUp, label: 'Invest', color: 'secondary' },
    { to: '/dashboard/withdrawals', icon: Upload, label: 'Withdraw', color: 'danger' },
    { to: '/dashboard/referuser', icon: User, label: 'Refer', color: 'accent' },
    { to: '/dashboard/account-settings', icon: User, label: 'Profile', color: 'purple' },
    { to: '/dashboard/support', icon: Headphones, label: 'Support', color: 'primary' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[9990] md:hidden">
      <div className="bg-gradient-to-b from-light-100 to-light dark:from-dark-50 dark:to-dark border-t border-light-200/80 dark:border-dark-100/80 pt-0.5">
        <div className="flex items-center justify-around h-16 relative px-2">
          <Link to="/dashboard" className="flex flex-col items-center justify-center h-full w-full">
            <Home className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            <span className="text-xs mt-1 text-gray-600 dark:text-gray-400">Home</span>
          </Link>
          <Link to="/dashboard/deposits" className="flex flex-col items-center justify-center h-full w-full">
            <Download className="h-5 w-5 text-primary" />
            <span className="text-xs mt-1 text-primary font-medium">Deposit</span>
          </Link>

          {/* FAB */}
          <div className="flex flex-col items-center h-full relative px-2 -mt-8">
            <button
              onClick={() => setFabOpen(!fabOpen)}
              className="h-14 w-14 rounded-full shadow-lg flex items-center justify-center bg-primary transform hover:scale-105 transition-all duration-300"
            >
              {fabOpen ? <X className="h-6 w-6 text-white" /> : <Zap className="h-6 w-6 text-white" />}
            </button>
            <span className="text-xs text-gray-600 dark:text-gray-400 absolute -bottom-2">Actions</span>
          </div>

          <Link to="/dashboard/accounthistory" className="flex flex-col items-center justify-center h-full w-full">
            <History className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            <span className="text-xs mt-1 text-gray-600 dark:text-gray-400">History</span>
          </Link>
          <Link to="/dashboard/account-settings" className="flex flex-col items-center justify-center h-full w-full">
            <User className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            <span className="text-xs mt-1 text-gray-600 dark:text-gray-400">Profile</span>
          </Link>
        </div>
      </div>

      {/* FAB Menu */}
      {fabOpen && (
        <div className="fixed inset-0 bg-dark/70 bg-light/70 backdrop-blur-sm z-[9991] animate-in fade-in duration-300">
          <div className="absolute inset-x-0 bottom-24 flex flex-col items-center">
            <div className="flex flex-wrap justify-center gap-4 max-w-md mx-auto p-3">
              {actions.map((action, idx) => (
                <Link
                  key={action.to}
                  to={action.to}
                  className="w-[calc(33%-12px)] aspect-square flex flex-col items-center justify-center rounded-2xl bg-gradient-to-b from-${action.color}/20 to-${action.color}/5 border border-${action.color}/20 hover:from-${action.color}/30 transition-all duration-300 shadow-lg"
                  style={{ animationDelay: `${idx * 0.05}s` }}
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-${action.color} to-${action.color}/70 flex items-center justify-center mb-2`}>
                    <action.icon className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-xs font-medium dark:text-white text-dark">{action.label}</span>
                </Link>
              ))}
            </div>
            <button
              onClick={() => setFabOpen(false)}
              className="mt-8 w-12 h-12 rounded-full bg-light-200/80 dark:bg-dark-100/80 border border-light-200 dark:border-dark-100 flex items-center justify-center"
            >
              <X className="h-6 w-6 dark:text-white text-dark" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileNav;