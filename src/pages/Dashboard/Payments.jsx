import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { usePaystackPayment } from 'react-paystack';
import api from '../../utils/api';
import toast from 'react-hot-toast';
import { 
  CreditCard, 
  History, 
  Download, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  Receipt,
  ArrowUpRight
} from 'lucide-react';

const Payments = () => {
  const [amount, setAmount] = useState('');
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [outstandingBalance, setOutstandingBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

  const config = {
    reference: (new Date()).getTime().toString(),
    email: JSON.parse(localStorage.getItem('user'))?.email || '',
    amount: amount * 100, // Convert to kobo/cents
    publicKey: 'pk_test_YOUR_PAYSTACK_PUBLIC_KEY', // Replace with your actual key
  };

  const initializePayment = usePaystackPayment(config);

  useEffect(() => {
    fetchPaymentData();
  }, []);

  const fetchPaymentData = async () => {
    try {
      const [historyRes, balanceRes] = await Promise.all([
        api.get('/payments/history'),
        api.get('/payments/outstanding')
      ]);
      setPaymentHistory(historyRes.data);
      setOutstandingBalance(balanceRes.data.balance);
    } catch (error) {
      console.error('Error fetching payment data:', error);
      toast.error('Failed to load payment information');
    } finally {
      setLoading(false);
    }
  };

  const handlePaystackSuccess = async (reference) => {
    setProcessing(true);
    try {
      await api.post('/payments/verify', {
        reference: reference.reference,
        amount: amount
      });
      toast.success('Payment successful! Your registration will be processed.');
      fetchPaymentData();
      setAmount('');
    } catch (error) {
      toast.error('Payment verification failed. Please contact support.');
    } finally {
      setProcessing(false);
    }
  };

  const handlePaystackClose = () => {
    toast.error('Payment was cancelled');
  };

  const handleDownloadReceipt = async (paymentId) => {
    try {
      const response = await api.get(`/payments/receipt/${paymentId}`, {
        responseType: 'blob'
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `receipt_${paymentId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      toast.success('Receipt downloaded');
    } catch (error) {
      toast.error('Failed to download receipt');
    }
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'completed':
        return <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs flex items-center gap-1"><CheckCircle className="w-3 h-3" /> Completed</span>;
      case 'pending':
        return <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-xs flex items-center gap-1"><Clock className="w-3 h-3" /> Pending</span>;
      case 'failed':
        return <span className="px-2 py-1 bg-red-500/20 text-red-400 rounded-full text-xs flex items-center gap-1"><AlertCircle className="w-3 h-3" /> Failed</span>;
      default:
        return <span className="px-2 py-1 bg-gray-500/20 text-gray-400 rounded-full text-xs">{status}</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-dark-100/50 backdrop-blur-md rounded-2xl p-6 border border-white/10"
      >
        <h1 className="text-2xl font-bold text-white mb-2">Payments</h1>
        <p className="text-gray-400">Manage your tuition payments and view transaction history</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Payment Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Outstanding Balance Card */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`rounded-2xl p-6 border ${
              outstandingBalance > 0 
                ? 'bg-red-500/10 border-red-500/30' 
                : 'bg-green-500/10 border-green-500/30'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 mb-1">Outstanding Balance</p>
                <p className={`text-3xl font-bold ${outstandingBalance > 0 ? 'text-red-400' : 'text-green-400'}`}>
                  ₦{outstandingBalance.toLocaleString()}
                </p>
              </div>
              {outstandingBalance === 0 && (
                <div className="bg-green-500/20 rounded-full p-3">
                  <CheckCircle className="w-8 h-8 text-green-400" />
                </div>
              )}
            </div>
          </motion.div>

          {/* Make Payment Card */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-dark-100/50 backdrop-blur-md rounded-2xl p-6 border border-white/10"
          >
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-primary-500" />
              Make Payment
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 mb-2">Amount (₦)</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-500"
                />
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[5000, 10000, 25000, 50000, 100000].map(preset => (
                  <button
                    key={preset}
                    onClick={() => setAmount(preset.toString())}
                    className="py-2 bg-white/10 rounded-lg text-gray-300 hover:bg-white/20 transition"
                  >
                    ₦{preset.toLocaleString()}
                  </button>
                ))}
              </div>
              <button
                onClick={() => initializePayment({
                  onSuccess: handlePaystackSuccess,
                  onClose: handlePaystackClose
                })}
                disabled={!amount || processing}
                className="w-full py-3 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg font-semibold text-white hover:opacity-90 transition disabled:opacity-50"
              >
                {processing ? 'Processing...' : `Pay ₦${parseFloat(amount || 0).toLocaleString()}`}
              </button>
              <p className="text-xs text-gray-500 text-center">
                Secure payment powered by Paystack. All major cards accepted.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Payment Methods */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-dark-100/50 backdrop-blur-md rounded-2xl p-6 border border-white/10"
          >
            <h2 className="text-xl font-semibold text-white mb-4">Payment Methods</h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-white font-medium">Card Payment</p>
                  <p className="text-gray-400 text-xs">Visa, Mastercard, Verve</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <Receipt className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <p className="text-white font-medium">Bank Transfer</p>
                  <p className="text-gray-400 text-xs">Direct bank deposit</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Payment Instructions */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-dark-100/50 backdrop-blur-md rounded-2xl p-6 border border-white/10"
          >
            <h2 className="text-xl font-semibold text-white mb-4">Bank Transfer Details</h2>
            <div className="space-y-2">
              <div className="flex justify-between text-gray-400">
                <span>Bank:</span>
                <span className="text-white">First Bank</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Account Name:</span>
                <span className="text-white">JEO Digital Solutions</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Account Number:</span>
                <span className="text-white">1234567890</span>
              </div>
              <div className="mt-4 p-3 bg-yellow-500/10 rounded-lg">
                <p className="text-yellow-400 text-xs">After transfer, upload your receipt for verification.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Payment History */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-dark-100/50 backdrop-blur-md rounded-2xl p-6 border border-white/10"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-white flex items-center gap-2">
            <History className="w-5 h-5 text-primary-500" />
            Payment History
          </h2>
        </div>
        {loading ? (
          <div className="text-center py-8">Loading payment history...</div>
        ) : paymentHistory.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <Receipt className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p>No payment history found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 text-gray-400">Date</th>
                  <th className="text-left py-3 text-gray-400">Reference</th>
                  <th className="text-left py-3 text-gray-400">Amount</th>
                  <th className="text-left py-3 text-gray-400">Status</th>
                  <th className="text-left py-3 text-gray-400">Receipt</th>
                </tr>
              </thead>
              <tbody>
                {paymentHistory.map((payment) => (
                  <tr key={payment.id} className="border-b border-white/10 hover:bg-white/5">
                    <td className="py-3 text-gray-300">{new Date(payment.created_at).toLocaleDateString()}</td>
                    <td className="py-3 text-gray-300 text-sm">{payment.reference}</td>
                    <td className="py-3 text-white font-medium">₦{payment.amount.toLocaleString()}</td>
                    <td className="py-3">{getStatusBadge(payment.status)}</td>
                    <td className="py-3">
                      {payment.status === 'completed' && (
                        <button
                          onClick={() => handleDownloadReceipt(payment.id)}
                          className="text-primary-500 hover:text-primary-400"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Payments;