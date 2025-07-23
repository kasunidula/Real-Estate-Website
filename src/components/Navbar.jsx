import React, { useState, useEffect } from 'react';
import { assets } from '../assets/assets';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  useEffect(() => {
    document.body.style.overflow = showMobileMenu ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showMobileMenu]);

  return (
   <div className="absolute top-0 left-0 w-full z-10 px-4 sm:px-6 md:px-10 mt-4">

<div className="container mx-auto flex items-center py-2 px-6 md:px-20 lg:px-32 
  bg-white/10 backdrop-blur-md rounded-3xl border border-white/30 shadow-md transition-all duration-300">
  
  {/* Logo */}
  <img src={assets.logo} alt="Logo" className="w-12 h-auto" />

  {/* Navigation Links - Centered */}
  <div className="flex-1 flex justify-center">
    <ul className="hidden md:flex gap-7 text-white text-lg">
      <li>
        <a href="#Header" className="hover:text-gray-300 transition">
          Home
        </a>
      </li>
      <li>
        <a href="#Projects" className="hover:text-gray-300 transition">
          Properties
        </a>
      </li>
    </ul>
  </div>

  {/* Buttons - Right */}
  {/* <div className="hidden md:flex gap-4">
    <Link to="/login">
      <button className="text-white border border-white/40 px-6 py-2 rounded-full hover:bg-white hover:text-black transition">
        Login
      </button>
    </Link>
    <Link to="/signup">
      <button className="bg-white text-black px-6 py-2 rounded-full hover:bg-gray-300 transition">
        Sign Up
      </button>
    </Link>
  </div> */}

  {/* Mobile Menu Icon */}
  <img
    onClick={() => setShowMobileMenu(true)}
    src={assets.menuIcon}
    className="md:hidden w-7 cursor-pointer"
    alt="Menu Icon"
  />
</div>


      {/* Mobile Menu Overlay */}
      <div
        className={`md:hidden fixed top-0 right-0 bottom-0 left-0 z-20 transition-all duration-300 ${
          showMobileMenu ? 'flex flex-col' : 'hidden'
        } bg-white/30 backdrop-blur-md`}
      >
        {/* Close Button */}
        <div className="flex justify-end p-6">
          <img
            onClick={() => setShowMobileMenu(false)}
            src={assets.crossIcon}
            className="w-6 cursor-pointer"
            alt="Close Icon"
          />
        </div>

        {/* Mobile Links and Buttons */}
        <ul className="flex flex-col items-center gap-4 mt-5 px-5 text-lg text-black font-medium">
          <a
            href="#Header"
            onClick={() => setShowMobileMenu(false)}
            className="px-4 py-2 rounded-full hover:bg-gray-100 transition"
          >
            Home
          </a>

          <a
            href="#Projects"
            onClick={() => setShowMobileMenu(false)}
            className="px-4 py-2 rounded-full hover:bg-gray-100 transition"
          >
            Properties
          </a>

          <Link to="/login">
            <button className="bg-black/80 text-white px-6 py-2 rounded-full mt-4 w-40 hover:bg-black transition">
              Login
            </button>
          </Link>
          <Link to="/signup">
            <button className="bg-blue-500/80 text-white px-6 py-2 rounded-full mt-2 w-40 hover:bg-blue-600 transition">
              Sign Up
            </button>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
