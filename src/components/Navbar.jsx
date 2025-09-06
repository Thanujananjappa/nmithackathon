import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ShoppingCart, User, Package, History, Plus, LogOut, Leaf } from 'lucide-react';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!isAuthenticated()) {
    return null;
  }

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white shadow-lg border-b-2 border-emerald-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Leaf className="h-8 w-8 text-emerald-600" />
            <span className="text-xl font-bold text-emerald-800">EcoFinds</span>
          </Link>

          <div className="flex items-center space-x-6">
            <Link
              to="/"
              className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
                isActive('/') 
                  ? 'bg-emerald-100 text-emerald-700' 
                  : 'text-gray-600 hover:text-emerald-600 hover:bg-emerald-50'
              }`}
            >
              <Package className="h-4 w-4" />
              <span className="hidden sm:block">Home</span>
            </Link>

            <Link
              to="/my-listings"
              className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
                isActive('/my-listings') 
                  ? 'bg-emerald-100 text-emerald-700' 
                  : 'text-gray-600 hover:text-emerald-600 hover:bg-emerald-50'
              }`}
            >
              <Plus className="h-4 w-4" />
              <span className="hidden sm:block">My Listings</span>
            </Link>

            <Link
              to="/cart"
              className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
                isActive('/cart') 
                  ? 'bg-emerald-100 text-emerald-700' 
                  : 'text-gray-600 hover:text-emerald-600 hover:bg-emerald-50'
              }`}
            >
              <ShoppingCart className="h-4 w-4" />
              <span className="hidden sm:block">Cart</span>
            </Link>

            <Link
              to="/purchases"
              className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
                isActive('/purchases') 
                  ? 'bg-emerald-100 text-emerald-700' 
                  : 'text-gray-600 hover:text-emerald-600 hover:bg-emerald-50'
              }`}
            >
              <History className="h-4 w-4" />
              <span className="hidden sm:block">Purchases</span>
            </Link>

            <Link
              to="/dashboard"
              className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
                isActive('/dashboard') 
                  ? 'bg-emerald-100 text-emerald-700' 
                  : 'text-gray-600 hover:text-emerald-600 hover:bg-emerald-50'
              }`}
            >
              <User className="h-4 w-4" />
              <span className="hidden sm:block">Dashboard</span>
            </Link>

            <button
              onClick={handleLogout}
              className="flex items-center space-x-1 px-3 py-2 rounded-lg text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:block">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;