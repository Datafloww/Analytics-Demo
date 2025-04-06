
import { Heart } from "lucide-react";
import { track } from "../utils/analytics";

const Footer = () => {
  const handleLinkClick = (linkName) => {
    // Track footer link clicks
    track('footer_link_click', { link: linkName });
  };

  return (
    <footer className="bg-white shadow-inner mt-auto">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} Analytics Test Site. All rights reserved.
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <button 
              className="text-sm text-gray-500 hover:text-blue-600"
              onClick={() => handleLinkClick('privacy')}
            >
              Privacy
            </button>
            <button 
              className="text-sm text-gray-500 hover:text-blue-600"
              onClick={() => handleLinkClick('terms')}
            >
              Terms
            </button>
            <button 
              className="text-sm text-gray-500 hover:text-blue-600"
              onClick={() => handleLinkClick('contact')}
            >
              Contact
            </button>
          </div>
          <div className="flex items-center mt-4 md:mt-0">
            <p className="text-sm text-gray-500 flex items-center">
              Made with <Heart className="h-4 w-4 mx-1 text-red-500" /> for testing
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
