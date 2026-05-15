import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import toast from 'react-hot-toast';
import {
  Wallet, Eye, EyeOff, PlusCircle, ArrowUpRight, Gift, ArrowDown, ArrowUp,
  Shield, Package, Inbox, Download, Upload, Repeat, ChevronLeft, ChevronRight,
  Users, Copy, AlertCircle, DollarSign
} from 'lucide-react';

const Dashboard = () => {
  const { dark } = useTheme();
  const [balanceVisible, setBalanceVisible] = useState(() => {
    const saved = localStorage.getItem('balanceVisible');
    return saved !== 'false';
  });
  const [activeTab, setActiveTab] = useState('deposit');
  const [cryptoData, setCryptoData] = useState([]);
  const [carouselPosition, setCarouselPosition] = useState(0);
  const [itemWidth, setItemWidth] = useState(0);
  const [maxPosition, setMaxPosition] = useState(0);
  const containerRef = useRef(null);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [userData, setUserData] = useState(null);
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [referrals, setReferrals] = useState({ totalReferrals: 0, earnings: 0 });
  const [loading, setLoading] = useState(true);

  // Balance visibility toggle
  useEffect(() => {
    localStorage.setItem('balanceVisible', balanceVisible);
  }, [balanceVisible]);

  // Fetch crypto data for carousel
  useEffect(() => {
    fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=4&page=1&sparkline=false')
      .then(res => res.json())
      .then(data => setCryptoData(data))
      .catch(err => console.error('Failed to fetch crypto data:', err));
  }, []);

  // Calculate carousel dimensions
  const calculateSizes = () => {
    if (!containerRef.current) return;
    const containerWidth = containerRef.current.parentElement.offsetWidth;
    const isMobile = window.innerWidth < 640;
    const singleItemWidth = isMobile
      ? (containerRef.current.children[0]?.offsetWidth || 0) + 16
      : 240 + 16;
    setItemWidth(singleItemWidth);
    const totalItems = containerRef.current.children.length;
    const visibleItems = Math.max(1, Math.floor(containerWidth / singleItemWidth));
    const newMax = Math.max(0, totalItems - visibleItems);
    setMaxPosition(newMax);
    if (carouselPosition > newMax) setCarouselPosition(newMax);
  };

  useEffect(() => {
    if (cryptoData.length > 0) {
      calculateSizes();
      window.addEventListener('resize', calculateSizes);
      return () => window.removeEventListener('resize', calculateSizes);
    }
  }, [cryptoData, carouselPosition]);

  const updatePosition = () => {
    if (containerRef.current) {
      containerRef.current.style.transform = `translateX(-${carouselPosition * itemWidth}px)`;
    }
  };

  useEffect(() => {
    updatePosition();
  }, [carouselPosition, itemWidth]);

  const handlePrev = () => {
    if (carouselPosition > 0) setCarouselPosition(p => p - 1);
  };

  const handleNext = () => {
    if (carouselPosition < maxPosition) setCarouselPosition(p => p + 1);
  };

  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50 && carouselPosition < maxPosition) {
      setCarouselPosition(p => p + 1);
    } else if (touchStart - touchEnd < -50 && carouselPosition > 0) {
      setCarouselPosition(p => p - 1);
    }
  };

  // Fetch dashboard data from backend
  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/dashboard', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        const data = await res.json();
        if (res.ok) {
          setUserData(data.user);
          setRecentTransactions(data.recentTransactions);
          setReferrals({ totalReferrals: data.stats.totalReferrals, earnings: data.stats.referralEarnings });
        } else {
          toast.error(data.message);
          // If token invalid, redirect to login
          if (data.message === 'Not authorized, no token' || data.message === 'Not authorized, token failed') {
            localStorage.removeItem('token');
            window.location.href = '/login';
          }
        }
      } catch (err) {
        toast.error('Failed to load dashboard');
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  // Copy referral link (dynamic using logged-in username)
  const copyRefLink = () => {
    const baseUrl = window.location.origin;
    const refLink = `${baseUrl}/register?ref=${userData?.username || ''}`;
    navigator.clipboard.writeText(refLink);
    toast.success('Referral link copied!');
  };

  // Tabs configuration
  const tabs = [
    { id: 'deposit', label: 'Deposits', icon: Download },
    { id: 'withdrawal', label: 'Withdrawals', icon: Upload },
    { id: 'other', label: 'Others', icon: Repeat },
  ];

  const EmptyTransactions = ({ type }) => (
    <div className="p-6 text-center">
      <div className="flex flex-col items-center justify-center">
        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
          <Inbox className="h-6 w-6 text-primary" />
        </div>
        <p className="text-sm font-medium dark:text-white text-dark mb-1">No {type} found</p>
        <p className="text-xs dark:text-gray-400 text-gray-500">Your {type} history will appear here</p>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 dark:text-white">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 pb-20 md:pb-8 overflow-x-hidden flex-grow">
      {/* Header with stats overview */}
      <div className="relative mb-6 overflow-hidden rounded-xl bg-gradient-to-r from-light-200 via-light-300 to-light-200 dark:from-dark-50 dark:via-dark-100 dark:to-dark-200 p-4 sm:p-6">
        <div className="absolute inset-0 opacity-10">
          <svg viewBox="0 0 400 400" className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 0 10 L 40 10 M 10 0 L 10 40" stroke="currentColor" strokeWidth="0.5" fill="none" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        <div className="relative z-10">
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold dark:text-white text-dark">
                Welcome back, {userData?.name || 'User'}!
              </h1>
              <p className="dark:text-gray-400 text-gray-600 text-sm">
                {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-3 sm:mt-0">
              <Link
                to="/dashboard/verify-account"
                className="flex items-center gap-2 rounded-md bg-secondary px-3 py-2 text-sm font-medium text-white hover:bg-secondary/90 transition-colors"
              >
                <Shield className="h-4 w-4" />
                <span>Verify Your Account</span>
              </Link>
            </div>
          </div>

          {/* Balance Cards - Split Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 items-stretch">
            {/* Primary Balance Card */}
            <div className="lg:col-span-2 h-full rounded-xl dark:bg-dark-50 bg-light-100 backdrop-blur-sm p-4 sm:p-5 shadow-lg">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-base sm:text-lg font-bold dark:text-white text-dark flex items-center">
                    <Wallet className="h-5 w-5 mr-2 text-primary" />
                    Account Balance
                  </h2>
                  <p className="text-xs dark:text-gray-400 text-gray-600">Your current available balance</p>
                </div>
                <button
                  onClick={() => setBalanceVisible(!balanceVisible)}
                  className="dark:text-gray-400 text-gray-600 hover:text-dark dark:hover:text-white transition-colors"
                >
                  {balanceVisible ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
                </button>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center mb-2">
                  <h3 className="text-2xl sm:text-3xl font-bold dark:text-white text-dark mr-2">
                    {balanceVisible ? `$${userData?.balance?.toFixed(2) || '0.00'}` : '••••••'}
                  </h3>
                </div>
                <div className="mt-6 flex gap-2">
                  <Link
                    to="/dashboard/deposits"
                    className="dark:bg-dark-100 bg-light-200 hover:bg-light-200/70 dark:hover:bg-dark-100/70 dark:text-white text-dark text-xs font-medium px-3 py-1.5 rounded-lg flex items-center gap-1 flex-1 justify-center"
                  >
                    <PlusCircle className="h-3.5 w-3.5" />
                    <span>Deposit</span>
                  </Link>
                  <Link
                    to="/dashboard/withdrawals"
                    className="dark:bg-dark-100 bg-light-200 hover:bg-light-200/70 dark:hover:bg-dark-100/70 dark:text-white text-dark text-xs font-medium px-3 py-1.5 rounded-lg flex items-center gap-1 flex-1 justify-center"
                  >
                    <ArrowUpRight className="h-3.5 w-3.5" />
                    <span>Withdraw</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Secondary Stats Cards */}
            <div className="lg:col-span-3 grid grid-cols-2 gap-3 h-full">
              <div className="rounded-lg dark:bg-dark-50 bg-light-100 border dark:border-dark-100/50 border-light-200/50 p-4 flex flex-col">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm dark:text-gray-400 text-gray-600">Profits</span>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary/10">
                    <DollarSign className="h-4 w-4 text-secondary" />
                  </div>
                </div>
                <h3 className="mb-1 text-lg font-medium dark:text-white text-dark truncate">
                  ${userData?.profit?.toFixed(2) || '0.00'}
                </h3>
              </div>
              <div className="rounded-lg dark:bg-dark-50 bg-light-100 border dark:border-dark-100/50 border-light-200/50 p-4 flex flex-col">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm dark:text-gray-400 text-gray-600">Bonus</span>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/10">
                    <Gift className="h-4 w-4 text-accent" />
                  </div>
                </div>
                <h3 className="mb-1 text-lg font-medium dark:text-white text-dark truncate">
                  ${userData?.bonus?.toFixed(2) || '0.00'}
                </h3>
              </div>
              <div className="rounded-lg dark:bg-dark-50 bg-light-100 border dark:border-dark-100/50 border-light-200/50 p-4 flex flex-col">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm dark:text-gray-400 text-gray-600">Deposits</span>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-tertiary/10">
                    <ArrowDown className="h-4 w-4 text-tertiary" />
                  </div>
                </div>
                <h3 className="mb-1 text-lg font-medium dark:text-white text-dark truncate">
                  ${userData?.totalDeposited?.toFixed(2) || '0.00'}
                </h3>
              </div>
              <div className="rounded-lg dark:bg-dark-50 bg-light-100 border dark:border-dark-100/50 border-light-200/50 p-4 flex flex-col">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm dark:text-gray-400 text-gray-600">Withdrawals</span>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                    <ArrowUp className="h-4 w-4 text-primary" />
                  </div>
                </div>
                <h3 className="mb-1 text-lg font-medium dark:text-white text-dark truncate">
                  ${userData?.totalWithdrawn?.toFixed(2) || '0.00'}
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Trading Chart */}
          <div className="dark:bg-dark-50 bg-light-100 border dark:border-dark-100 border-light-200 rounded-xl overflow-hidden w-full">
            <div className="flex items-center justify-between p-4 sm:p-5 border-b dark:border-dark-100 border-light-200">
              <h3 className="text-base sm:text-lg font-bold dark:text-white text-dark">Trading Analysis</h3>
            </div>
            <div className="p-4 sm:p-5 overflow-hidden">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium dark:text-white text-dark text-xs sm:text-sm">Signal Strength</span>
                <span className="font-medium dark:text-white text-dark text-xs sm:text-sm">0%</span>
              </div>
              <div className="w-full bg-light-200 rounded-full h-1.5 dark:bg-dark-100 mb-5">
                <div className="bg-primary h-1.5 rounded-full" style={{ width: '0%' }} />
              </div>

              <div className={`tradingview-widget-container ${dark ? '' : 'hidden'}`} style={{ height: '300px', width: '100%' }}>
                <iframe
                  src="https://s.tradingview.com/widgetembed/?frameElementId=tradingview_12345&symbol=BINANCE:BTCUSDT&interval=1&hidesidetoolbar=1&theme=dark&style=1&timezone=Etc/UTC&studies=[]"
                  style={{ height: '100%', width: '100%', border: 'none' }}
                  title="TradingView Chart Dark"
                />
              </div>
              <div className={`tradingview-widget-container ${dark ? 'hidden' : ''}`} style={{ height: '300px', width: '100%' }}>
                <iframe
                  src="https://s.tradingview.com/widgetembed/?frameElementId=tradingview_12345&symbol=BINANCE:BTCUSDT&interval=1&hidesidetoolbar=1&theme=light&style=1&timezone=Etc/UTC&studies=[]"
                  style={{ height: '100%', width: '100%', border: 'none' }}
                  title="TradingView Chart Light"
                />
              </div>
            </div>
          </div>

          {/* Active Investments */}
          <div className="dark:bg-dark-50 bg-light-100 border dark:border-dark-100 border-light-200 rounded-xl overflow-hidden w-full">
            <div className="flex items-center justify-between p-4 sm:p-5 border-b dark:border-dark-100 border-light-200">
              <h3 className="text-base sm:text-lg font-bold dark:text-white text-dark">
                Active Investments <span className="text-xs dark:text-gray-400 text-gray-600">(0)</span>
              </h3>
            </div>
            <div className="p-4 sm:p-5">
              <div className="flex flex-col items-center justify-center py-6 sm:py-8">
                <div className="h-12 w-12 sm:h-16 sm:w-16 rounded-full dark:bg-dark-100 bg-light-200 flex items-center justify-center mb-4">
                  <Package className="h-6 w-6 sm:h-8 sm:w-8 dark:text-gray-400 text-gray-600" />
                </div>
                <h4 className="dark:text-white text-dark font-medium mb-2 text-sm sm:text-base">No Active Investments</h4>
                <p className="text-xs sm:text-sm dark:text-gray-400 text-gray-600 mb-4 text-center max-w-md">
                  You don't have any active investment at the moment.
                </p>
                <Link
                  to="/dashboard/buy-plan"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
                >
                  <PlusCircle className="h-4 w-4" />
                  <span>Invest</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Market Overview Carousel */}
          <div className="dark:bg-dark-50 bg-light-100 border dark:border-dark-100 border-light-200 rounded-xl overflow-hidden w-full">
            <div className="flex items-center justify-between p-4 sm:p-5 border-b dark:border-dark-100 border-light-200">
              <h3 className="text-base sm:text-lg font-bold dark:text-white text-dark">Market Overview</h3>
              <div className="flex gap-2">
                <button
                  onClick={handlePrev}
                  className="rounded-full dark:bg-dark-100 bg-light-200 p-1 dark:text-gray-400 text-gray-600 hover:text-dark dark:hover:text-white transition-colors"
                >
                  <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>
                <button
                  onClick={handleNext}
                  className="rounded-full dark:bg-dark-100 bg-light-200 p-1 dark:text-gray-400 text-gray-600 hover:text-dark dark:hover:text-white transition-colors"
                >
                  <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>
              </div>
            </div>
            <div className="p-4 sm:p-5 overflow-hidden">
              <div className="crypto-pairs-carousel w-full">
                <div
                  ref={containerRef}
                  className="flex w-full gap-4 transition-transform duration-300"
                  style={{ transform: `translateX(0px)` }}
                  onTouchStart={handleTouchStart}
                  onTouchMove={(e) => setTouchEnd(e.touches[0].clientX)}
                  onTouchEnd={handleTouchEnd}
                >
                  {cryptoData.map((coin) => {
                    const isUp = coin.price_change_24h >= 0;
                    return (
                      <div
                        key={coin.id}
                        className="min-w-[100%] xs:min-w-[85%] sm:min-w-[240px] sm:w-auto rounded-xl dark:border-dark-100 border-light-200 border dark:bg-dark-100/50 bg-light-200/50 p-4 flex-shrink-0"
                      >
                        <div className="mb-3 flex items-center gap-2">
                          <img src={coin.image} alt={coin.name} className="h-8 w-8 rounded-full" />
                          <div>
                            <div className="font-medium dark:text-white text-dark">{coin.name}</div>
                            <div className="text-xs dark:text-gray-400 text-gray-600">{coin.symbol.toUpperCase()}</div>
                          </div>
                          <span
                            className="ml-auto text-white text-xs px-2 py-1 rounded-full flex items-center"
                            style={{ background: isUp ? '#089981' : '#F23645' }}
                          >
                            {isUp ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
                            {coin.price_change_percentage_24h.toFixed(2)}%
                          </span>
                        </div>
                        <div className="mb-2">
                          <div className="flex justify-between">
                            <span className="dark:text-gray-400 text-gray-600 text-xs">Price</span>
                            <span className="dark:text-gray-400 text-gray-600 text-xs">24h Change</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="font-medium dark:text-white text-dark">${coin.current_price.toFixed(2)}</span>
                            <span style={{ color: isUp ? '#089981' : '#F23645' }}>
                              {isUp ? '+' : '-'}${Math.abs(coin.price_change_24h).toFixed(2)}
                            </span>
                          </div>
                        </div>
                        <div className="h-12 w-full">
                          <svg viewBox="0 0 100 30" preserveAspectRatio="none" className="w-full h-full">
                            <path
                              d="M0,15 C20,5 40,25 60,15 S80,5 100,15"
                              stroke={isUp ? '#089981' : '#F23645'}
                              strokeWidth="1.5"
                              fill="none"
                            />
                          </svg>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="dark:bg-dark-50 bg-light-100 border dark:border-dark-100 border-light-200 rounded-xl overflow-hidden w-full">
            <div className="flex items-center justify-between p-4 sm:p-5 border-b dark:border-dark-100 border-light-200">
              <h3 className="text-base sm:text-lg font-bold dark:text-white text-dark">Recent Transactions</h3>
              <Link to="/dashboard/accounthistory" className="text-primary text-sm flex items-center gap-1 hover:underline">
                <span>View all</span>
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Tabs */}
            <div className="px-2 sm:px-6 border-b dark:border-dark-100 border-light-200">
              <div className="flex overflow-x-auto py-3 sm:py-4 no-scrollbar">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`mr-3 pb-3 px-1 inline-flex flex-col items-center text-sm font-medium border-b-2 focus:outline-none whitespace-nowrap transition-colors ${
                      activeTab === tab.id
                        ? 'border-primary text-primary'
                        : 'border-transparent dark:text-gray-400 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                    }`}
                  >
                    <div
                      className={`flex items-center justify-center h-8 w-8 rounded-full mb-1 sm:mb-2 transition-colors ${
                        activeTab === tab.id
                          ? 'bg-primary/10'
                          : 'dark:bg-dark-100/80 bg-light-100/80'
                      }`}
                    >
                      <tab.icon
                        className={`h-4 w-4 ${
                          activeTab === tab.id
                            ? 'text-primary'
                            : 'dark:text-gray-400 text-gray-500'
                        }`}
                      />
                    </div>
                    <span className="text-xs sm:text-sm">{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="overflow-x-auto">
              {activeTab === 'deposit' && (
                <div className="hidden sm:block">
                  <table className="min-w-full divide-y dark:divide-dark-100 divide-light-200">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium dark:text-gray-400 text-gray-500 uppercase tracking-wider">Amount</th>
                        <th className="px-6 py-3 text-left text-xs font-medium dark:text-gray-400 text-gray-500 uppercase tracking-wider">Payment Mode</th>
                        <th className="px-6 py-3 text-left text-xs font-medium dark:text-gray-400 text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium dark:text-gray-400 text-gray-500 uppercase tracking-wider">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td colSpan="4">
                          <EmptyTransactions type="deposits" />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
              {activeTab === 'withdrawal' && (
                <div className="hidden sm:block">
                  <table className="min-w-full divide-y dark:divide-dark-100 divide-light-200">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium dark:text-gray-400 text-gray-500 uppercase tracking-wider">Amount</th>
                        <th className="px-6 py-3 text-left text-xs font-medium dark:text-gray-400 text-gray-500 uppercase tracking-wider">Payment Mode</th>
                        <th className="px-6 py-3 text-left text-xs font-medium dark:text-gray-400 text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium dark:text-gray-400 text-gray-500 uppercase tracking-wider">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td colSpan="4">
                          <EmptyTransactions type="withdrawals" />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
              {activeTab === 'other' && (
                <div className="hidden sm:block">
                  <table className="min-w-full divide-y dark:divide-dark-100 divide-light-200">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium dark:text-gray-400 text-gray-500 uppercase tracking-wider">Amount</th>
                        <th className="px-6 py-3 text-left text-xs font-medium dark:text-gray-400 text-gray-500 uppercase tracking-wider">Type</th>
                        <th className="px-6 py-3 text-left text-xs font-medium dark:text-gray-400 text-gray-500 uppercase tracking-wider">Plan/Narration</th>
                        <th className="px-6 py-3 text-left text-xs font-medium dark:text-gray-400 text-gray-500 uppercase tracking-wider">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td colSpan="4">
                          <EmptyTransactions type="transactions" />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
              <div className="sm:hidden">
                <EmptyTransactions type={activeTab === 'deposit' ? 'deposits' : activeTab === 'withdrawal' ? 'withdrawals' : 'transactions'} />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* User Profile Card */}
          <div className="dark:bg-dark-50 bg-light-100 border dark:border-dark-100 border-light-200 rounded-xl overflow-hidden w-full">
            <div className="bg-gradient-to-r from-primary/20 to-secondary/20 p-4 sm:p-5 text-center">
              <div className="relative inline-block">
                <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-full bg-primary text-white font-bold text-xl flex items-center justify-center mx-auto">
                  {userData?.name?.charAt(0).toUpperCase() || 'U'}
                </div>
              </div>
              <h4 className="mt-3 font-medium dark:text-white text-dark text-sm sm:text-base">{userData?.name || 'User'}</h4>
            </div>
            <div className="p-4 sm:p-5">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm dark:text-gray-400 text-gray-600">Account Balance</span>
                  <span className="text-xs sm:text-sm font-medium dark:text-white text-dark">
                    ${userData?.balance?.toFixed(2) || '0.00'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm dark:text-gray-400 text-gray-600">Bonus</span>
                  <span className="text-xs sm:text-sm font-medium dark:text-white text-dark">
                    ${userData?.bonus?.toFixed(2) || '0.00'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm dark:text-gray-400 text-gray-600">Referral Bonus</span>
                  <span className="text-xs sm:text-sm font-medium dark:text-white text-dark">
                    ${referrals?.earnings?.toFixed(2) || '0.00'}
                  </span>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2 sm:gap-3">
                <Link to="/dashboard/deposits" className="flex items-center justify-center gap-1 sm:gap-2 p-2 dark:bg-dark-100 bg-light-200 hover:bg-light-200/70 dark:hover:bg-dark-100/70 rounded-lg dark:text-white text-dark text-xs sm:text-sm font-medium transition-colors">
                  <PlusCircle className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span>Deposit</span>
                </Link>
                <Link to="/dashboard/withdrawals" className="flex items-center justify-center gap-1 sm:gap-2 p-2 dark:bg-dark-100 bg-light-200 hover:bg-light-200/70 dark:hover:bg-dark-100/70 rounded-lg dark:text-white text-dark text-xs sm:text-sm font-medium transition-colors">
                  <ArrowUpRight className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span>Withdraw</span>
                </Link>
              </div>
              <div className="mt-4 sm:mt-5 dark:border-dark-100 border-light-200 border-t pt-4 sm:pt-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm dark:text-gray-400 text-gray-600">Account Verification Status</span>
                  <span className="inline-flex items-center text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    Unverified
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Referral Card */}
          <div className="dark:bg-dark-50 bg-light-100 border dark:border-dark-100 border-light-200 rounded-xl overflow-hidden w-full">
            <div className="flex items-center justify-between p-4 sm:p-5 border-b dark:border-dark-100 border-light-200">
              <h3 className="font-bold dark:text-white text-dark text-sm sm:text-base">Refer &amp; Earn</h3>
              <Link to="/dashboard/referuser" className="text-primary text-xs sm:text-sm flex items-center gap-1 hover:underline">
                <span>Details</span>
                <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
              </Link>
            </div>
            <div className="p-4 sm:p-5">
              <div className="mb-4">
                <div className="flex mb-3">
                  <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-accent/10 flex items-center justify-center mr-3">
                    <Users className="h-4 w-4 sm:h-5 sm:w-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-medium dark:text-white text-dark text-xs sm:text-sm">Earn Through Referrals</h4>
                    <p className="text-xs dark:text-gray-400 text-gray-600">
                      Earn commission when someone signs up using your link
                    </p>
                  </div>
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-xs sm:text-sm dark:text-gray-400 text-gray-600 mb-2">Your Referral Link</label>
                <div className="flex dark:bg-dark-100 bg-light-200 rounded-lg overflow-hidden">
                  <input
                    type="text"
                    readOnly
                    value={`${window.location.origin}/register?ref=${userData?.username || ''}`}
                    className="flex-1 dark:bg-transparent bg-transparent border-0 px-2 sm:px-3 py-2 text-xs sm:text-sm dark:text-gray-300 text-gray-700 focus:outline-none truncate"
                  />
                  <button
                    onClick={copyRefLink}
                    className="bg-primary text-white px-2 sm:px-3 py-2 text-xs sm:text-sm font-medium hover:bg-primary/90 transition-colors flex items-center gap-1"
                  >
                    <Copy className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span>Copy</span>
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                <div className="dark:bg-dark-100 bg-light-200 rounded-lg p-2 sm:p-3">
                  <p className="text-xs dark:text-gray-400 text-gray-600 mb-1">Total Referrals</p>
                  <p className="text-lg sm:text-xl font-bold dark:text-white text-dark">
                    {referrals.totalReferrals || 0}
                  </p>
                </div>
                <div className="dark:bg-dark-100 bg-light-200 rounded-lg p-2 sm:p-3">
                  <p className="text-xs dark:text-gray-400 text-gray-600 mb-1">Earnings</p>
                  <p className="text-lg sm:text-xl font-bold dark:text-white text-dark">
                    ${referrals.earnings?.toFixed(2) || '0.00'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;