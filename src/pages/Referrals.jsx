import { useState } from 'react';
import { Share2, Copy, User, Link, UserPlus, Gift, BarChart2, Users, Check } from 'lucide-react';
import toast from 'react-hot-toast';

const Referrals = () => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedId, setCopiedId] = useState(false);
  
  // Demo data – replace with actual API data
  const referralStats = {
    totalReferrals: 0,
    totalEarnings: 0,
    referralLink: 'https://account.teslastockspacex.com/ref/Lowincomehomes47@gmail.com',
    referralId: 'Lowincomehomes47@gmail.com',
    sponsor: null, // No sponsor for this demo
  };
  
  const referralsList = []; // Empty array for now – fill with API data
  
  const copyToClipboard = async (text, type) => {
    try {
      await navigator.clipboard.writeText(text);
      if (type === 'link') {
        setCopiedLink(true);
        toast.success('Referral link copied!');
        setTimeout(() => setCopiedLink(false), 2000);
      } else {
        setCopiedId(true);
        toast.success('Referral ID copied!');
        setTimeout(() => setCopiedId(false), 2000);
      }
    } catch (err) {
      toast.error('Failed to copy. Please try again.');
    }
  };
  
  return (
    <div className="p-4 md:p-6 pb-20 md:pb-8 overflow-x-hidden flex-grow">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold dark:text-white text-dark">Refer Friends &amp; Earn</h1>
        <p className="mt-1 text-sm dark:text-gray-400 text-gray-600">
          Invite others to join the Tesla Stock SpaceX community
        </p>
      </div>
      
      {/* Referral Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column – Referral Info & How It Works */}
        <div className="lg:col-span-2">
          <div className="dark:bg-dark-50 bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Card Header */}
            <div className="dark:bg-dark-100/50 bg-light-100/50 px-6 py-4 border-b dark:border-dark-200/50 border-light-200/50">
              <h2 className="text-lg font-semibold dark:text-white text-dark flex items-center">
                <Share2 className="h-5 w-5 mr-2 text-primary" />
                Share Your Referral Link
              </h2>
            </div>
            
            {/* Card Body */}
            <div className="p-6">
              {/* Referral Link Section */}
              <div className="mb-8">
                <p className="mb-3 dark:text-gray-300 text-gray-700">
                  Share your unique referral link with friends and earn rewards when they join:
                </p>
                <div className="flex items-center">
                  <div className="relative flex-grow">
                    <input
                      type="text"
                      value={referralStats.referralLink}
                      readOnly
                      className="block w-full px-4 py-3 dark:bg-dark-100 bg-light-50 border dark:border-dark-200 border-light-300 rounded-l-lg shadow-sm dark:text-white text-dark focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                  <button
                    onClick={() => copyToClipboard(referralStats.referralLink, 'link')}
                    className="px-4 py-3 bg-primary hover:bg-primary-600 text-white rounded-r-lg transition-colors flex items-center"
                  >
                    {copiedLink ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
                    <span className="ml-2 hidden sm:inline">
                      {copiedLink ? 'Copied!' : 'Copy'}
                    </span>
                  </button>
                </div>
              </div>
              
              {/* Referral ID & Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Referral ID */}
                <div className="dark:bg-dark-100/50 bg-light-100/50 rounded-lg p-5">
                  <p className="text-sm dark:text-gray-400 text-gray-600 mb-2">Your Referral ID</p>
                  <div className="flex items-center">
                    <span className="text-xl font-bold dark:text-primary text-primary">
                      {referralStats.referralId}
                    </span>
                    <button
                      onClick={() => copyToClipboard(referralStats.referralId, 'id')}
                      className="ml-2 p-1 dark:text-gray-400 text-gray-500 hover:text-primary transition-colors"
                    >
                      {copiedId ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                
                {/* Your Sponsor */}
                <div className="dark:bg-dark-100/50 bg-light-100/50 rounded-lg p-5">
                  <p className="text-sm dark:text-gray-400 text-gray-600 mb-2">Your Sponsor</p>
                  <div className="flex items-center">
                    <User className="h-5 w-5 mr-2 dark:text-gray-300 text-gray-600" />
                    <span className="font-medium dark:text-white text-dark">
                      {referralStats.sponsor || 'null'}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* How it Works Section */}
              <div className="mt-8">
                <h3 className="text-lg font-semibold dark:text-white text-dark mb-4">How Referrals Work</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex flex-col items-center text-center p-4">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                      <Link className="h-6 w-6 text-primary" />
                    </div>
                    <h4 className="text-sm font-medium dark:text-white text-dark mb-1">Share Your Link</h4>
                    <p className="text-xs dark:text-gray-400 text-gray-600">Send your unique referral link to friends</p>
                  </div>
                  <div className="flex flex-col items-center text-center p-4">
                    <div className="h-12 w-12 rounded-full bg-secondary/10 flex items-center justify-center mb-3">
                      <UserPlus className="h-6 w-6 text-secondary" />
                    </div>
                    <h4 className="text-sm font-medium dark:text-white text-dark mb-1">Friends Sign Up</h4>
                    <p className="text-xs dark:text-gray-400 text-gray-600">They register and become your referral</p>
                  </div>
                  <div className="flex flex-col items-center text-center p-4">
                    <div className="h-12 w-12 rounded-full bg-tertiary/10 flex items-center justify-center mb-3">
                      <Gift className="h-6 w-6 text-tertiary" />
                    </div>
                    <h4 className="text-sm font-medium dark:text-white text-dark mb-1">Earn Rewards</h4>
                    <p className="text-xs dark:text-gray-400 text-gray-600">Receive benefits when they invest</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right Column – Referral Stats */}
        <div>
          <div className="dark:bg-dark-50 bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Card Header */}
            <div className="dark:bg-dark-100/50 bg-light-100/50 px-6 py-4 border-b dark:border-dark-200/50 border-light-200/50">
              <h2 className="text-lg font-semibold dark:text-white text-dark flex items-center">
                <BarChart2 className="h-5 w-5 mr-2 text-primary" />
                Referral Statistics
              </h2>
            </div>
            
            {/* Card Body */}
            <div className="p-6">
              {/* Total Referrals */}
              <div className="dark:bg-dark-100/50 bg-light-100/50 rounded-lg p-5 mb-6">
                <p className="text-sm dark:text-gray-400 text-gray-600 mb-1">Total Referrals</p>
                <div className="flex items-center">
                  <span className="text-3xl font-bold dark:text-white text-dark">{referralStats.totalReferrals}</span>
                  <span className="ml-2 text-xs px-2 py-1 rounded-full dark:bg-dark-100 bg-light-200 dark:text-gray-300 text-gray-700">
                    Users
                  </span>
                </div>
              </div>
              
              {/* Referral Earnings */}
              <div className="dark:bg-dark-100/50 bg-light-100/50 rounded-lg p-5">
                <p className="text-sm dark:text-gray-400 text-gray-600 mb-1">Referral Earnings</p>
                <div className="flex items-center">
                  <span className="text-3xl font-bold dark:text-white text-dark">
                    ${referralStats.totalEarnings.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Referrals Table */}
      <div className="mt-6">
        <div className="dark:bg-dark-50 bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Card Header */}
          <div className="dark:bg-dark-100/50 bg-light-100/50 px-6 py-4 border-b dark:border-dark-200/50 border-light-200/50">
            <h2 className="text-lg font-semibold dark:text-white text-dark flex items-center">
              <Users className="h-5 w-5 mr-2 text-primary" />
              Your Referrals
            </h2>
          </div>
          
          {/* Card Body – Table */}
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y dark:divide-dark-100 divide-light-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium dark:text-gray-400 text-gray-500 uppercase tracking-wider">
                      Client Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium dark:text-gray-400 text-gray-500 uppercase tracking-wider">
                      Ref. Level
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium dark:text-gray-400 text-gray-500 uppercase tracking-wider">
                      Parent
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium dark:text-gray-400 text-gray-500 uppercase tracking-wider">
                      Client Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium dark:text-gray-400 text-gray-500 uppercase tracking-wider">
                      Date Registered
                    </th>
                  </tr>
                </thead>
                <tbody className="dark:bg-dark-50 bg-white divide-y dark:divide-dark-100 divide-light-200">
                  {referralsList.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="px-6 py-8 text-center text-sm text-gray-500 dark:text-gray-400">
                        No referrals yet. Share your link to get started!
                      </td>
                    </tr>
                  ) : (
                    referralsList.map((referral, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium dark:text-white text-dark">
                          {referral.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm dark:text-gray-300 text-gray-600">
                          {referral.level}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm dark:text-gray-300 text-gray-600">
                          {referral.parent}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm dark:text-gray-300 text-gray-600">
                          {referral.status}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm dark:text-gray-300 text-gray-600">
                          {referral.date}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Referrals;