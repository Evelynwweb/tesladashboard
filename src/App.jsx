import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/Layout';
import PrivateRoute from './components/PrivateRoute';

import Dashboard from './pages/Dashboard';
import Deposits from './pages/Deposits';
import TransactionHistory from './pages/TransactionHistory';
import ConfirmPassword from './pages/ConfirmPassword';
import Withdrawals from './pages/Withdrawals';
import InvestmentPlans from './pages/InvestmentPlans';
import Stocks from './pages/Stocks';
import CopyTrade from './pages/CopyTrade';
import TradingBots from './pages/TradingBots';
import MyInvestments from './pages/MyInvestments';
import TradingHistory from './pages/TradingHistory';
import Referrals from './pages/Referrals';
import AccountSettings from './pages/AccountSettings';
// PreRegisterVerification import removed
import Register from './pages/Register';
import Login from './pages/Login';
import WithdrawFunds from './pages/WithdrawFunds';
import DepositPayment from './pages/DepositPayment';
import BuyTesla from './pages/BuyTesla';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* Protected routes (require login) */}
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path="dashboard/deposits" element={<PrivateRoute><Deposits /></PrivateRoute>} />
            <Route path="dashboard/confirm-password" element={<PrivateRoute><ConfirmPassword /></PrivateRoute>} />
            <Route path="dashboard/withdrawals" element={<PrivateRoute><Withdrawals /></PrivateRoute>} />
            <Route path="dashboard/buy-plan" element={<PrivateRoute><InvestmentPlans /></PrivateRoute>} />
            <Route path="dashboard/buy-stocks" element={<PrivateRoute><Stocks /></PrivateRoute>} />
            <Route path="dashboard/copy-trade" element={<PrivateRoute><CopyTrade /></PrivateRoute>} />
            <Route path="dashboard/buy-bot" element={<PrivateRoute><TradingBots /></PrivateRoute>} />
            <Route path="dashboard/myplans/All" element={<PrivateRoute><MyInvestments /></PrivateRoute>} />
            <Route path="dashboard/tradinghistory" element={<PrivateRoute><TradingHistory /></PrivateRoute>} />
            <Route path="dashboard/referuser" element={<PrivateRoute><Referrals /></PrivateRoute>} />
            <Route path="dashboard/account-settings" element={<PrivateRoute><AccountSettings /></PrivateRoute>} />
            <Route path="dashboard/accounthistory" element={<PrivateRoute><TransactionHistory /></PrivateRoute>} />
            <Route path="dashboard/withdraw-funds" element={<PrivateRoute><WithdrawFunds /></PrivateRoute>} />
            <Route path="dashboard/deposit-payment" element={<PrivateRoute><DepositPayment /></PrivateRoute>} />
            <Route path="dashboard/buy-tesla" element={<PrivateRoute><BuyTesla /></PrivateRoute>} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Route>

          {/* Public authentication routes – now only register and login */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;