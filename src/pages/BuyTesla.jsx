import { useState } from 'react';
import { Send, Car, Mail, MessageSquare } from 'lucide-react';
import toast from 'react-hot-toast';

const BuyTesla = () => {
  const [subject, setSubject] = useState('Tesla Car Purchase Inquiry');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) {
      toast.error('Please enter your message');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/support/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ subject, message })
      });
      const data = await res.json();
      if (res.ok) {
        toast.success('Message sent! Our team will contact you soon.');
        setMessage('');
      } else {
        toast.error(data.message || 'Failed to send');
      }
    } catch (err) {
      toast.error('Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 md:p-6 pb-20 md:pb-8 overflow-x-hidden flex-grow">
      {/* Header */}
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-3xl -z-10 blur-xl opacity-50" />
        <div className="px-6 py-8 rounded-3xl bg-gradient-to-r from-primary/5 to-secondary/5 backdrop-blur-sm border border-white/10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold dark:text-white text-dark flex items-center gap-2">
                <Car className="h-8 w-8 text-primary" />
                Buy Tesla Cars
              </h1>
              <p className="mt-2 text-base dark:text-gray-300 text-gray-600">
                Contact our sales team to purchase your Tesla vehicle
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto">
        <div className="bg-white dark:bg-dark-50 rounded-xl shadow-sm border border-light-200 dark:border-dark-200/50 overflow-hidden">
          <div className="p-6 border-b border-light-200 dark:border-dark-200/50">
            <h2 className="text-xl font-semibold dark:text-white text-dark">Request a Callback</h2>
            <p className="text-sm text-gray-500 mt-1">Fill out the form below and our Tesla specialist will contact you</p>
          </div>
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium dark:text-white text-dark mb-2">Subject</label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-light-100 dark:bg-dark-100 border border-light-200 dark:border-dark-200 focus:ring-2 focus:ring-primary text-dark dark:text-white"
                >
                  <option>Tesla Car Purchase Inquiry</option>
                  <option>Test Drive Request</option>
                  <option>Financing Information</option>
                  <option>Trade-in Inquiry</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium dark:text-white text-dark mb-2">Your Message</label>
                <textarea
                  rows={6}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us which Tesla model you're interested in (Model S, 3, X, Y, Cybertruck) and any specific requirements..."
                  className="w-full px-4 py-2 rounded-lg bg-light-100 dark:bg-dark-100 border border-light-200 dark:border-dark-200 focus:ring-2 focus:ring-primary text-dark dark:text-white"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-primary to-secondary hover:from-primary-600 hover:to-secondary-600 text-white font-medium flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-50"
              >
                {loading ? 'Sending...' : <><Send className="h-5 w-5" /> Send Request</>}
              </button>
              <p className="text-xs text-center text-gray-500">Our support team will respond within 24 hours</p>
            </form>
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="bg-white dark:bg-dark-50 rounded-xl p-5 border border-light-200 dark:border-dark-200/50">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Mail className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-semibold text-dark dark:text-white">Email Support</h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              For general inquiries: <br />
              <a href="mailto:support@example.com" className="text-primary hover:underline">support@example.com</a>
            </p>
          </div>
          <div className="bg-white dark:bg-dark-50 rounded-xl p-5 border border-light-200 dark:border-dark-200/50">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <MessageSquare className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-semibold text-dark dark:text-white">Live Chat</h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Available Mon-Fri, 9am-6pm EST<br />
              <button className="text-primary hover:underline mt-1">Start Chat →</button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyTesla;