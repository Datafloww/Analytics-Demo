
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, LogOut } from "lucide-react";
import { track } from "../utils/analytics";
import { useToast } from "../hooks/use-toast";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    // Track menu toggle event
    track('menu_toggle', { state: !isMenuOpen ? 'opened' : 'closed' });
  };

  const handleNavClick = (destination) => {
    // Track navigation click event
    track('navigation_click', { destination });
  };
  
  const handleLogout = () => {
    // Track logout event
    track('user_logout', { timestamp: new Date().toISOString() });
    
    // Display logout confirmation
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    
    // Navigate to login page
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link 
              to="/" 
              className="flex-shrink-0 flex items-center"
              onClick={() => handleNavClick('home')}
            >
              <span className="text-xl font-bold text-blue-600">TodoTrack</span>
            </Link>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-8">
            <Link
              to="/"
              className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
              onClick={() => handleNavClick('login')}
            >
              Login
            </Link>
            <Link
              to="/dashboard"
              className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
              onClick={() => handleNavClick('dashboard')}
            >
              Dashboard
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center px-3 py-2 text-sm font-medium text-red-600 hover:text-red-800 transition-colors"
            >
              <LogOut className="h-4 w-4 mr-1" />
              Logout
            </button>
          </div>
          <div className="flex items-center sm:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      {isMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600"
              onClick={() => {
                handleNavClick('login');
                toggleMenu();
              }}
            >
              Login
            </Link>
            <Link
              to="/dashboard"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600"
              onClick={() => {
                handleNavClick('dashboard');
                toggleMenu();
              }}
            >
              Dashboard
            </Link>
            <button
              onClick={() => {
                handleLogout();
                toggleMenu();
              }}
              className="flex items-center w-full text-left px-3 py-2 text-base font-medium text-red-600 hover:bg-gray-50 hover:text-red-800"
            >
              <LogOut className="h-4 w-4 mr-1" />
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
