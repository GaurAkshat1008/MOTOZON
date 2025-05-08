import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { cartItems } = useContext(CartContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const totalItems = cartItems.reduce((sum, item) => sum + item.qty, 0);

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link
            to="/"
            className="text-gray-900 text-xl font-medium tracking-tight flex items-center"
          >
            <span className="mr-2 text-indigo-600">🛒</span>
            <span className="font-semibold">DealZon</span>
          </Link>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-gray-900 focus:outline-none p-2 rounded-md hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
                  />
                ) : (
                  <path
                    fillRule="evenodd"
                    d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-8">
            {/* <Link
              to="/"
              className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm font-medium"
            >
              Home
            </Link> */}
            {user && (
              <Link
                to="/cart"
                className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm font-medium relative group"
              >
                Cart
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-2 bg-indigo-600 text-white text-xs font-medium rounded-full h-4 w-4 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Link>
            )}
            {user && (
              <Link
                to="/reviews"
                className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm font-medium"
              >
                My Reviews
              </Link>
            )}
            {user ? (
              <>
                {user.role === "admin" && (
                  <Link
                    to="/admin"
                    className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm font-medium"
                  >
                    Admin
                  </Link>
                )}
                <button
                  onClick={logout}
                  className="bg-gray-900 text-white hover:bg-gray-800 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-gray-900 text-white hover:bg-gray-800 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-3 pt-3 border-t border-gray-200 animate-fadeIn">
            <div className="flex flex-col space-y-4 py-2">
              <Link
                to="/"
                className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/cart"
                className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm font-medium flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Cart
                {totalItems > 0 && (
                  <span className="ml-2 bg-indigo-600 text-white text-xs font-medium rounded-full h-4 w-4 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Link>
              {user && (
                <Link
                  to="/reviews"
                  className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  My Reviews
                </Link>
              )}
              {user ? (
                <>
                  {user.role === "admin" && (
                    <Link
                      to="/admin"
                      className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Admin
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                    className="bg-gray-900 text-white hover:bg-gray-800 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 mt-2 w-full text-left"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="bg-gray-900 text-white hover:bg-gray-800 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 mt-2 block text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
