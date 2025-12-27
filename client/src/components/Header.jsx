import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, User, ShoppingCart, Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Check if user is logged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  // Get cart items from localStorage or API
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${searchQuery}`);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    setIsLoggedIn(false);
    navigate('/');
  };

  const totalCartItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        {/* Top bar */}
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center">
            <button 
              className="md:hidden mr-3"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <Link to="/" className="text-2xl font-bold text-indigo-600">
              ParfumLux
            </Link>
          </div>

          {/* Search bar */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-lg mx-6">
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher des parfums..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button 
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              >
                <Search size={20} />
              </button>
            </div>
          </form>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            <Link to="/track-order" className="hidden md:block text-gray-600 hover:text-indigo-600">
              Suivre commande
            </Link>
            <Link to={isLoggedIn ? "/profile" : "/login"} className="text-gray-600 hover:text-indigo-600">
              <User size={24} />
            </Link>
            <Link to="/cart" className="relative text-gray-600 hover:text-indigo-600">
              <ShoppingCart size={24} />
              {totalCartItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalCartItems}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Mobile search bar */}
        <div className="md:hidden mb-3">
          <form onSubmit={handleSearch}>
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher des parfums..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button 
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              >
                <Search size={20} />
              </button>
            </div>
          </form>
        </div>

        {/* Navigation menu */}
        <nav className={`${isMenuOpen ? 'block' : 'hidden'} md:block`}>
          <ul className="flex flex-col md:flex-row md:space-x-8 py-4 md:py-0">
            <li>
              <Link 
                to="/" 
                className="block py-2 text-gray-700 hover:text-indigo-600 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Accueil
              </Link>
            </li>
            <li className="relative group">
              <Link 
                to="/products" 
                className="block py-2 text-gray-700 hover:text-indigo-600 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Parfums
              </Link>
              <div className="absolute hidden group-hover:block bg-white shadow-lg rounded-md p-4 min-w-48 z-50">
                <Link 
                  to="/products?category=Parfum Homme" 
                  className="block py-2 text-gray-700 hover:text-indigo-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Parfum Homme
                </Link>
                <Link 
                  to="/products?category=Parfum Femme" 
                  className="block py-2 text-gray-700 hover:text-indigo-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Parfum Femme
                </Link>
                <Link 
                  to="/products?category=Parfum Unisexe" 
                  className="block py-2 text-gray-700 hover:text-indigo-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Parfum Unisexe
                </Link>
                <Link 
                  to="/products?category=Packs Exclusifs" 
                  className="block py-2 text-gray-700 hover:text-indigo-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Packs Exclusifs
                </Link>
              </div>
            </li>
            <li>
              <Link 
                to="/products?category=Packs Exclusifs" 
                className="block py-2 text-gray-700 hover:text-indigo-600 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Packs Exclusifs
              </Link>
            </li>
            <li>
              <Link 
                to="/collections" 
                className="block py-2 text-gray-700 hover:text-indigo-600 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Collections
              </Link>
            </li>
            {isLoggedIn && (
              <li>
                <button 
                  onClick={handleLogout}
                  className="block py-2 text-gray-700 hover:text-indigo-600 font-medium"
                >
                  Déconnexion
                </button>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;