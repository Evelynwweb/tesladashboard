import { useState, useEffect } from 'react'
import { Wallet } from 'lucide-react'
import toast from 'react-hot-toast'

const TradingViewWidget = ({ symbol }) => {
  const widgetUrl = `https://s.tradingview.com/widgetembed/?frameElementId=tradingview_${symbol.replace(/[^a-zA-Z]/g, '')}&symbol=${symbol}&interval=1&hidesidetoolbar=1&theme=dark&style=1&timezone=Etc/UTC&studies=[]`

  return (
    <div className="tradingview-widget-container border-b border-light-200 dark:border-dark-200/50" style={{ width: '100%', height: '150px' }}>
      <iframe
        scrolling="no"
        allowTransparency="true"
        frameBorder="0"
        src={widgetUrl}
        title={`${symbol} widget`}
        style={{ userSelect: 'none', boxSizing: 'border-box', display: 'block', height: '100%', width: '100%' }}
      />
    </div>
  )
}

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
)

const Stocks = () => {
  const [stocks, setStocks] = useState([])
  const [balance, setBalance] = useState(0)
  const [amounts, setAmounts] = useState({})
  const [loading, setLoading] = useState({})
  const [pageLoading, setPageLoading] = useState(true)

  const API_URL = import.meta.env.VITE_API_URL

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [stocksRes, balanceRes] = await Promise.all([
          fetch(`${API_URL}/stocks`),
          fetch(`${API_URL}/dashboard`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
          })
        ])
        const stocksData = await stocksRes.json()
        const balanceData = await balanceRes.json()

        if (stocksRes.ok) {
          setStocks(stocksData)
        } else {
          toast.error('Could not load stocks')
        }
        if (balanceRes.ok) {
          setBalance(balanceData.user.balance)
        }
      } catch (err) {
        toast.error('Network error')
      } finally {
        setPageLoading(false)
      }
    }
    fetchData()
  }, [API_URL])

  const handleAmountChange = (stockId, value) => {
    setAmounts(prev => ({ ...prev, [stockId]: value }))
  }

  const handleSubmit = async (stock, e) => {
    e.preventDefault()
    const amount = amounts[stock.stockId]

    if (!amount || amount < stock.min || amount > stock.max) {
      toast.error(`Amount must be between $${stock.min.toLocaleString()} and $${stock.max.toLocaleString()}`)
      return
    }
    if (amount > balance) {
      toast.error('Insufficient balance. Please deposit first.')
      return
    }

    setLoading(prev => ({ ...prev, [stock.stockId]: true }))

    try {
      const res = await fetch(`${API_URL}/stocks/invest`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          stockId: stock.stockId,
          stockName: stock.name,
          symbol: stock.symbol,
          amount,
          duration: stock.duration
        })
      })
      const data = await res.json()
      if (res.ok) {
        toast.success(`Successfully invested $${amount} in ${stock.name}`)
        setBalance(prev => prev - amount)
        setAmounts(prev => ({ ...prev, [stock.stockId]: '' }))
      } else {
        toast.error(data.message || 'Investment failed')
      }
    } catch (err) {
      toast.error('Network error')
    } finally {
      setLoading(prev => ({ ...prev, [stock.stockId]: false }))
    }
  }

  if (pageLoading) {
    return (
      <div className="p-4 md:p-6 flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="p-4 md:p-6 pb-20 md:pb-8 overflow-x-hidden flex-grow">
      {/* Page Header */}
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-3xl -z-10 blur-xl opacity-50" />
        <div className="px-6 py-8 rounded-3xl bg-gradient-to-r from-primary/5 to-secondary/5 backdrop-blur-sm border border-white/10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold dark:text-white text-dark">Stocks</h1>
              <p className="mt-2 text-base dark:text-gray-300 text-gray-600">Grow your wealth by investing in top-performing stocks</p>
            </div>
            <div>
              <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/10 dark:bg-dark-50/50 backdrop-blur-sm border border-white/20 dark:border-dark-200/50">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/20 text-primary">
                  <Wallet className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs dark:text-gray-400 text-gray-500">Your Balance</p>
                  <p className="text-lg font-semibold dark:text-white text-dark">${balance.toLocaleString()}</p>
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
              <h2 className="text-xl font-semibold dark:text-white text-dark">Stock Options</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stocks.map(stock => (
                  <div key={stock.stockId} className="text-center bg-white dark:bg-dark-50 rounded-xl shadow-sm border border-light-200 dark:border-dark-200/50 overflow-hidden">
                    <div className="p-4 border-b border-light-200 dark:border-dark-200/50 flex justify-center">
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 dark:bg-primary/10">
                        <span className="text-xs font-medium text-primary">{stock.name}</span>
                      </div>
                    </div>

                    <TradingViewWidget symbol={stock.symbol} />

                    <ul className="my-3 space-y-2">
                      <li className="mb-2">
                        <small className="text-gray-500 dark:text-gray-400">Min. Investment</small>
                        <h6 className="text-base text-dark dark:text-white">${stock.min.toLocaleString()}</h6>
                      </li>
                      <li className="mb-2">
                        <small className="text-gray-500 dark:text-gray-400">Max. Investment</small>
                        <h6 className="text-base text-dark dark:text-white">${stock.max.toLocaleString()}</h6>
                      </li>
                    </ul>

                    <div className="mt-5 px-5 border-t border-light-200 dark:border-dark-200/50 pt-4 pb-5">
                      <form onSubmit={(e) => handleSubmit(stock, e)}>
                        <label className="text-sm font-medium text-dark dark:text-white mb-8">Amount to Invest</label>
                        <div className="relative mt-3">
                          <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                            <span className="text-dark-300 dark:text-light-300">$</span>
                          </div>
                          <input
                            type="number"
                            step="any"
                            min={stock.min}
                            max={stock.max}
                            value={amounts[stock.stockId] || ''}
                            onChange={(e) => handleAmountChange(stock.stockId, e.target.value)}
                            className="block w-full pl-10 pr-10 py-3 text-lg rounded-xl bg-light-100 dark:bg-dark-100 border border-light-200 dark:border-dark-200 focus:ring-2 focus:ring-primary focus:border-transparent text-dark dark:text-white transition-all"
                            placeholder="0.00"
                            required
                          />
                        </div>
                        <button
                          type="submit"
                          disabled={loading[stock.stockId]}
                          className="mt-4 w-full py-4 px-4 rounded-xl bg-gradient-to-r from-primary to-secondary hover:from-primary-600 hover:to-secondary-600 text-white font-medium flex items-center justify-center gap-2 transform transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <InvestButtonIcon />
                          <span>{loading[stock.stockId] ? 'Processing...' : 'Invest'}</span>
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
  )
}

export default Stocks