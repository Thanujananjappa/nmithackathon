import { Link } from 'react-router-dom';
import { ShoppingCart, User } from 'lucide-react';

const ProductCard = ({ product, onAddToCart, showAddToCart = true }) => {
  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onAddToCart(product.id);
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden group">
      <Link to={`/product/${product.id}`}>
        <div className="relative">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-2 right-2 bg-emerald-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
            {product.category}
          </div>
        </div>

        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors">
            {product.title}
          </h3>
          
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {product.description}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <User className="h-4 w-4" />
              <span>{product.username}</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-emerald-600">
                ${parseFloat(product.price).toFixed(2)}
              </span>
              
              {showAddToCart && (
                <button
                  onClick={handleAddToCart}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white p-2 rounded-lg transition-colors duration-200"
                  title="Add to cart"
                >
                  <ShoppingCart className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;