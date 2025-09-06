import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { purchaseAPI } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import { Package, Calendar, DollarSign, User } from 'lucide-react';

const Purchases = () => {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPurchases();
  }, []);

  const fetchPurchases = async () => {
    try {
      const response = await purchaseAPI.getPurchases();
      setPurchases(response.data);
    } catch (err) {
      setError('Failed to fetch purchase history');
    } finally {
      setLoading(false);
    }
  };

  const totalSpent = purchases.reduce(
    (total, purchase) => total + parseFloat(purchase.price),
    0
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading purchase history..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="bg-emerald-100 p-2 rounded-lg">
                <Package className="h-6 w-6 text-emerald-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  Purchase History
                </h1>
                <p className="text-gray-600">
                  {purchases.length}{' '}
                  {purchases.length === 1 ? 'purchase' : 'purchases'} • Total
                  spent: ${totalSpent.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {purchases.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <div className="text-gray-500">
              <Package className="h-16 w-16 mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-semibold mb-2">No purchases yet</h3>
              <p className="mb-6">
                Start exploring products and make your first purchase
              </p>
              <Link
                to="/"
                className="inline-flex items-center bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors"
              >
                Start Shopping
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {purchases.map((purchase) => (
              <div
                key={purchase.id}
                className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="flex">
                  <img
                    src={purchase.image || '/default.png'}
                    alt={purchase.title}
                    className="w-32 h-32 object-cover"
                  />

                  <div className="flex-1 p-4">
                    <div className="flex justify-between items-start mb-2">
                      <Link
                        to={`/product/${purchase.product_id}`}
                        className="text-lg font-semibold text-gray-800 hover:text-emerald-600 transition-colors line-clamp-1"
                      >
                        {purchase.title}
                      </Link>
                    </div>

                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        <span>Sold by {purchase.seller}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{new Date(purchase.purchase_date).toLocaleDateString()}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <DollarSign className="h-5 w-5 text-emerald-600" />
                        <span className="text-xl font-bold text-emerald-600">
                          {parseFloat(purchase.price).toFixed(2)}
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                          Purchased
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {purchases.length > 0 && (
          <div className="mt-8 bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Purchase Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-2xl font-bold text-emerald-600">{purchases.length}</p>
                <p className="text-gray-600">Total Purchases</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-2xl font-bold text-emerald-600">${totalSpent.toFixed(2)}</p>
                <p className="text-gray-600">Total Spent</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-2xl font-bold text-emerald-600">
                  ${purchases.length > 0 ? (totalSpent / purchases.length).toFixed(2) : '0.00'}
                </p>
                <p className="text-gray-600">Average Order</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Purchases;