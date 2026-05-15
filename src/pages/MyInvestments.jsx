import { Wallet } from 'lucide-react';
import { Link } from 'react-router-dom';

// SVG Icons used in the page
const InfoCircleIcon = () => (
  <svg className="w-10 h-10 text-dark-300 dark:text-light-300" viewBox="0 0 24 24" fill="none">
    <path d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z" fill="currentColor" fillOpacity="0.2" />
    <path d="M12 8V13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M11.9946 16H12.0036" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const BuyPlanIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
    <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" fill="currentColor" fillOpacity="0.2" />
    <path d="M3.40991 22C3.40991 18.13 7.25991 15 11.9999 15C12.9599 15 13.8899 15.13 14.7599 15.37" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M22 18C22 18.32 21.96 18.63 21.88 18.93C21.79 19.33 21.63 19.72 21.42 20.06C20.73 21.22 19.46 22 18 22C16.97 22 16.04 21.61 15.34 20.97C15.04 20.71 14.78 20.4 14.58 20.06C14.21 19.46 14 18.75 14 18C14 16.92 14.43 15.93 15.13 15.21C15.86 14.46 16.88 14 18 14C19.18 14 20.25 14.51 20.97 15.33C21.61 16.04 22 16.98 22 18Z" fill="currentColor" fillOpacity="0.2" />
    <path d="M19.49 17.98H16.51" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M18 16.52V19.51" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const MyInvestments = () => {
  return (
    <div className="p-4 md:p-6 pb-20 md:pb-8 overflow-x-hidden flex-grow">
      {/* Page Header */}
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-3xl -z-10 blur-xl opacity-50" />
        <div className="px-6 py-8 rounded-3xl bg-gradient-to-r from-primary/5 to-secondary/5 backdrop-blur-sm border border-white/10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold dark:text-white text-dark">My Investment</h1>
              <p className="mt-2 text-base dark:text-gray-300 text-gray-600">All Investments</p>
            </div>
            <div>
              <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/10 dark:bg-dark-50/50 backdrop-blur-sm border border-white/20 dark:border-dark-200/50">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/20 text-primary">
                  <Wallet className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs dark:text-gray-400 text-gray-500">Total Investments</p>
                  <p className="text-lg font-semibold dark:text-white text-dark">$0.00</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content: Empty State */}
      <div className="space-y-6">
        <div className="bg-white dark:bg-dark-50 rounded-xl shadow-sm border border-light-200 dark:border-dark-200/50 p-10 text-center">
          <div className="flex flex-col items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-light-100 dark:bg-dark-100 flex items-center justify-center mb-4">
              <InfoCircleIcon />
            </div>
            <h3 className="text-xl font-bold text-dark dark:text-white mb-2">No Investment Plans</h3>
            <p className="text-dark-300 dark:text-light-300 mb-6 max-w-md mx-auto">
              You do not have an investment plan at the moment or no value match your query.
            </p>
            <Link
              to="/dashboard/buy-plan"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-primary to-secondary hover:from-primary-600 hover:to-secondary-600 text-white font-medium inline-flex items-center gap-2 transform transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-primary/20"
            >
              <BuyPlanIcon />
              <span>Buy a plan</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyInvestments;