import React from 'react';
import Navbar from './Navbar';

const Header = () => { 
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center w-full bg-cover bg-center px-6 md:px-20 lg:px-32 text-white text-center"
      style={{ backgroundImage: "url('/header_img.png')" }}
      id="Header"
    >
      {/* Navbar */}
      <Navbar />

      {/* Title Section */}
      <div className="container mx-auto flex flex-col items-center justify-center text-center py-16">
        <h1 className="text-3xl sm:text-6xl md:text-[82px] font-semibold max-w-4xl leading-tight">
          Explore homes that fit your dreams
        </h1>

        {/* Glass Buttons (No Bold Font) */}
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 mt-12">
          <a
            href="#Projects"
            className="flex-1 text-white px-8 py-3 rounded-2xl bg-blue-200/40 
            backdrop-blur-md border border-white/30 
            hover:bg-blue-300/50 transition-all duration-300 
            transform hover:scale-105 
            flex items-center justify-center 
            shadow-md hover:shadow-lg"
          >
            Properties
          </a>
          <a
            href="#Contact"
            className="flex-1 text-white px-8 py-3 rounded-2xl bg-blue-200/40 
            backdrop-blur-md border border-white/30 
            hover:bg-blue-300/50 transition-all duration-300 
            transform hover:scale-105 
            flex items-center justify-center 
            shadow-md hover:shadow-lg"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
};

export default Header;
