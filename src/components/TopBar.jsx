import { Menu, Sun, Moon, Shield, Bell, User, ChevronDown, LogOut } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const TopBar = ({ onMenuClick }) => {
  const { dark, toggleDark } = useTheme();
  const [userMenuOpen, setUserMenuOpen] = useState(false);


  const handleLogout = () => {
    localStorage.removeItem('token');
    // Optional: remove other items if you store them
    // localStorage.removeItem('user');
    window.location.replace('/login');
  };


  return (
    <header className="flex h-16 items-center justify-between px-4 sm:px-6 border-b border-light-200 dark:border-dark-100 bg-light-100 dark:bg-dark-50 shadow-md sticky top-0 z-[9999]">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="md:hidden p-1.5 rounded-lg hover:bg-light-200/60 dark:hover:bg-dark-100/60 transition-colors"
        >
          <Menu className="h-5 w-5 dark:text-white text-dark" />
        </button>
        <div className="md:hidden">
          <img src="/tesla.png" alt="Tesla Logo" className="h-8 dark:brightness-0 dark:invert" />
        </div>
      </div>

      <div className="flex items-center gap-1.5 sm:gap-3">
        {/* Theme toggle */}
        <button
          onClick={toggleDark}
          className="p-1.5 rounded-lg bg-light-200/40 dark:bg-dark-100/40 hover:bg-light-200/80 dark:hover:bg-dark-100/80 transition-colors"
        >
          {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>

        {/* KYC Button */}
        <div className="relative">
          <button className="flex items-center px-2 py-1 rounded-lg text-xs border border-light-200 dark:border-dark-100 bg-light-200/40 dark:bg-dark-100/40 hover:bg-light-200/80 dark:hover:bg-dark-100/80">
            <Shield className="h-3.5 w-3.5 mr-1" />
            <span className="hidden sm:inline-block">KYC</span>
          </button>
        </div>

        {/* User dropdown */}
        <div className="relative">
          <button
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            className="flex items-center gap-2 p-1 rounded-lg hover:bg-light-200/40 dark:hover:bg-dark-100/40 transition-colors"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-full opacity-80" />
              <div className="relative h-7 w-7 sm:h-8 sm:w-8 bg-primary rounded-full flex items-center justify-center text-sm font-medium border-2 border-light-300 dark:border-dark-50">
                Lo
              </div>
            </div>
            <span className="hidden md:block text-sm font-medium dark:text-white text-dark">
              Lowincomehomes47@gmail.com
            </span>
            <ChevronDown className="h-4 w-4 text-gray-600 dark:text-gray-400 hidden md:block" />
          </button>

          {userMenuOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-light-100 dark:bg-dark-50 border border-light-200 dark:border-dark-100 rounded-lg shadow-lg z-[10000]">
              <div className="px-4 py-3 border-b border-light-200 dark:border-dark-100">
                <h6 className="text-sm font-medium dark:text-white text-dark">Low Income</h6>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">Lowincomehomes47@gmail.com</p>
              </div>
              <div className="py-2">
                <Link to="/dashboard/account-settings" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-light-200/60 dark:hover:bg-dark-100/60">
                  <User className="h-4 w-4" />
                  <span>My Profile</span>
                </Link>
                <Link to="/dashboard/accounthistory" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-light-200/60 dark:hover:bg-dark-100/60">
                  <Bell className="h-4 w-4" />
                  <span>Transaction History</span>
                </Link>
              </div>
              <div className="py-2 border-t border-light-200 dark:border-dark-100">
                 <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-danger w-full text-left hover:bg-light-200/60 dark:hover:bg-dark-100/60"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default TopBar;