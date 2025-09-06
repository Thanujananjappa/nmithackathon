import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { cartAPI, purchaseAPI } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import { ShoppingCart, Trash2, CreditCard, ArrowLeft } from 'lucide-react';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const response = await cartAPI.getCart();
      setCartItems(response.data);
    } catch (err) {
      setError('Failed to fetch cart');
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFromCart = async (cartId) => {
    try {
      await cartAPI.removeFromCart(cartId);
      setCartItems(cartItems.filter(item => item.cart_id !== cartId));
    } catch (err) {
      setError('Failed to remove item from cart');
    }
  };

  const handleCheckout = async () => {
    setProcessing(true);
    try {
      await purchaseAPI.checkout();
      setMessage('Purchase completed successfully!');
      setCartItems([]);
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setError(err.response?.data?.error || 'Checkout failed');
    } finally {
      setProcessing(false);
    }
  };

  const totalAmount = cartItems.reduce((total, item) => total + parseFloat(item.price), 0);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading cart..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-emerald-100 p-2 rounded-lg">
                <ShoppingCart className="h-6 w-6 text-emerald-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Shopping Cart</h1>
                <p className="text-gray-600">
                  {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in cart
                </p>
              </div>
            </div>

            <Link
              to="/"
              className="flex items-center text-emerald-600 hover:text-emerald-700 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Continue Shopping
            </Link>
          </div>
        </div>

        {message && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6">
            {message}
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {cartItems.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <div className="text-gray-500">
              <ShoppingCart className="h-16 w-16 mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-semibold mb-2">Your cart is empty</h3>
              <p className="mb-6">Discover amazing products and start shopping</p>
              <Link
                to="/"
                className="inline-flex items-center bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors"
              >
                Start Shopping
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div key={item.cart_id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <div className="flex">
                    <img
                      src={item.image || "/placeholder.png"}  // ✅ FIXED
                      alt={item.title}
                      className="w-24 h-24 object-cover"
                    />

                    <div className="flex-1 p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <Link
                            to={`/product/${item.id}`}
                            className="text-lg font-semibold text-gray-800 hover:text-emerald-600 transition-colors"
                          >
                            {item.title}
                          </Link>
                          <p className="text-gray-600 text-sm mt-1">
                            Sold by {item.username}
                          </p>
                          <div className="mt-2">
                            <span className="bg-emerald-100 text-emerald-800 px-2 py-1 rounded text-xs font-medium">
                              {item.category}
                            </span>
                          </div>
                        </div>

                        <div className="text-right ml-4">
                          <p className="text-xl font-bold text-emerald-600">
                            ${parseFloat(item.price).toFixed(2)}
                          </p>
                          <button
                            onClick={() => handleRemoveFromCart(item.cart_id)}
                            className="mt-2 text-red-600 hover:text-red-700 p-1 rounded transition-colors"
                            title="Remove from cart"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm p-6 sticky top-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Order Summary</h3>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal ({cartItems.length} items)</span>
                    <span>${totalAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <hr className="my-3" />
                  <div className="flex justify-between text-lg font-semibold text-gray-800">
                    <span>Total</span>
                    <span className="text-emerald-600">${totalAmount.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={processing || cartItems.length === 0}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-300 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
                >
                  {processing ? (
                    <LoadingSpinner size="sm" />
                  ) : (
                    <>
                      <CreditCard className="h-5 w-5 mr-2" />
                      Proceed to Checkout
                    </>
                  )}
                </button>

                <p className="text-xs text-gray-500 text-center mt-3">
                  Secure checkout powered by EcoFinds
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
