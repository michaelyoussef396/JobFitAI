import { Link } from "react-router-dom";
import { useState } from "react";
import clsx from "clsx";
import { images } from "../Constants"; // Ensure your images object has the necessary icons
import { useNavigate } from "react-router-dom";

const DashboardHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // Handle Logout function
  const handleLogout = () => {
    // Clear session data and redirect to login page
    navigate("/login");
  };

  // Handle navigation for the dashboard links
  const handleNavigation = (path) => {
    navigate(path);
    setIsOpen(false); // Close menu on navigation
  };

  return (
    <header className="fixed top-0 left-0 z-50 w-full py-4 bg-black-100 backdrop-blur-md">
      <div className="container flex h-14 items-center justify-between px-5">
        {/* Logo */}
        <div className="flex items-center cursor-pointer">
          <img src={images.logo} width={120} height={55} alt="Dashboard Logo" />
        </div>

        {/* Mobile Navigation Toggle */}
        <button
          className="lg:hidden z-20 size-10 border-2 border-s4/25 rounded-full flex justify-center items-center"
          onClick={() => setIsOpen((prevState) => !prevState)}
        >
          <img
            src={isOpen ? images.close : images.magic}
            alt={isOpen ? "Close Menu" : "Open Menu"}
            className="size-1/2 object-contain"
          />
        </button>

        {/* Menu for Mobile */}
        <nav
          className={clsx(
            "lg:hidden fixed top-0 left-0 w-full h-full bg-black-100 text-white transform transition-transform duration-300",
            isOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <div className="flex flex-col items-center justify-center h-full space-y-6 text-lg font-bold">
            <button
              onClick={() => handleNavigation("/home")}
              className="hover:text-green-500"
            >
              Dashboard
            </button>
            <button
              onClick={() => handleNavigation("/job-listings")}
              className="hover:text-green-500"
            >
              View Job Listings
            </button>
            <button
              onClick={handleLogout}
              className="hover:text-red-500"
            >
              Logout
            </button>
          </div>
        </nav>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex space-x-6 text-lg font-semibold text-white">
          <button
            onClick={() => handleNavigation("/home")}
            className="hover:text-green-500"
          >
            Dashboard
          </button>
          <button
            onClick={() => handleNavigation("/job-listings")}
            className="hover:text-green-500"
          >
            View Job Listings
          </button>
          <button
            onClick={handleLogout}
            className="hover:text-red-500"
          >
            Logout
          </button>
        </nav>
      </div>
    </header>
  );
};

export default DashboardHeader;
