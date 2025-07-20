import React, { useState, useEffect } from 'react';
import { assets } from '../assets/assets'; // Import assets (logo, icons, etc.)
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  useEffect(() => {
    if (showMobileMenu) {
      document.body.style.overflow = 'hidden'; // Disable scrolling when mobile menu is open.
    } else {
      document.body.style.overflow = 'auto'; // Restore scrolling.
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showMobileMenu]);

  return (
    <div className="absolute top-0 left-0 w-full z-10">
      {/* Main Navbar container */}
      <div className="container mx-auto flex justify-between items-center py-4 px-6 md:px-20 lg:px-32 bg-transparent">
        {/* Logo */}
        <img
          src={assets.logo}
          alt="Logo"
          className="w-14 h-auto"
        />

        {/* Desktop navigation links */}
        <ul className="hidden md:flex gap-7 text-white text-xl">
          <li>
            <a href="#Header" className="cursor-pointer hover:text-gray-300">
              Home
            </a>
          </li>
          <li>
            <a href="#Projects" className="cursor-pointer hover:text-gray-300">
              Properties
            </a>
          </li>
        </ul>

        {/* Desktop buttons */}
        <div className="hidden md:flex gap-4">
          <Link to="/login">
            <button className="bg-transparent text-white border border-white px-6 py-2 rounded-full hover:bg-white hover:text-black transition">
              Login
            </button>
          </Link>
          <Link to="/signup">
            <button className="bg-white text-black px-6 py-2 rounded-full hover:bg-gray-300 transition">
              Sign Up
            </button>
          </Link>
        </div>

        {/* Mobile menu icon */}
        <img
          onClick={() => setShowMobileMenu(true)}
          src={assets.menuIcon}
          className="md:hidden w-7"
          alt="Menu Icon"
        />
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden ${
          showMobileMenu ? 'fixed w-full' : 'hidden'
        } right-0 top-0 bottom-0 overflow-hidden bg-white transition-all`}
      >
        {/* Close button */}
        <div className="flex justify-end p-6 cursor-pointer">
          <img
            onClick={() => setShowMobileMenu(false)}
            src={assets.crossIcon}
            className="w-6"
            alt="Close Icon"
          />
        </div>

        {/* Mobile menu links */}
        <ul className="flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium">
          <a
            onClick={() => setShowMobileMenu(false)}
            href="#Header"
            className="px-4 py-2 rounded-full inline-block"
          >
            Home
          </a>

          <a
            onClick={() => setShowMobileMenu(false)}
            href="#Projects"
            className="px-4 py-2 rounded-full inline-block"
          >
            Properties
          </a>

          {/* Mobile buttons */}
          <Link to="/login">
            <button className="bg-gray-800 text-white px-6 py-2 rounded-full mt-4 w-40">
              Login
            </button>
          </Link>
          <Link to="/signup">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-full mt-2 w-40">
              Sign Up
            </button>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
