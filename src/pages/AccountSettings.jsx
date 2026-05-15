import { useState, useEffect } from 'react';
import { User, Shield, Wallet, Bell, Save, Eye, EyeOff, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const AccountSettings = () => {
  // Tab state
  const [activeTab, setActiveTab] = useState('personal');

  // Personal info form state
  const [personalInfo, setPersonalInfo] = useState({
    name: 'Low Income',
    email: 'Lowincomehomes47@gmail.com',
    phone: '09052040500',
    dob: '',
    country: 'United States of America',
    address: '',
  });

  // Withdrawal settings (bank + crypto)
  const [withdrawalInfo, setWithdrawalInfo] = useState({
    bank_name: '',
    account_name: '',
    account_no: '',
    swiftcode: '',
    btc_address: '',
    eth_address: '',
    ltc_address: '',
    usdt_address: '',
  });

  // Password change state
  const [passwordData, setPasswordData] = useState({
    current_password: '',
    password: '',
    password_confirmation: '',
  });
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({ width: '0%', color: 'bg-danger', text: '' });

  // Preferences (email notifications)
  const [preferences, setPreferences] = useState({
    otpsend: 'No',
    roiemail: 'Yes',
    invplanemail: 'Yes',
  });

  // Loading states
  const [loading, setLoading] = useState({
    personal: false,
    withdrawal: false,
    password: false,
    preferences: false,
  });

  // Password strength calculator
  useEffect(() => {
    const pwd = passwordData.password;
    let strength = 0;
    if (pwd.length >= 8) strength += 25;
    if (/[A-Z]/.test(pwd)) strength += 25;
    if (/[0-9]/.test(pwd)) strength += 25;
    if (/[^A-Za-z0-9]/.test(pwd)) strength += 25;

    let color = 'bg-danger';
    let text = '';
    if (strength <= 25) {
      color = 'bg-danger';
      text = 'Weak password';
    } else if (strength <= 50) {
      color = 'bg-accent';
      text = 'Moderate password';
    } else if (strength <= 75) {
      color = 'bg-tertiary';
      text = 'Good password';
    } else {
      color = 'bg-secondary';
      text = 'Strong password';
    }
    setPasswordStrength({ width: `${strength}%`, color, text });
  }, [passwordData.password]);

  // Handle personal info change
  const handlePersonalChange = (e) => {
    setPersonalInfo({ ...personalInfo, [e.target.name]: e.target.value });
  };

  // Handle withdrawal change
  const handleWithdrawalChange = (e) => {
    setWithdrawalInfo({ ...withdrawalInfo, [e.target.name]: e.target.value });
  };

  // Handle password change
  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  // Handle preferences change
  const handlePrefChange = (name, value) => {
    setPreferences({ ...preferences, [name]: value });
  };

  // Submit handlers (mock API calls)
  const updatePersonalInfo = async (e) => {
    e.preventDefault();
    setLoading({ ...loading, personal: true });
    // Simulate API call
    setTimeout(() => {
      toast.success('Profile updated successfully!');
      setLoading({ ...loading, personal: false });
    }, 1000);
  };

  const updateWithdrawalInfo = async (e) => {
    e.preventDefault();
    setLoading({ ...loading, withdrawal: true });
    setTimeout(() => {
      toast.success('Withdrawal settings saved!');
      setLoading({ ...loading, withdrawal: false });
    }, 1000);
  };

  const updatePassword = async (e) => {
    e.preventDefault();
    if (passwordData.password !== passwordData.password_confirmation) {
      toast.error('New passwords do not match');
      return;
    }
    if (passwordData.password.length < 8) {
      toast.error('Password must be at least 8 characters');
      return;
    }
    setLoading({ ...loading, password: true });
    setTimeout(() => {
      toast.success('Password updated successfully!');
      setPasswordData({ current_password: '', password: '', password_confirmation: '' });
      setLoading({ ...loading, password: false });
    }, 1000);
  };

  const updatePreferences = async (e) => {
    e.preventDefault();
    setLoading({ ...loading, preferences: true });
    setTimeout(() => {
      toast.success('Notification preferences saved!');
      setLoading({ ...loading, preferences: false });
    }, 1000);
  };

  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: User },
    { id: 'security', label: 'Password', icon: Shield },
    { id: 'withdrawal', label: 'Withdrawal Settings', icon: Wallet },
    { id: 'preferences', label: 'Preferences', icon: Bell },
  ];

  return (
    <div className="p-4 md:p-6 pb-20 md:pb-8 overflow-x-hidden flex-grow">
      {/* Page Header */}
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-3xl -z-10 blur-xl opacity-50" />
        <div className="px-6 py-8 rounded-3xl bg-gradient-to-r from-primary/5 to-secondary/5 backdrop-blur-sm border border-white/10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold dark:text-white text-dark">Account Settings</h1>
              <p className="mt-2 text-base dark:text-gray-300 text-gray-600">
                Manage your personal information and preferences
              </p>
            </div>
            <div>
              <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/10 dark:bg-dark-50/50 backdrop-blur-sm border border-white/20 dark:border-dark-200/50">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/20 text-primary">
                  <User className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs dark:text-gray-400 text-gray-500">Account</p>
                  <p className="text-lg font-semibold dark:text-white text-dark">Low Income</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Card */}
      <div className="bg-white dark:bg-dark-50 rounded-xl shadow-lg border border-light-200 dark:border-dark-200/50 overflow-hidden mb-8">
        {/* Tab Navigation */}
        <div className="border-b border-light-200 dark:border-dark-200/50">
          <div className="flex overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`tab-btn px-6 py-4 text-sm font-medium border-b-2 focus:outline-none transition-colors ${
                    activeTab === tab.id
                      ? 'border-primary text-primary dark:text-primary-400'
                      : 'border-transparent text-dark-300 dark:text-light-300 hover:text-dark dark:hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5 mb-1 mx-auto" />
                  <span className="hidden md:block">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {/* Personal Info Tab */}
          {activeTab === 'personal' && (
            <form onSubmit={updatePersonalInfo} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-dark dark:text-white">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={personalInfo.name}
                    onChange={handlePersonalChange}
                    className="w-full px-4 py-3 rounded-xl bg-light-100 dark:bg-dark-100 border border-light-200 dark:border-dark-200 focus:ring-2 focus:ring-primary focus:border-transparent text-dark dark:text-white transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-dark dark:text-white">Email Address</label>
                  <input
                    type="email"
                    value={personalInfo.email}
                    readOnly
                    className="w-full px-4 py-3 rounded-xl bg-light-50 dark:bg-dark-200 border border-light-200 dark:border-dark-200 text-dark-300 dark:text-light-300 cursor-not-allowed"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-dark dark:text-white">Phone Number</label>
                  <input
                    type="text"
                    name="phone"
                    value={personalInfo.phone}
                    onChange={handlePersonalChange}
                    className="w-full px-4 py-3 rounded-xl bg-light-100 dark:bg-dark-100 border border-light-200 dark:border-dark-200 focus:ring-2 focus:ring-primary focus:border-transparent text-dark dark:text-white transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-dark dark:text-white">Date of Birth</label>
                  <input
                    type="date"
                    name="dob"
                    value={personalInfo.dob}
                    onChange={handlePersonalChange}
                    className="w-full px-4 py-3 rounded-xl bg-light-100 dark:bg-dark-100 border border-light-200 dark:border-dark-200 focus:ring-2 focus:ring-primary focus:border-transparent text-dark dark:text-white transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-dark dark:text-white">Country</label>
                  <input
                    type="text"
                    value={personalInfo.country}
                    readOnly
                    className="w-full px-4 py-3 rounded-xl bg-light-50 dark:bg-dark-200 border border-light-200 dark:border-dark-200 text-dark-300 dark:text-light-300 cursor-not-allowed"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-dark dark:text-white">Address</label>
                  <textarea
                    name="address"
                    rows="3"
                    value={personalInfo.address}
                    onChange={handlePersonalChange}
                    className="w-full px-4 py-3 rounded-xl bg-light-100 dark:bg-dark-100 border border-light-200 dark:border-dark-200 focus:ring-2 focus:ring-primary focus:border-transparent text-dark dark:text-white transition-all"
                  />
                </div>
              </div>
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading.personal}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-secondary hover:from-primary-600 hover:to-secondary-600 text-white font-medium flex items-center gap-2 transform transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Save className="w-5 h-5" />
                  <span>{loading.personal ? 'Updating...' : 'Update Profile'}</span>
                </button>
              </div>
            </form>
          )}

          {/* Password Tab */}
          {activeTab === 'security' && (
            <form onSubmit={updatePassword} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-dark dark:text-white">Current Password</label>
                  <div className="relative">
                    <input
                      type={showCurrentPassword ? 'text' : 'password'}
                      name="current_password"
                      value={passwordData.current_password}
                      onChange={handlePasswordChange}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-light-100 dark:bg-dark-100 border border-light-200 dark:border-dark-200 focus:ring-2 focus:ring-primary focus:border-transparent text-dark dark:text-white transition-all pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-dark-300 dark:text-light-300 hover:text-dark dark:hover:text-white"
                    >
                      {showCurrentPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-dark dark:text-white">New Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={passwordData.password}
                      onChange={handlePasswordChange}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-light-100 dark:bg-dark-100 border border-light-200 dark:border-dark-200 focus:ring-2 focus:ring-primary focus:border-transparent text-dark dark:text-white transition-all pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-dark-300 dark:text-light-300 hover:text-dark dark:hover:text-white"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {passwordData.password && (
                    <div className="mt-1">
                      <div className="h-1 w-full bg-light-200 dark:bg-dark-200 rounded-full overflow-hidden">
                        <div className={`h-full ${passwordStrength.color} transition-all duration-300`} style={{ width: passwordStrength.width }} />
                      </div>
                      <p className="text-xs mt-1 text-dark-300 dark:text-light-300">{passwordStrength.text}</p>
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-dark dark:text-white">Confirm New Password</label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      name="password_confirmation"
                      value={passwordData.password_confirmation}
                      onChange={handlePasswordChange}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-light-100 dark:bg-dark-100 border border-light-200 dark:border-dark-200 focus:ring-2 focus:ring-primary focus:border-transparent text-dark dark:text-white transition-all pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-dark-300 dark:text-light-300 hover:text-dark dark:hover:text-white"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-light-100 dark:bg-dark-100/50 border border-light-200 dark:border-dark-200/50">
                <h4 className="text-sm font-medium text-dark dark:text-white mb-2">Password Requirements</h4>
                <ul className="space-y-1">
                  <li className="flex items-center text-xs text-dark-300 dark:text-light-300">
                    <CheckCircle className="w-4 h-4 mr-2 text-secondary" />
                    Must be at least 8 characters long
                  </li>
                  <li className="flex items-center text-xs text-dark-300 dark:text-light-300">
                    <CheckCircle className="w-4 h-4 mr-2 text-secondary" />
                    Should contain at least one uppercase letter
                  </li>
                  <li className="flex items-center text-xs text-dark-300 dark:text-light-300">
                    <CheckCircle className="w-4 h-4 mr-2 text-secondary" />
                    Should contain at least one number
                  </li>
                  <li className="flex items-center text-xs text-dark-300 dark:text-light-300">
                    <CheckCircle className="w-4 h-4 mr-2 text-secondary" />
                    Should contain at least one special character
                  </li>
                </ul>
              </div>
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading.password}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-secondary hover:from-primary-600 hover:to-secondary-600 text-white font-medium flex items-center gap-2 transform transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Shield className="w-5 h-5" />
                  <span>{loading.password ? 'Updating...' : 'Update Password'}</span>
                </button>
              </div>
            </form>
          )}

          {/* Withdrawal Settings Tab */}
          {activeTab === 'withdrawal' && (
            <form onSubmit={updateWithdrawalInfo} className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-dark dark:text-white mb-4 flex items-center">
                  <Wallet className="w-5 h-5 mr-2 text-primary" />
                  Bank Transfer Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-dark dark:text-white">Bank Name</label>
                    <input
                      type="text"
                      name="bank_name"
                      value={withdrawalInfo.bank_name}
                      onChange={handleWithdrawalChange}
                      placeholder="Enter bank name"
                      className="w-full px-4 py-3 rounded-xl bg-light-100 dark:bg-dark-100 border border-light-200 dark:border-dark-200 focus:ring-2 focus:ring-primary focus:border-transparent text-dark dark:text-white transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-dark dark:text-white">Account Name</label>
                    <input
                      type="text"
                      name="account_name"
                      value={withdrawalInfo.account_name}
                      onChange={handleWithdrawalChange}
                      placeholder="Enter account name"
                      className="w-full px-4 py-3 rounded-xl bg-light-100 dark:bg-dark-100 border border-light-200 dark:border-dark-200 focus:ring-2 focus:ring-primary focus:border-transparent text-dark dark:text-white transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-dark dark:text-white">Account Number</label>
                    <input
                      type="text"
                      name="account_no"
                      value={withdrawalInfo.account_no}
                      onChange={handleWithdrawalChange}
                      placeholder="Enter account number"
                      className="w-full px-4 py-3 rounded-xl bg-light-100 dark:bg-dark-100 border border-light-200 dark:border-dark-200 focus:ring-2 focus:ring-primary focus:border-transparent text-dark dark:text-white transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-dark dark:text-white">Swift Code</label>
                    <input
                      type="text"
                      name="swiftcode"
                      value={withdrawalInfo.swiftcode}
                      onChange={handleWithdrawalChange}
                      placeholder="Enter swift code"
                      className="w-full px-4 py-3 rounded-xl bg-light-100 dark:bg-dark-100 border border-light-200 dark:border-dark-200 focus:ring-2 focus:ring-primary focus:border-transparent text-dark dark:text-white transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-light-200 dark:border-dark-200/50">
                <h3 className="text-lg font-bold text-dark dark:text-white mb-4 flex items-center">
                  <Wallet className="w-5 h-5 mr-2 text-primary" />
                  Cryptocurrency Wallets
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-dark dark:text-white flex items-center">
                      <span className="w-6 h-6 mr-2 rounded-full bg-accent-50 dark:bg-accent-900/20 flex items-center justify-center">
                        <span className="w-4 h-4 text-accent">₿</span>
                      </span>
                      Bitcoin (BTC)
                    </label>
                    <input
                      type="text"
                      name="btc_address"
                      value={withdrawalInfo.btc_address}
                      onChange={handleWithdrawalChange}
                      placeholder="Enter Bitcoin address"
                      className="w-full px-4 py-3 rounded-xl bg-light-100 dark:bg-dark-100 border border-light-200 dark:border-dark-200 focus:ring-2 focus:ring-primary focus:border-transparent text-dark dark:text-white transition-all font-mono text-sm"
                    />
                    <p className="text-xs text-dark-300 dark:text-light-300">
                      Enter your Bitcoin Address that will be used to withdraw your funds
                    </p>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-dark dark:text-white flex items-center">
                      <span className="w-6 h-6 mr-2 rounded-full bg-tertiary-50 dark:bg-tertiary-900/20 flex items-center justify-center">
                        <span className="w-4 h-4 text-tertiary">Ξ</span>
                      </span>
                      Ethereum (ETH)
                    </label>
                    <input
                      type="text"
                      name="eth_address"
                      value={withdrawalInfo.eth_address}
                      onChange={handleWithdrawalChange}
                      placeholder="Enter Ethereum address"
                      className="w-full px-4 py-3 rounded-xl bg-light-100 dark:bg-dark-100 border border-light-200 dark:border-dark-200 focus:ring-2 focus:ring-primary focus:border-transparent text-dark dark:text-white transition-all font-mono text-sm"
                    />
                    <p className="text-xs text-dark-300 dark:text-light-300">
                      Enter your Ethereum Address that will be used to withdraw your funds
                    </p>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-dark dark:text-white flex items-center">
                      <span className="w-6 h-6 mr-2 rounded-full bg-secondary-50 dark:bg-secondary-900/20 flex items-center justify-center">
                        <span className="w-4 h-4 text-secondary">Ł</span>
                      </span>
                      Litecoin (LTC)
                    </label>
                    <input
                      type="text"
                      name="ltc_address"
                      value={withdrawalInfo.ltc_address}
                      onChange={handleWithdrawalChange}
                      placeholder="Enter Litecoin address"
                      className="w-full px-4 py-3 rounded-xl bg-light-100 dark:bg-dark-100 border border-light-200 dark:border-dark-200 focus:ring-2 focus:ring-primary focus:border-transparent text-dark dark:text-white transition-all font-mono text-sm"
                    />
                    <p className="text-xs text-dark-300 dark:text-light-300">
                      Enter your Litecoin Address that will be used to withdraw your funds
                    </p>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-dark dark:text-white flex items-center">
                      <span className="w-6 h-6 mr-2 rounded-full bg-primary-50 dark:bg-primary-900/20 flex items-center justify-center">
                        <span className="w-4 h-4 text-primary">₮</span>
                      </span>
                      USDT (TRC20)
                    </label>
                    <input
                      type="text"
                      name="usdt_address"
                      value={withdrawalInfo.usdt_address}
                      onChange={handleWithdrawalChange}
                      placeholder="Enter USDT.TRC20 address"
                      className="w-full px-4 py-3 rounded-xl bg-light-100 dark:bg-dark-100 border border-light-200 dark:border-dark-200 focus:ring-2 focus:ring-primary focus:border-transparent text-dark dark:text-white transition-all font-mono text-sm"
                    />
                    <p className="text-xs text-dark-300 dark:text-light-300">
                      Enter your USDT.TRC20 wallet Address that will be used to withdraw your funds
                    </p>
                  </div>
                </div>
              </div>
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading.withdrawal}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-secondary hover:from-primary-600 hover:to-secondary-600 text-white font-medium flex items-center gap-2 transform transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Save className="w-5 h-5" />
                  <span>{loading.withdrawal ? 'Saving...' : 'Save Changes'}</span>
                </button>
              </div>
            </form>
          )}

          {/* Preferences Tab */}
          {activeTab === 'preferences' && (
            <form onSubmit={updatePreferences} className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-dark dark:text-white mb-4 flex items-center">
                  <Bell className="w-5 h-5 mr-2 text-primary" />
                  Email Notifications
                </h3>
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-light-50 dark:bg-dark-100 border border-light-200 dark:border-dark-200/50">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div>
                        <h4 className="text-base font-medium text-dark dark:text-white">Withdrawal Confirmation</h4>
                        <p className="text-sm text-dark-300 dark:text-light-300">
                          Send confirmation OTP to my email when withdrawing funds
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <label className="inline-flex items-center">
                          <input
                            type="radio"
                            name="otpsend"
                            value="Yes"
                            checked={preferences.otpsend === 'Yes'}
                            onChange={(e) => handlePrefChange('otpsend', e.target.value)}
                            className="hidden peer"
                          />
                          <span className="flex items-center justify-center w-16 h-8 rounded-full bg-light-200 dark:bg-dark-200 text-dark-300 dark:text-light-300 text-sm font-medium cursor-pointer peer-checked:bg-secondary peer-checked:text-white transition-colors">
                            Yes
                          </span>
                        </label>
                        <label className="inline-flex items-center">
                          <input
                            type="radio"
                            name="otpsend"
                            value="No"
                            checked={preferences.otpsend === 'No'}
                            onChange={(e) => handlePrefChange('otpsend', e.target.value)}
                            className="hidden peer"
                          />
                          <span className="flex items-center justify-center w-16 h-8 rounded-full bg-light-200 dark:bg-dark-200 text-dark-300 dark:text-light-300 text-sm font-medium cursor-pointer peer-checked:bg-danger peer-checked:text-white transition-colors">
                            No
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-light-50 dark:bg-dark-100 border border-light-200 dark:border-dark-200/50">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div>
                        <h4 className="text-base font-medium text-dark dark:text-white">Profit Notifications</h4>
                        <p className="text-sm text-dark-300 dark:text-light-300">
                          Send me email when I get profit from investments
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <label className="inline-flex items-center">
                          <input
                            type="radio"
                            name="roiemail"
                            value="Yes"
                            checked={preferences.roiemail === 'Yes'}
                            onChange={(e) => handlePrefChange('roiemail', e.target.value)}
                            className="hidden peer"
                          />
                          <span className="flex items-center justify-center w-16 h-8 rounded-full bg-light-200 dark:bg-dark-200 text-dark-300 dark:text-light-300 text-sm font-medium cursor-pointer peer-checked:bg-secondary peer-checked:text-white transition-colors">
                            Yes
                          </span>
                        </label>
                        <label className="inline-flex items-center">
                          <input
                            type="radio"
                            name="roiemail"
                            value="No"
                            checked={preferences.roiemail === 'No'}
                            onChange={(e) => handlePrefChange('roiemail', e.target.value)}
                            className="hidden peer"
                          />
                          <span className="flex items-center justify-center w-16 h-8 rounded-full bg-light-200 dark:bg-dark-200 text-dark-300 dark:text-light-300 text-sm font-medium cursor-pointer peer-checked:bg-danger peer-checked:text-white transition-colors">
                            No
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-light-50 dark:bg-dark-100 border border-light-200 dark:border-dark-200/50">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div>
                        <h4 className="text-base font-medium text-dark dark:text-white">Plan Expiration</h4>
                        <p className="text-sm text-dark-300 dark:text-light-300">
                          Send me email when my investment plan expires
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <label className="inline-flex items-center">
                          <input
                            type="radio"
                            name="invplanemail"
                            value="Yes"
                            checked={preferences.invplanemail === 'Yes'}
                            onChange={(e) => handlePrefChange('invplanemail', e.target.value)}
                            className="hidden peer"
                          />
                          <span className="flex items-center justify-center w-16 h-8 rounded-full bg-light-200 dark:bg-dark-200 text-dark-300 dark:text-light-300 text-sm font-medium cursor-pointer peer-checked:bg-secondary peer-checked:text-white transition-colors">
                            Yes
                          </span>
                        </label>
                        <label className="inline-flex items-center">
                          <input
                            type="radio"
                            name="invplanemail"
                            value="No"
                            checked={preferences.invplanemail === 'No'}
                            onChange={(e) => handlePrefChange('invplanemail', e.target.value)}
                            className="hidden peer"
                          />
                          <span className="flex items-center justify-center w-16 h-8 rounded-full bg-light-200 dark:bg-dark-200 text-dark-300 dark:text-light-300 text-sm font-medium cursor-pointer peer-checked:bg-danger peer-checked:text-white transition-colors">
                            No
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading.preferences}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-secondary hover:from-primary-600 hover:to-secondary-600 text-white font-medium flex items-center gap-2 transform transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Save className="w-5 h-5" />
                  <span>{loading.preferences ? 'Saving...' : 'Save Preferences'}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default AccountSettings;