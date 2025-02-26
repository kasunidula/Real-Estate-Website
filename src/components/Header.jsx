import React from 'react';
import Navbar from './Navbar'; // Import the Navbar component.
import SearchForm from './SearchForm'; // Import the SearchForm component.

const Header = ({ onSearch }) => { 
  return (
    <div
      className="min-h-screen mb-4 bg-cover bg-center flex flex-col items-center w-full overflow-hidden"
      style={{ backgroundImage: "url('/header_img.png')" }} // Sets a background image for the header.
      id="Header" // Adds an ID to the header for linking or styling purposes.
    >
      <Navbar /> {/* Display the navigation bar at the top. */}
      
      <div className="container text-center mx-auto py-4 px-6 md:px-20 lg:px-32 text-white">
        <h1 className="text-3xl sm:text-6xl md:text-[82px] inline-block max-w-3xl font-semibold pt-20">
          Explore homes that fit your dreams
        </h1>
        {/* Display the main heading of the page. */}

        <div className="space-x-6 mt-16">
          {/* Two buttons for navigation to "Properties" and "Contact Us" sections */}
          <a href="#Projects" className="bg-blue-500 px-8 py-3 rounded hover:bg-blue-600">
            Properties
          </a>
          <a href="#Contact" className="bg-blue-500 px-8 py-3 rounded hover:bg-blue-600">
            Contact Us
          </a>
        </div>
      </div>

      {/* Add Search Form */}
      <div className="mt-10 w-full max-w-4xl px-6 py-8 rounded-lg shadow-lg">
        <SearchForm onSearch={onSearch} /> {/* Includes a search form to handle search functionality. */}
      </div>
    </div>
  );
};

export default Header; // Exports the Header component for use in other parts of the app.
