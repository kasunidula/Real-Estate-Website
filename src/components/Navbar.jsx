import React, { useState, useEffect } from 'react';
import { assets } from '../assets/assets'; // Import assets (logo, icons, etc.) from the assets folder.

const Navbar = () => {
  const [showMobileMenu, setshowMobileMenu] = useState(false); // Track if the mobile menu is open or closed.

  useEffect(() => {
    // Disable page scrolling when the mobile menu is open.
    if (showMobileMenu) {
      document.body.style.overflow = 'hidden'; // Stops the page from scrolling.
    } else {
      document.body.style.overflow = 'auto'; // Restores scrolling.
    }
    // Cleanup function to restore scrolling when the component unmounts.
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showMobileMenu]); // This effect runs whenever `showMobileMenu` changes.

  return (
    <div className="absolute top-0 left-0 w-full z-10">
      {/* Main Navbar container */}
      <div className="container mx-auto flex justify-between items-center py-4 px-6 md:px-20 lg:px-32 bg-transparent">
        {/* Logo */}
        <img
          src={assets.logo} // Logo image source.
          alt="Logo" // Alternative text for accessibility.
          className="w-14 h-auto" // Set the logo's width and let its height scale automatically.
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

        {/* Sign-up button for desktop */}
        <button className="hidden md:block bg-white px-8 py-2 rounded-full">
          Sign up
        </button>

        {/* Mobile menu icon */}
        <img
          onClick={() => setshowMobileMenu(true)} // Open the mobile menu when clicked.
          src={assets.menuIcon} // Icon for opening the menu.
          className="md:hidden w-7" // Only visible on small screens.
          alt="Menu Icon"
        />
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden ${
          showMobileMenu ? 'fixed w-full' : 'hidden' // Show or hide the menu based on `showMobileMenu`.
        } right-0 top-0 bottom-0 overflow-hidden bg-white transition-all`}
      >
        {/* Close button */}
        <div className="flex justify-end p-6 cursor-pointer">
          <img
            onClick={() => setshowMobileMenu(false)} // Close the menu when clicked.
            src={assets.crossIcon} // Icon for closing the menu.
            className="w-6"
            alt="Close Icon"
          />
        </div>

        {/* Mobile menu links */}
        <ul className="flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium">
          <a
            onClick={() => setshowMobileMenu(false)} // Close the menu when clicking on a link.
            href="#Header"
            className="px-4 py-2 rounded-full inline-block"
          >
            Home
          </a>

          <a
            onClick={() => setshowMobileMenu(false)} // Close the menu when clicking on a link.
            href="#Projects"
            className="px-4 py-2 rounded-full inline-block"
          >
            Properties
          </a>
        </ul>
      </div>
    </div>
  );
};

export default Navbar; // Export the Navbar component for use in other parts of the app.
