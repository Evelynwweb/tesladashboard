const TradingHistory = () => {
  return (
    <div className="p-4 md:p-6 pb-20 md:pb-8 overflow-x-hidden flex-grow">
      {/* Toast container (optional, kept for consistency) */}
      <div id="toast-container" className="fixed top-4 right-4 z-[9999] flex flex-col gap-3" />

      {/* Page Header */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-bold text-dark dark:text-white flex items-center">
            <svg
              className="w-6 h-6 mr-2"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.75 2.44995C11.44 1.85995 12.57 1.85995 13.27 2.44995L14.85 3.81005C15.15 4.07005 15.71 4.28005 16.11 4.28005H17.81C18.87 4.28005 19.74 5.14996 19.74 6.20996V7.91003C19.74 8.30003 19.95 8.87003 20.21 9.17003L21.57 10.75C22.16 11.44 22.16 12.57 21.57 13.27L20.21 14.85C19.95 15.15 19.74 15.71 19.74 16.11V17.8101C19.74 18.8701 18.87 19.7401 17.81 19.7401H16.11C15.72 19.7401 15.15 19.95 14.85 20.21L13.27 21.5701C12.58 22.1601 11.45 22.1601 10.75 21.5701L9.17003 20.21C8.87003 19.95 8.31001 19.7401 7.91001 19.7401H6.18994C5.12994 19.7401 4.25998 18.8701 4.25998 17.8101V16.11C4.25998 15.72 4.04998 15.15 3.78998 14.85L2.42998 13.26C1.83998 12.57 1.83998 11.45 2.42998 10.75L3.78998 9.17003C4.04998 8.87003 4.25998 8.31003 4.25998 7.92003V6.20996C4.25998 5.14996 5.12994 4.28005 6.18994 4.28005H7.91001C8.30001 4.28005 8.87003 4.07005 9.17003 3.81005L10.75 2.44995Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8.5 12H15.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M14 15L17 12L14 9"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>Your ROI History</span>
          </h1>
        </div>
      </div>

      {/* ROI Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 mb-6">
        {/* Total Returns Card */}
        <div className="bg-white dark:bg-dark-50 rounded-xl shadow-sm border border-light-200 dark:border-dark-200/50 p-4">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
              <svg
                className="w-6 h-6 text-primary"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M9.5 13.75C9.5 14.72 10.25 15.5 11.17 15.5H13.05C13.85 15.5 14.5 14.82 14.5 13.97C14.5 13.06 14.1 12.73 13.51 12.52L10.5 11.47C9.91 11.26 9.51001 10.94 9.51001 10.02C9.51001 9.18 10.16 8.49001 10.96 8.49001H12.84C13.76 8.49001 14.51 9.27001 14.51 10.24"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 7.5V16.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2C17.52 2 22 6.48 22 12Z"
                  fill="currentColor"
                  fillOpacity="0.15"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div>
              <p className="text-xs text-dark-300 dark:text-light-300 uppercase font-medium">
                Total Returns
              </p>
              <p className="text-xl font-bold text-dark dark:text-white mt-1">
                $0.00
              </p>
            </div>
          </div>
        </div>

        {/* Last Return Card */}
        <div className="bg-white dark:bg-dark-50 rounded-xl shadow-sm border border-light-200 dark:border-dark-200/50 p-4">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full bg-green-50 dark:bg-green-900/30 flex items-center justify-center mr-4">
              <svg
                className="w-6 h-6 text-green-500 dark:text-green-400"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z"
                  fill="currentColor"
                  fillOpacity="0.15"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8.46997 10.64L12 14.16L15.53 10.64"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div>
              <p className="text-xs text-dark-300 dark:text-light-300 uppercase font-medium">
                Last Return
              </p>
              <p className="text-xl font-bold text-dark dark:text-white mt-1">
                $0.00
              </p>
              <p className="text-xs text-dark-400 dark:text-light-500 mt-1">
                No returns yet
              </p>
            </div>
          </div>
        </div>

        {/* Total Transactions Card */}
        <div className="bg-white dark:bg-dark-50 rounded-xl shadow-sm border border-light-200 dark:border-dark-200/50 p-4">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center mr-4">
              <svg
                className="w-6 h-6 text-blue-500 dark:text-blue-400"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M3.16992 7.43994L11.9999 12.5499L20.7699 7.46994"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 21.61V12.54"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9.92988 2.48004L4.58988 5.44004C3.37988 6.11004 2.38989 7.79004 2.38989 9.17004V14.82C2.38989 16.2 3.37988 17.88 4.58988 18.55L9.92988 21.52C11.0699 22.15 12.9399 22.15 14.0799 21.52L19.4199 18.55C20.6299 17.88 21.6199 16.2 21.6199 14.82V9.17004C21.6199 7.79004 20.6299 6.11004 19.4199 5.44004L14.0799 2.47004C12.9299 1.84004 11.0699 1.84004 9.92988 2.48004Z"
                  fill="currentColor"
                  fillOpacity="0.15"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div>
              <p className="text-xs text-dark-300 dark:text-light-300 uppercase font-medium">
                Total Transactions
              </p>
              <p className="text-xl font-bold text-dark dark:text-white mt-1">
                0
              </p>
              <p className="text-xs text-dark-400 dark:text-light-500 mt-1">
                ROI payments received
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ROI History Table */}
      <div className="bg-white dark:bg-dark-50 rounded-xl shadow-sm border border-light-200 dark:border-dark-200/50 overflow-hidden">
        <div className="p-4 border-b border-light-200 dark:border-dark-200/50">
          <h2 className="text-base font-bold text-dark dark:text-white flex items-center">
            <svg
              className="w-5 h-5 mr-2 text-primary"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M3.16992 7.43994L11.9999 12.5499L20.7699 7.46994"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 21.61V12.54"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2.39014 9.17006V14.8201C2.39014 16.0001 3.14014 17.0401 4.19014 17.5601L10.7401 21.0701C11.7101 21.5401 12.8501 21.5401 13.8201 21.0701L20.3701 17.5601C21.4201 17.0401 22.1701 16.0001 22.1701 14.8201V9.17006C22.1701 7.99006 21.4201 6.95006 20.3701 6.43006L13.8201 2.92006C12.8501 2.45006 11.7101 2.45006 10.7401 2.92006L4.19014 6.43006C3.14014 6.95006 2.39014 7.99006 2.39014 9.17006Z"
                fill="currentColor"
                fillOpacity="0.15"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M16.9998 13.2401V9.58014L7.50977 4.1001"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>Return on Investment History</span>
          </h2>
        </div>

        <div className="p-5">
          <div className="overflow-x-auto">
            <table className="w-full min-w-full divide-y divide-light-200 dark:divide-dark-200/50">
              <thead>
                <tr className="bg-light-50 dark:bg-dark-200/50">
                  <th className="px-4 py-3.5 text-left text-xs font-medium text-dark-500 dark:text-light-400 uppercase tracking-wider">
                    Investment Plan
                  </th>
                  <th className="px-4 py-3.5 text-left text-xs font-medium text-dark-500 dark:text-light-400 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-4 py-3.5 text-left text-xs font-medium text-dark-500 dark:text-light-400 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-4 py-3.5 text-left text-xs font-medium text-dark-500 dark:text-light-400 uppercase tracking-wider">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-dark-50 divide-y divide-light-200 dark:divide-dark-200/30">
                {/* Empty State */}
                <tr>
                  <td
                    colSpan="4"
                    className="px-4 py-8 text-sm text-center text-dark-400 dark:text-light-400"
                  >
                    <div className="flex flex-col items-center justify-center">
                      <svg
                        className="w-10 h-10 mb-3 text-dark-300 dark:text-light-600"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M10.75 2.44995C11.44 1.85995 12.57 1.85995 13.27 2.44995L14.85 3.81005C15.15 4.07005 15.71 4.28005 16.11 4.28005H17.81C18.87 4.28005 19.74 5.14996 19.74 6.20996V7.91003C19.74 8.30003 19.95 8.87003 20.21 9.17003L21.57 10.75C22.16 11.44 22.16 12.57 21.57 13.27L20.21 14.85C19.95 15.15 19.74 15.71 19.74 16.11V17.8101C19.74 18.8701 18.87 19.7401 17.81 19.7401H16.11C15.72 19.7401 15.15 19.95 14.85 20.21L13.27 21.5701C12.58 22.1601 11.45 22.1601 10.75 21.5701L9.17003 20.21C8.87003 19.95 8.31001 19.7401 7.91001 19.7401H6.18994C5.12994 19.7401 4.25998 18.8701 4.25998 17.8101V16.11C4.25998 15.72 4.04998 15.15 3.78998 14.85L2.42998 13.26C1.83998 12.57 1.83998 11.45 2.42998 10.75L3.78998 9.17003C4.04998 8.87003 4.25998 8.31003 4.25998 7.92003V6.20996C4.25998 5.14996 5.12994 4.28005 6.18994 4.28005H7.91001C8.30001 4.28005 8.87003 4.07005 9.17003 3.81005L10.75 2.44995Z"
                          fill="currentColor"
                          fillOpacity="0.15"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M8 12H16"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <p>No ROI history found</p>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradingHistory;